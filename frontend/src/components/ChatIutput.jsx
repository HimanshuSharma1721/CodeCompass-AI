import { useState } from "react";


function ChatIutput({onSend}) {

    const [question,setQuestion] = useState("");


    const handleSubmit = (e)=>{

        e.preventDefault();


        if(!question.trim())
            return;


        onSend(question);

        setQuestion("");

    };


    return (

        <form
            onSubmit={handleSubmit}
            className="p-4 border-t flex gap-3"
        >

            <input
                value={question}
                onChange={(e)=>setQuestion(e.target.value)}
                placeholder="Ask about your repository..."
                className="flex-1 border rounded-xl px-4 py-3"
            />


            <button
                className="bg-slate-900 text-white px-6 rounded-xl"
            >
                Send
            </button>


        </form>

    );
}


export default ChatIutput;