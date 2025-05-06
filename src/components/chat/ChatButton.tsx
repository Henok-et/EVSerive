import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

interface ChatButtonProps {
  onClick: () => void;
}

export default function ChatButton({ onClick }: ChatButtonProps) {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) return null;

  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-emerald-600 text-white p-4 rounded-full shadow-lg hover:bg-emerald-700 transition-colors"
      aria-label="Open chat"
    >
      <MessageCircle className="w-6 h-6" />
    </button>
  );
}