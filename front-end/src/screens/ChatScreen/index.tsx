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
      <div>
        <h1>Channels</h1>
        <ul>
          {channels.map((channel) => (
            <li
              key={channel.id}
              onClick={() => setCurrentChannelId(channel.id)}
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
        <button onClick={onBack}>Logout</button>
      </div>
      <div className="input-container"></div>
    </>
  );
};

export default ChatScreen;
