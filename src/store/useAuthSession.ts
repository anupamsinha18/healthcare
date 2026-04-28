import { create } from 'zustand';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';

export interface User {
  uid: string;
  email: string;
  displayName: string;
  role: 'admin' | 'doctor';
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (user: User) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  initialize: () => void;
}

export const useAuthSession = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
  login: (user) => set({ user, isAuthenticated: true, error: null, isLoading: false }),
  logout: () => {
    import('../services/authService').then(({ signOut }) => signOut());
    set({ user: null, isAuthenticated: false, error: null, isLoading: false });
  },
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error, isLoading: false }),
  initialize: () => {
    onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        set({
          user: {
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            displayName: firebaseUser.displayName || 'Healthcare User',
            role: 'admin'
          },
          isAuthenticated: true,
          isLoading: false
        });
      } else {
        set({ user: null, isAuthenticated: false, isLoading: false });
      }
    });
  }
}));
