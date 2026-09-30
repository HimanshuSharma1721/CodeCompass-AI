import { useState } from "react";
import ChatBox from "./ChatBox";
import ChatIutput from "./ChatIutput";
import { askCodeCompass } from "../services/api";


function ChatWindow() {

    const [messages, setMessages] = useState([
        {
            role: "assistant",
            message: "Hello! Upload your repository and ask me anything about your code."
        }
    ]);


    const sendMessage = async (question) => {

        setMessages((prev) => [
            ...prev,
            {
                role: "user",
                message: question
            }
        ]);


        try {

            const answer = await askCodeCompass(question);


            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    message: answer
                }
            ]);


        } catch (error) {

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    message: "Something went wrong."
                }
            ]);

        }

    };


    return (
        <div className="flex flex-col h-full">

            <ChatBox messages={messages}/>

            <ChatIutput onSend={sendMessage}/>

        </div>
    );
}


export default ChatWindow;