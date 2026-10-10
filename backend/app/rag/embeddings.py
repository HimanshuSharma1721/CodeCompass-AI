import os
import time

from dotenv import load_dotenv
from google import genai
from google.genai import errors, types
from langchain_core.embeddings import Embeddings

load_dotenv()

MODEL_NAME = "gemini-embedding-001"
API_BATCH = 32


class GeminiEmbeddings(Embeddings):
    """Computes embeddings on Google's servers (no local model in RAM)."""

    def __init__(self, model_name: str = MODEL_NAME):

        api_key = os.getenv("GEMINI_API_KEY")

        if not api_key:
            raise ValueError("GEMINI_API_KEY not found.")

        self.client = genai.Client(api_key=api_key)
        self.model_name = model_name

    def _embed(self, texts, task_type):

        for attempt in range(5):
            try:
                result = self.client.models.embed_content(
                    model=self.model_name,
                    contents=texts,
                    config=types.EmbedContentConfig(task_type=task_type),
                )
                return [e.values for e in result.embeddings]

            except errors.APIError as e:
                # Retry only on rate limit (429) or Google-side errors (5xx)
                if e.code == 429 or (e.code and e.code >= 500):
                    time.sleep(2 ** attempt)
                else:
                    raise

        raise RuntimeError("Embedding service is busy, please try again.")

    def embed_documents(self, texts):

        vectors = []

        for i in range(0, len(texts), API_BATCH):
            batch = texts[i:i + API_BATCH]
            vectors.extend(self._embed(batch, "RETRIEVAL_DOCUMENT"))

        return vectors

    def embed_query(self, text):
        return self._embed([text], "RETRIEVAL_QUERY")[0]


# One shared instance per server process
_MODEL_CACHE = {}


class EmbeddingManager:
    """
    Provides the embedding model used by the indexer and retriever.
    """

    def __init__(self, model_name: str = MODEL_NAME):

        if model_name not in _MODEL_CACHE:
            print(f"Using Gemini embeddings: {model_name}")
            _MODEL_CACHE[model_name] = GeminiEmbeddings(model_name)

        self.embedding_model = _MODEL_CACHE[model_name]

    def get_embeddings(self):
        return self.embedding_model