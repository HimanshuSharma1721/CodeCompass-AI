from typing import List

from langchain_core.documents import Document
from langchain_text_splitters import (
    RecursiveCharacterTextSplitter,
    Language,
)

class CodeChunker:
    """
    Splits source code into language-aware chunks.
    """

    def __init__(
        self,
        chunk_size: int = 1000,
        chunk_overlap: int = 200,
        language: Language = Language.PYTHON,
    ):

        self.text_splitter = (
            RecursiveCharacterTextSplitter.from_language(
                language=language,
                chunk_size=chunk_size,
                chunk_overlap=chunk_overlap,
            )
        )

    def split_documents(
        self,
        documents: List[Document],
    ) -> List[Document]:

        print(f"Splitting {len(documents)} documents...")

        chunks = self.text_splitter.split_documents(documents)

        print(f"Created {len(chunks)} chunks.")

        return chunks


from app.rag.loader import load_repository

if __name__ == "__main__":

    docs = load_repository(".")

    chunker = CodeChunker()

    chunks = chunker.split_documents(docs)

    print()

    print(f"Original Documents : {len(docs)}")
    print(f"Chunks Created     : {len(chunks)}")

    if chunks:

        print("\nFirst Chunk Metadata:\n")
        print(chunks[0].metadata)

        print("\nFirst Chunk Content:\n")
        print(chunks[0].page_content[:500])