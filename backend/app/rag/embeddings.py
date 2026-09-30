from langchain_community.embeddings import FastEmbedEmbeddings


class EmbeddingManager:
    """
    Handles generation of embeddings using FastEmbed.
    """

    def __init__(
        self,
        model_name: str = "BAAI/bge-small-en-v1.5"
    ):

        print(f"Loading embedding model: {model_name}")

        self.embedding_model = FastEmbedEmbeddings(
            model_name=model_name
        )

        print("Embedding model loaded successfully!")

    def get_embeddings(self):
        return self.embedding_model


if __name__ == "__main__":

    manager = EmbeddingManager()

    embedding_model = manager.get_embeddings()

    vector = embedding_model.embed_query(
        "public class Main"
    )

    print()

    print("Embedding dimension:", len(vector))

    print()

    print("First 10 values:")

    print(vector[:10])