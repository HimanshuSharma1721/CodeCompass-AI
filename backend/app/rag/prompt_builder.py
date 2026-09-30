from langchain_core.documents import Document


class PromptBuilder:
    """
    Builds a prompt using:
    - Conversation history
    - Retrieved repository context
    - Current user question
    """

    @staticmethod
    def build_prompt(
        question: str,
        documents: list[Document],
        history: str,
    ) -> str:

        context_parts = []

        for doc in documents:

            file_name = doc.metadata.get(
                "file_name",
                "unknown_file"
            )

            context_parts.append(
                f"""
File: {file_name}

{doc.page_content}
"""
            )

        context = "\n\n".join(context_parts)


        prompt = f"""
You are CodeCompass AI.

You are an expert software engineer helping users understand a codebase.

Use ONLY the repository context below to answer.

If the repository does not contain enough information, say:

"I couldn't find that information in the repository."

----------------------------------------
Conversation History
----------------------------------------

{history}

----------------------------------------
Repository Context
----------------------------------------

{context}

----------------------------------------
Current User Question
----------------------------------------

{question}

----------------------------------------
Instructions
----------------------------------------

- Use the conversation history when the user refers to previous questions.
- Base your answer only on the repository context.
- Mention file names whenever possible.
- Keep the answer clear and concise.

Answer:
"""

        return prompt