import { create } from 'zustand';
import api from '../lib/api';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  login: (token, user) => {
    localStorage.setItem('token', token);
    set({ user, isLoading: false });
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, isLoading: false });
  },
  checkAuth: async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const res = await api.get('/me');
        set({ user: res.data, isLoading: false });
      } catch (error) {
        localStorage.removeItem('token');
        set({ user: null, isLoading: false });
      }
    } else {
      set({ user: null, isLoading: false });
    }
  }
}));
