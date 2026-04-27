import { useRef, useEffect } from "react";
import { ChatMessage } from "./ChatMessage";
import "./ChatMessages.css";

export function ChatMessages({ chatMessages }) {
  const chatMessagesRef = useRef(null);

  useEffect(() => {
    const containerElement = chatMessagesRef.current;
    if (containerElement) {
      containerElement.scrollTop = containerElement.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <div className="chat-messages" ref={chatMessagesRef}>
      {chatMessages.map((chat) => (
        <ChatMessage message={chat.message} sender={chat.sender} key={chat.id} />
      ))}
    </div>
  );
}
