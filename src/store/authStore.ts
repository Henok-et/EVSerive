import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { createUserWithProfile, signInUser } from '../lib/auth';
import type { User, UserRole, AuthState } from '../types/auth';

interface AuthStore extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  role: null,

  register: async (email, password, name, role) => {
    try {
      const user = await createUserWithProfile(email, password, name, role);
      set({
        user: {
          id: user.id,
          email: user.email!,
          name,
          role
        },
        isAuthenticated: true,
        role
      });
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  login: async (email, password) => {
    try {
      const { user, profile } = await signInUser(email, password);
      set({
        user: {
          id: user.id,
          email: user.email!,
          name: profile.name,
          role: profile.role
        },
        isAuthenticated: true,
        role: profile.role
      });
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  logout: async () => {
    try {
      await supabase.auth.signOut();
      set({ user: null, isAuthenticated: false, role: null });
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }
}));