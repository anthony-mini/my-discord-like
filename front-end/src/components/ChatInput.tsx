import { useState, FormEvent } from 'react';
import { useSocket } from '../providers/SocketProvider';

interface ChatInputProps {
  currentChannelId: number;
  userId: number;
}

export function ChatInput({ currentChannelId, userId }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const { socket } = useSocket();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (message.trim()) {
      const messageData = {
        content: message,
        userId,
        channelId: currentChannelId,
      };
      socket?.emit('message', messageData); // Envoi du message via WebSocket
      setMessage(''); // Réinitialisation du champ de saisie
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        placeholder="Your message"
        required
      />
      <button type="submit">Send</button>
    </form>
  );
}
