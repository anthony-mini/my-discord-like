import { useEffect, useState } from 'react';
import { Message } from '../type/message';

export function MessageList({
  currentChannelId,
}: {
  currentChannelId: number;
}) {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await fetch(
        `http://localhost:3000/messages?channelId=${currentChannelId}`,
      );
      const data = await response.json();
      setMessages(data);
      console.log(messages);
    };

    fetchMessages();
  }, [currentChannelId]);

  return (
    <div className="message-list">
      {messages.map((message) => (
        <div key={message.id}>
          <p>{message.username}</p>
          <p>{message.content}</p>
        </div>
      ))}
    </div>
  );
}
