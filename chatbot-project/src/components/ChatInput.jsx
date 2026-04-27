import { useState } from "react";
import Chatbot from "supersimpledev/chatbot";
import "./ChatInput.css";

export function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState("");

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  function sendMessage() {
    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: "user",
        id: crypto.randomUUID(),
      },
    ];
    setChatMessages(newChatMessages);

    const response = Chatbot.getResponse(inputText);
    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: "bot",
        id: crypto.randomUUID(),
      },
    ]);
    setInputText("");
  }

  return (
    <div className="chat-input">
      <input
        className="input-bar"
        placeholder="Type your message..."
        size="30"
        onChange={saveInputText}
        value={inputText}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />
      <button onClick={sendMessage} className="send-button">
        Send
      </button>
    </div>
  );
}