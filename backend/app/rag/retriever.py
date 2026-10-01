from pathlib import Path

from langchain_community.vectorstores import FAISS

from app.rag.embeddings import EmbeddingManager

BASE_DIR = Path(__file__).resolve().parent.parent.parent
FAISS_PATH = BASE_DIR / "data" / "faiss_index"


class CodeRetriever:
    """
    Loads the FAISS index (if one exists) and retrieves
    the most relevant code chunks.
    """

    def __init__(self):

        print("Loading embedding model...")

        self.embedding_model = EmbeddingManager().get_embeddings()
        self.vector_db = None

        self.load()

    def load(self) -> bool:
        """Load the index from disk. Returns False if none exists yet."""

        if not (FAISS_PATH / "index.faiss").exists():
            print("No FAISS index yet. Waiting for an upload.")
            self.vector_db = None
            return False

        print("Loading FAISS index...")

        self.vector_db = FAISS.load_local(
            str(FAISS_PATH),
            self.embedding_model,
            allow_dangerous_deserialization=True,
        )

        print("Retriever ready!")
        return True

    def is_ready(self) -> bool:
        return self.vector_db is not None

    def search(
        self,
        query: str,
        k: int = 4
    ):

        # Pick up an index created by a recent upload
        if self.vector_db is None:
            self.load()

        # Still nothing: no ZIP has been uploaded yet
        if self.vector_db is None:
            return []

        print(f"\nSearching for: {query}\n")

        results = self.vector_db.max_marginal_relevance_search(
            query=query,
            k=k,
            fetch_k=10,
            lambda_mult=0.7,
        )

        return results