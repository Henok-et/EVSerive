import { supabase } from '../lib/supabase';
import type { Message } from '../types/chat';

export const chatService = {
  async sendMessage(roomId: string, message: string) {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('chat_messages')
      .insert({
        room_id: roomId,
        user_id: user.user.id,
        message
      })
      .select('*, profiles:user_id(name)')
      .single();

    if (error) throw error;
    return data;
  },

  async getMessages(roomId: string) {
    const { data, error } = await supabase
      .from('chat_messages')
      .select(`
        *,
        profiles:user_id (
          name,
          avatar_url
        )
      `)
      .eq('room_id', roomId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data as Message[];
  },

  subscribeToMessages(roomId: string, callback: (message: Message) => void) {
    return supabase
      .channel(`room:${roomId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `room_id=eq.${roomId}`
        },
        (payload) => callback(payload.new as Message)
      )
      .subscribe();
  }
};