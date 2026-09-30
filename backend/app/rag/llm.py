import os
import time

from dotenv import load_dotenv
from google import genai
from google.genai import errors

load_dotenv()

# Tried in order. If the first is overloaded, the next one is used.
MODELS = ["gemini-flash-latest", "gemini-flash-lite-latest"]
RETRIES_PER_MODEL = 3


class GeminiClient:

    def __init__(self):

        api_key = os.getenv("GEMINI_API_KEY")

        if not api_key:
            raise ValueError("GEMINI_API_KEY not found.")

        self.client = genai.Client(api_key=api_key)

    def generate(self, prompt: str):

        last_err = None

        for model in MODELS:
            for attempt in range(RETRIES_PER_MODEL):
                try:
                    response = self.client.models.generate_content(
                        model=model,
                        contents=prompt,
                    )
                    return response.text

                except errors.APIError as e:
                    last_err = e
                    # Retry only on busy (5xx) or rate limit (429).
                    # Other errors (bad key, bad request) won't fix themselves.
                    if e.code == 429 or (e.code and e.code >= 500):
                        print(f"{model} failed ({e.code}), retry {attempt + 1}")
                        time.sleep(2 ** attempt)  # 1s, 2s, 4s
                    else:
                        raise

        raise last_err


if __name__ == "__main__":

    llm = GeminiClient()

    print(
        llm.generate("Say hello.")
    )