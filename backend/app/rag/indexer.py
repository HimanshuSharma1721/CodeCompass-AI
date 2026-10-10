import gc
from pathlib import Path

from app.rag.loader import load_repository
from app.rag.chunker import CodeChunker
from app.rag.embeddings import EmbeddingManager

from langchain_community.vectorstores import FAISS


# Project root:
# CodeCompass-AI/backend
BASE_DIR = Path(__file__).resolve().parent.parent.parent

# FAISS location:
# CodeCompass-AI/backend/data/faiss_index
FAISS_PATH = BASE_DIR / "data" / "faiss_index"

# Keeps memory use and API calls low on small servers
BATCH_SIZE = 16
MAX_CHUNKS = 80


def build_index(repo_path):

    print("Loading repository...")

    docs = load_repository(repo_path)

    print(f"Loaded {len(docs)} files")


    chunker = CodeChunker()

    chunks = chunker.split_documents(docs)

    print(f"Created {len(chunks)} chunks")

    if not chunks:
        raise ValueError("No readable code files found in this ZIP.")

    if len(chunks) > MAX_CHUNKS:
        raise ValueError(
            f"This project is too large for the free demo "
            f"({len(chunks)} chunks, limit {MAX_CHUNKS}). "
            f"Please upload a smaller project."
        )


    # Shared embedding model (one instance per server)
    embedding_model = EmbeddingManager().get_embeddings()


    print("Creating FAISS index...")

    vector_db = None

    for i in range(0, len(chunks), BATCH_SIZE):

        batch = chunks[i:i + BATCH_SIZE]

        if vector_db is None:
            vector_db = FAISS.from_documents(batch, embedding_model)
        else:
            vector_db.add_documents(batch)

        gc.collect()


    FAISS_PATH.mkdir(parents=True, exist_ok=True)

    vector_db.save_local(str(FAISS_PATH))


    print("FAISS index created successfully!")
    print(f"Indexed {len(chunks)} chunks.")



if __name__ == "__main__":

    repo = BASE_DIR / "backend" / "data" / "uploads" / "testttt" / "testttt"

    build_index(repo)