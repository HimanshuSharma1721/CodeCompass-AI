function ChatMessage({ role, message }) {
  const isUser = role === "user";

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      } mb-4`}
    >
      <div
        className={`max-w-3xl rounded-xl px-5 py-3 shadow-md ${
          isUser
            ? "bg-blue-600 text-white"
            : "bg-slate-800 text-slate-100"
        }`}
      >
        <p className="text-sm font-semibold mb-2">
          {isUser ? "You" : "CodeCompass AI"}
        </p>

        <p className="whitespace-pre-wrap">
          {message}
        </p>
      </div>
    </div>
  );
}

export default ChatMessage;