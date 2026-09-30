from pathlib import Path
from typing import List

from langchain_core.documents import Document

# Directories to ignore while scanning
IGNORE_DIRS = {
    ".git",
    ".venv",
    "__pycache__",
    "node_modules",
    "dist",
    "build"
}

# File types we want to index
SUPPORTED_EXTENSIONS = {
    ".py",
    ".js",
    ".jsx",
    ".ts",
    ".tsx",
    ".java",
    ".json",
    ".md"
}
def get_supported_files(project_path: str) -> List[Path]:
    """
    Recursively scan a project directory and return all supported source files.
    """

    supported_files = []

    project_path = Path(project_path)

    for file_path in project_path.rglob("*"):

        # Skip directories
        if file_path.is_dir():
            continue

        # Skip ignored directories
        if any(part in IGNORE_DIRS for part in file_path.parts):
            continue

        # Keep only supported file extensions
        if file_path.suffix.lower() in SUPPORTED_EXTENSIONS:
            supported_files.append(file_path)

    return supported_files

def read_file(file_path: Path) -> str:
    """
    Read a source code file and return its contents.
    """

    try:
        return file_path.read_text(
            encoding="utf-8",
            errors="ignore"
        )

    except Exception as e:
        print(f"Error reading {file_path}: {e}")
        return ""
    
def load_repository(project_path: str) -> List[Document]:
    """
    Load all supported source files from a repository
    and convert them into LangChain Documents.
    """

    documents = []

    supported_files = get_supported_files(project_path)

    print(f"Loading {len(supported_files)} files...")

    for file_path in supported_files:

        content = read_file(file_path)

        if not content.strip():
            continue

        document = Document(
            page_content=content,
            metadata={
                "file_path": str(file_path),
                "extension": file_path.suffix,
                "file_name": file_path.name
            }
        )

        documents.append(document)

    return documents

if __name__ == "__main__":

    documents = load_repository(".")

    print(f"\nLoaded {len(documents)} documents.\n")

    if documents:

        print("Metadata:")

        print(documents[0].metadata)

        print("\nFirst 500 characters:\n")

        print(documents[0].page_content[:500])
