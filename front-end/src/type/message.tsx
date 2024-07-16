export interface Message {
  id: number;
  content: string;
  userId: number;
  channelId: number;
  createdAt: string;
  username: string;
}

export interface NewMessage {
  content: string;
  userId: number;
  channelId: number;
}
