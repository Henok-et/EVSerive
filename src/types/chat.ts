export interface Message {
  id: string;
  room_id: string;
  user_id: string;
  message: string;
  created_at: string;
  profiles?: {
    name: string;
    avatar_url?: string;
  };
}

export interface ChatRoom {
  id: string;
  name: string;
  description?: string;
  created_by: string;
  created_at: string;
}