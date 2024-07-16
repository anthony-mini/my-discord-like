import React, { useContext, useEffect, useState } from 'react';
import { Channel } from '../../type/channel';
import { MessageList } from '../../components/MessageList';
import { ChatInput } from '../../components/ChatInput';
import { SocketContext } from '../../providers/SocketProvider';

type ChatScreenProps = {
  userId: number;
  onBack: () => void;
};

const ChatScreen: React.FC<ChatScreenProps> = ({ userId, onBack }) => {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [currentChannelId, setCurrentChannelId] = useState<number | null>(null);
  const socketContext = useContext(SocketContext);

  useEffect(() => {
    const fetchChannels = async () => {
      const response = await fetch(
        `http://localhost:3000/channels?userId=${userId}`,
      );
      const data = await response.json();
      setChannels(data);
    };

    fetchChannels();
  }, [userId]);

  useEffect(() => {
    if (currentChannelId && socketContext?.joinChannel) {
      socketContext.joinChannel(currentChannelId.toString());
    }
  }, [currentChannelId, socketContext?.joinChannel]);

  return (
    <>
      <div className="chat-container">
        <h1>Channels</h1>
        <ul className="channel-list">
          {channels.map((channel) => (
            <li
              key={channel.id}
              onClick={() => setCurrentChannelId(channel.id)}
              className={currentChannelId === channel.id ? 'active' : ''}
            >
              {channel.title}
            </li>
          ))}
        </ul>
        {currentChannelId && (
          <>
            <MessageList currentChannelId={currentChannelId} />
            <ChatInput currentChannelId={currentChannelId} userId={userId} />
          </>
        )}
        <button className="logout-button" onClick={onBack}>
          Logout
        </button>
      </div>
    </>
  );
};

export default ChatScreen;
