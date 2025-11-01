import React, { useState } from "react"
import axios from "axios"; 

function App() {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { sender: "You", text: input };

    const res = await axios.post("http://localhost:5000/message", { text: input });
    const aiMsg = { sender: "AI", text: res.data.reply }
    
    setChat([...chat, userMsg, aiMsg]);
    setInput("")
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">ProtoAI 🤖</h1>
      <div className="border rounded-lg h-96 overflow-y-auto p-3 bg-gray-50">
        {chat.map((msg, i) => (
          <p key={i} className={msg.sender === "AI" ? "text-blue-600" : "text-green-700"}>
            <strong>{msg.sender}:</strong> {msg.text}
          </p>
        ))}
      </div>
      <div className="flex mt-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow border p-2 rounded-l"
          placeholder="Type your message..."
        />
        <button onClick={sendMessage} className="bg-blue-600 text-white px-4 rounded-r">
          Send
        </button>
      </div>
    </div>
  );
}

export default App;