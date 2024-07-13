import React, { useEffect, useState } from 'react';
import { Channel } from '../../type/channel';
import { MessageList } from '../../components/MessageList';

function ChatScreen() {
  const [channels, setChannels] = useState<Channel[]>([]); // Utilisez le type Channel[] pour l'état channels
  const [currentChannelId, setCurrentChannelId] = useState<number | null>(null);

  useEffect(() => {
    const fetchChannels = async () => {
      const response = await fetch('http://localhost:3000/channels');
      const data = await response.json();
      setChannels(data);
    };

    fetchChannels();
  }, []);

  return (
    <div>
      <h1>Channels</h1>
      <ul>
        {channels.map((channel) => (
          <li key={channel.id} onClick={() => setCurrentChannelId(channel.id)}>
            {channel.title}
          </li>
        ))}
      </ul>
      {currentChannelId && <MessageList currentChannelId={currentChannelId} />}
    </div>
  );
}

export default ChatScreen;
