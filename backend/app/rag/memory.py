from typing import List, Dict


class ConversationMemory:
    """
    Stores the conversation history
    between the user and the AI.
    """

    def __init__(self):

        self.history: List[Dict[str, str]] = []

    def add_user_message(self, message: str):

        self.history.append(
            {
                "role": "User",
                "content": message
            }
        )

    def add_ai_message(self, message: str):

        self.history.append(
            {
                "role": "Assistant",
                "content": message
            }
        )

    def get_history(self) -> str:

        if not self.history:
            return ""

        conversation = []

        for msg in self.history:

            conversation.append(
                f"{msg['role']}: {msg['content']}"
            )

        return "\n".join(conversation)

    def clear(self):

        self.history.clear()
    
if __name__ == "__main__":

        memory = ConversationMemory()

        memory.add_user_message(
            "Explain chunking."
        )

        memory.add_ai_message(
            "Chunking splits documents into smaller pieces."
        )

        memory.add_user_message(
            "Can it be optimized?"
        )

        print(memory.get_history())