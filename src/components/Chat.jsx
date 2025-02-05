import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  // Reference for the scrollable container
  const chatContainerRef = useRef(null);

  // Fetch initial chat messages
  const fetchChatMessages = async () => {
    try {
      const chat = await axios.get(`${BASE_URL}/chat/${targetUserId}`, {
        withCredentials: true,
      });
      const chatMessages = chat?.data?.messages.map((msg) => {
        const { senderId, text } = msg;
        return {
          firstName: senderId?.firstName,
          lastName: senderId?.lastName,
          text,
        };
      });
      setMessages(chatMessages);
    } catch (error) {
      console.error("Error fetching chat messages", error);
    }
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  // Socket connection to handle incoming messages
  useEffect(() => {
    if (!userId) return;

    const socket = createSocketConnection();
    // Join the chat room
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    // Listen for newly received messages
    socket.on("messageReceived", ({ firstName, lastName, text }) => {
      setMessages((current) => [...current, { firstName, lastName, text }]);
    });

    // Clean up when leaving
    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  // Whenever messages update, scroll to the bottom
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Send a new message
  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  return (
    <div className="w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
      <h1 className="p-5 border-b border-gray-600">Chat</h1>

      {/* Chat container with overflow and scrolling */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-5 flex flex-col"
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={
              "chat " + (user.firstName === msg.firstName ? "chat-end" : "chat-start")
            }
          >
            <div className="chat-header">{`${msg.firstName}  ${msg.lastName}`}</div>
            <div
              className={
                user.firstName === msg.firstName
                  ? "chat-bubble chat-bubble-secondary"
                  : "chat-bubble chat-bubble-primary"
              }
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="p-5 border-t border-gray-600 flex items-center gap-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border border-gray-500 text-white rounded p-2"
        />
        <button onClick={sendMessage} className="btn btn-secondary">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
