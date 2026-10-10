import os
import time

from dotenv import load_dotenv
from google import genai
from google.genai import errors, types
from langchain_core.embeddings import Embeddings

load_dotenv()

MODEL_NAME = "gemini-embedding-001"
API_BATCH = 16

# Free tier allows 30,000 tokens/minute; keep a safety margin
TOKENS_PER_MINUTE = 24_000
RETRY_WAITS = [15, 30, 45]


class GeminiEmbeddings(Embeddings):
    """Computes embeddings on Google's servers (no local model in RAM)."""

    def __init__(self, model_name: str = MODEL_NAME):

        api_key = os.getenv("GEMINI_API_KEY")

        if not api_key:
            raise ValueError("GEMINI_API_KEY not found.")

        self.client = genai.Client(api_key=api_key)
        self.model_name = model_name
        self._sent = []  # (timestamp, estimated_tokens)

    def _throttle(self, tokens):
        """Wait if sending this batch would exceed the per-minute budget."""

        while True:
            now = time.time()
            self._sent = [(t, n) for t, n in self._sent if now - t < 60]
            used = sum(n for _, n in self._sent)

            if not self._sent or used + tokens <= TOKENS_PER_MINUTE:
                break

            wait = 60 - (now - self._sent[0][0]) + 0.5
            print(f"Pacing embeddings, waiting {wait:.0f}s...")
            time.sleep(max(wait, 1))

        self._sent.append((time.time(), tokens))

    def _embed(self, texts, task_type):

        # Rough estimate: about 3 characters per token for code
        tokens = sum(len(t) for t in texts) // 3 + 1
        self._throttle(tokens)

        for attempt in range(len(RETRY_WAITS) + 1):
            try:
                result = self.client.models.embed_content(
                    model=self.model_name,
                    contents=texts,
                    config=types.EmbedContentConfig(task_type=task_type),
                )
                return [e.values for e in result.embeddings]

            except errors.APIError as e:
                retryable = e.code == 429 or (e.code and e.code >= 500)

                if not retryable:
                    raise

                if attempt == len(RETRY_WAITS):
                    break

                wait = RETRY_WAITS[attempt]
                print(f"Embedding API error {e.code}, retrying in {wait}s")
                time.sleep(wait)

        raise RuntimeError(
            "The embedding service is busy or rate limited. "
            "Please try again in a minute."
        )

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