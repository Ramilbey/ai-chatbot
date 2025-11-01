import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { sender: "You", text: input };

    try {
      const res = await axios.post("http://localhost:5000/message", { text: input });
      const aiMsg = { sender: "AI", text: res.data.reply };
      setChat((prev) => [...prev, userMsg, aiMsg]);
    } catch (err) {
      console.error("Error:", err);
      setChat((prev) => [...prev, userMsg, { sender: "AI", text: "Error connecting to server." }]);
    }

    setInput("");
  };

  return (
    <div className="app">
      <h1>ProtoAI 🤖</h1>
      <div className="chat-box">
        {chat.map((msg, i) => (
          <p key={i} className={msg.sender === "AI" ? "ai-msg" : "user-msg"}>
            <strong>{msg.sender}:</strong> {msg.text}
          </p>
        ))}
      </div>
      <div className="input-area">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
