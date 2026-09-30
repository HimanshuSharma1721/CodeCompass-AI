from app.rag.retriever import CodeRetriever
from app.rag.prompt_builder import PromptBuilder
from app.rag.llm import GeminiClient
from memory import ConversationMemory


def main():

    print("=" * 60)
    print("        CodeCompass AI")
    print("=" * 60)

    retriever = CodeRetriever()
    llm = GeminiClient()
    memory = ConversationMemory()

    while True:

        print()

        question = input("Ask > ")

        if question.lower() in ["exit", "quit"]:
            break

        memory.add_user_message(question)

        docs = retriever.search(question)

        prompt = PromptBuilder.build_prompt(
            question=question,
            documents=docs,
            history=memory.get_history(),
        )

        answer = llm.generate(prompt)

        memory.add_ai_message(answer)

        print("\n" + "=" * 60)
        print(answer)
        print("=" * 60)


if __name__ == "__main__":
    main()