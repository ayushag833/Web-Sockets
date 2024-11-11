import { useState, useEffect } from "react";
import io from "socket.io-client";
import "./App.css";

const socket = io("http://localhost:5000");

function App() {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });

    return () => {
      socket.off("message");
    };
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (messageInput.trim() !== "") {
      socket.emit("message", messageInput);
      setMessageInput("");
    }
  };

  return (
    <div className="App">
      <h1>Chat App</h1>

      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button>Send</button>
      </form>

      <div className="messages">
        {messages.length > 0 && <h2> Messages :-</h2>}
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
