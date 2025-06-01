import { User } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthStore {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  hasHydrated: boolean;
}

export const useAuth = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
      hasHydrated: false,
    }),
    {
      name: 'auth-storage',
      onRehydrateStorage: () => () => {
        useAuth.setState({ hasHydrated: true });
      },
    }
  )
);
