import RobotImage from "../assets/bot.png";
import UserImage from "../assets/user.png";
import "./ChatMessage.css";

export function ChatMessage({ message, sender }) {
  return (
    <div className={`${sender}-message`}>
      {sender === "bot" && <img src={RobotImage} className="msg-profile" />}
      <div className="message-content">{message}</div>
      {sender === "user" && <img src={UserImage} className="msg-profile" />}
    </div>
  );
}