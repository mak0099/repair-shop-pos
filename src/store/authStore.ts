import { create } from 'zustand';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem('authToken') || null,
  isAuthenticated: !!localStorage.getItem('authToken'),
  
  login: (user, token) => {
    localStorage.setItem('authToken', token);
    set({ user, token, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem('authToken');
    set({ user: null, token: null, isAuthenticated: false });
  },
}));

// Initialize store from localStorage on application load
const initialToken = localStorage.getItem('authToken');
if (initialToken) {
  // In a real app, you would fetch the user profile here using the token
  // For now, we'll use a placeholder user if a token exists.
  const placeholderUser: User = {
    id: 'user_mamun',
    name: 'mamun',
    branch: 'SPR.SRL'
  };
  useAuthStore.getState().login(placeholderUser, initialToken);
}