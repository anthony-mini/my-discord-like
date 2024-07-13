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
      console.log(messages);
    };

    fetchMessages();

    // Écoute des nouveaux messages de la socket.
    const handleNewMessage = (newMessage: Message) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    // S'abonner aux nouveaux messages
    onMessage(handleNewMessage);

    // Nettoyer l'abonnement lors du démontage
    return () => {
      socket?.off('message', handleNewMessage); // Désabonnement de l'événement 'message'
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
