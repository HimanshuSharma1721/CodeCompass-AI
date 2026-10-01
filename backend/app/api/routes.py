from pathlib import Path

from fastapi import (
    APIRouter,
    UploadFile,
    File,
    HTTPException,
)
from google.genai import errors

from app.api.schemas import (
    ChatRequest,
    ChatResponse,
)

from app.services.upload_service import UploadService
from app.rag.retriever import CodeRetriever
from app.rag.prompt_builder import PromptBuilder
from app.rag.llm import GeminiClient
from app.rag.memory import ConversationMemory


router = APIRouter()

# Same base folder the retriever uses, so paths don't depend on
# where the server is started from
BASE_DIR = Path(__file__).resolve().parent.parent.parent
UPLOAD_DIR = BASE_DIR / "data" / "uploads"

# Load once when server starts (starts empty if no index exists yet)
retriever = CodeRetriever()
llm = GeminiClient()
memory = ConversationMemory()


@router.get("/")
def home():
    return {
        "message": "Welcome to CodeCompass AI 🚀"
    }


@router.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest):

    docs = retriever.search(request.question)

    # No index yet, or nothing found: ask for an upload instead of
    # sending an empty context to Gemini
    if not docs:
        return ChatResponse(
            answer="I don't have a repository to look at yet. "
                   "Please upload a ZIP file of your project first."
        )

    memory.add_user_message(request.question)

    prompt = PromptBuilder.build_prompt(
        question=request.question,
        documents=docs,
        history=memory.get_history(),
    )

    try:
        answer = llm.generate(prompt)
    except errors.APIError:
        raise HTTPException(
            status_code=503,
            detail="AI is busy right now, please try again in a few seconds.",
        )

    memory.add_ai_message(answer)

    return ChatResponse(
        answer=answer
    )


@router.post("/upload")
async def upload_repository(file: UploadFile = File(...)):

    # Allow only ZIP files
    if not file.filename.lower().endswith(".zip"):
        raise HTTPException(
            status_code=400,
            detail="Only ZIP files are allowed."
        )

    UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

    # .name strips any folder parts from the uploaded filename
    zip_file = UPLOAD_DIR / Path(file.filename).name

    with open(zip_file, "wb") as buffer:
        buffer.write(await file.read())

    # Build FAISS index
    result = UploadService.process_zip(zip_file)

    # Reload the index into the existing retriever
    # (no need to reload the embedding model again)
    retriever.load()

    return result