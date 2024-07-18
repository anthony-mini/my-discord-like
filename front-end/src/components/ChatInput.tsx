import { useState, FormEvent } from 'react';
import { useSocket } from '../providers/SocketProvider';
import { NewMessage } from '../type/message';

interface ChatInputProps {
  currentChannelId: number;
  userId: number;
}

export function ChatInput({ currentChannelId, userId }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const { send } = useSocket();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (message.trim()) {
      const messageData: NewMessage = {
        content: message,
        userId,
        channelId: currentChannelId,
      };
      send(messageData, currentChannelId.toString()); // Envoi du message via WebSocket
      setMessage(''); // Réinitialisation du champ de saisie
    }
  };

  return (
    <form onSubmit={handleSubmit} className="input-container">
      <input
        type="text"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        placeholder="Your message"
        required
        className="chat-input"
      />
      <button type="submit" className="send-button">
        Send
      </button>
    </form>
  );
}
