import { useEffect, useState } from 'react';
import { Message } from '../type/message';
import { useSocket } from '../providers/SocketProvider';

export function MessageList({
  currentChannelId,
}: {
  currentChannelId: number;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const { socket, onMessage } = useSocket();

  useEffect(() => {
    // Fetch des messages existants pour le channel courant.
    const fetchMessages = async () => {
      const response = await fetch(
        `http://localhost:3000/messages?channelId=${currentChannelId}`,
      );
      const data = await response.json();
      setMessages(data);
    };

    fetchMessages();

    const handleNewMessage = (newMessage: Message) => {
      if (newMessage.channelId === currentChannelId) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    };

    onMessage(handleNewMessage);

    return () => {
      socket?.off('message', handleNewMessage);
    };
  }, [socket, onMessage, currentChannelId]);

  return (
    <div className="message-list">
      {messages.map((message) => (
        <div key={message.id}>
          <p>
            {message.username}: {message.content}
          </p>
        </div>
      ))}
    </div>
  );
}
