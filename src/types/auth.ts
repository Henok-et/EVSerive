export type UserRole = 'admin' | 'client' | 'provider';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  role: UserRole | null;
}