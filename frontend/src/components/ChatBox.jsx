import ChatMessage from "./ChatMessage";


function ChatBox({ messages }) {

    return (
        <div className="flex-1 overflow-y-auto p-8 space-y-4">

            {messages.map((msg, index) => (

                <ChatMessage
                    key={index}
                    role={msg.role}
                    message={msg.message}
                />

            ))}

        </div>
    );
}


export default ChatBox;