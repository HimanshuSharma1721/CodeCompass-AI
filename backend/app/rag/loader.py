from pathlib import Path
from typing import List

from langchain_core.documents import Document

# Directories to ignore while scanning
IGNORE_DIRS = {
    ".git",
    ".venv",
    "venv",
    "env",
    "__pycache__",
    "__MACOSX",
    "node_modules",
    ".next",
    ".idea",
    ".vscode",
    "coverage",
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

# Generated or noisy files that add no value to the index
IGNORE_FILES = {
    "package-lock.json",
    "pnpm-lock.yaml",
    "yarn.lock",
    "tsconfig.tsbuildinfo",
}

# Skip very large files (minified bundles, data dumps)
MAX_FILE_BYTES = 150_000


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

        # Check ignored directories relative to the repo root,
        # so folders above the repo (like 'build') don't matter
        relative_parts = file_path.relative_to(project_path).parts

        if any(part in IGNORE_DIRS for part in relative_parts):
            continue

        # Skip lock files and minified/source-map files
        name = file_path.name.lower()

        if name in IGNORE_FILES or name.endswith((".min.js", ".map")):
            continue

        # Keep only supported file extensions
        if file_path.suffix.lower() not in SUPPORTED_EXTENSIONS:
            continue

        # Skip huge files
        try:
            if file_path.stat().st_size > MAX_FILE_BYTES:
                continue
        except OSError:
            continue

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