import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';
import { supabase } from '../../lib/supabase';

export default function ChatRoom() {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const { user } = useAuthStore();

  useEffect(() => {
    // Subscribe to new messages
    const channel = supabase
      .channel('public-chat')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'chat_messages'
      }, payload => {
        setMessages(current => [...current, payload.new]);
      })
      .subscribe();

    // Fetch existing messages
    fetchMessages();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('chat_messages')
      .select(`
        *,
        profiles:user_id (
          name,
          avatar_url
        )
      `)
      .order('created_at', { ascending: true })
      .limit(50);

    if (error) {
      console.error('Error fetching messages:', error);
      return;
    }

    setMessages(data);
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;

    const { error } = await supabase
      .from('chat_messages')
      .insert({
        user_id: user.id,
        message: newMessage.trim(),
        room_id: 'public' // Using a default public room
      });

    if (error) {
      console.error('Error sending message:', error);
      return;
    }

    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-lg shadow-lg">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">EV Community Chat</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.user_id === user?.id ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.user_id === user?.id
                  ? 'bg-emerald-500 text-white'
                  : 'bg-gray-100'
              }`}
            >
              <p className="text-sm font-semibold">
                {message.profiles?.name || 'Anonymous'}
              </p>
              <p>{message.message}</p>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-lg border p-2"
          />
          <button
            type="submit"
            className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}