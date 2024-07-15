import React, {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import { io, Socket } from 'socket.io-client';
import { Message, NewMessage } from '../type/message';

interface AppSocketContext {
  socket: Socket | null;
  onMessage: (callback: (message: Message) => void) => void;
  send: (message: NewMessage, channelId: string) => void;
  joinChannel: (channelId: string) => void;
}

export const SocketContext = createContext<AppSocketContext | null>(null);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io('http://localhost:3000');
    setSocket(newSocket);
    console.log('Socket connected');
    return () => {
      newSocket.close();
    };
  }, []);

  const onMessage = (callback: (message: Message) => void) => {
    if (!socket) return;
    socket.on('message', callback);
    console.log('Socket message received');
  };

  const send = (message: NewMessage, channelId: string) => {
    if (!socket) return;
    const messageWithChannel = { ...message, channelId };
    socket.emit('message', messageWithChannel);
    console.log('Socket message sent', messageWithChannel);
  };

  const joinChannel = (channelId: string) => {
    if (!socket) return;
    socket.emit('joinChannel', channelId);
    console.log(`Joined channel ${channelId}`);
  };

  return (
    <SocketContext.Provider value={{ socket, onMessage, send, joinChannel }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};
