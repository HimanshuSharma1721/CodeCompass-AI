from langchain_community.vectorstores import FAISS

from app.rag.embeddings import EmbeddingManager


class CodeRetriever:
    """
    Loads the FAISS index and retrieves
    the most relevant code chunks.
    """

    def __init__(self):

        print("Loading embedding model...")

        embedding_model = EmbeddingManager().get_embeddings()

        print("Loading FAISS index...")

        from pathlib import Path

        BASE_DIR = Path(__file__).resolve().parent.parent.parent
        FAISS_PATH = BASE_DIR / "data" / "faiss_index"


        self.vector_db = FAISS.load_local(
            str(FAISS_PATH),
            embedding_model,
            allow_dangerous_deserialization=True
        )

        print("Retriever ready!")

    def search(
        self,
        query: str,
        k: int = 4
    ):

        print(f"\nSearching for: {query}\n")

        results = self.vector_db.max_marginal_relevance_search(
             query=query,
             k=k,
             fetch_k=10,
             lambda_mult=0.7,
        )

        return results


if __name__ == "__main__":

    retriever = CodeRetriever()

    results = retriever.search(
        "How are files loaded?"
    )

    print(f"\nRetrieved {len(results)} chunks.\n")

    for i, doc in enumerate(results, start=1):

        print("=" * 60)
        print(f"Result {i}")
        print("=" * 60)

        print("Metadata:")

        print(doc.metadata)

        print("\nContent:\n")

        print(doc.page_content[:400])

        print()