from pathlib import Path

from fastapi import (
    APIRouter,
    UploadFile,
    File,
    HTTPException,
)

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


# Load once when server starts
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

    memory.add_user_message(request.question)

    prompt = PromptBuilder.build_prompt(
        question=request.question,
        documents=docs,
        history=memory.get_history(),
    )

    answer = llm.generate(prompt)

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

    upload_path = Path("backend/data/uploads")
    upload_path.mkdir(parents=True, exist_ok=True)

    zip_file = upload_path / file.filename

    with open(zip_file, "wb") as buffer:
        buffer.write(await file.read())

    # Build FAISS index
    result = UploadService.process_zip(zip_file)

    # Reload retriever so it uses the newly created index
    global retriever
    retriever = CodeRetriever()

    return result