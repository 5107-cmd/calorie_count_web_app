import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface Meal {
  dishName: string;
  servings: number;
  totalCalories: number;
  date: string;
}

interface AuthState {
  token: string | null;
  user: { email: string; firstName?: string; lastName?: string } | null;
  previousMeals: Meal[];
  theme: 'light' | 'dark';
  setToken: (token: string | null) => void;
  setUser: (user: { email: string; firstName?: string; lastName?: string } | null) => void;
  addMeal: (meal: Meal) => void;
  clearMeals: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      previousMeals: [],
      theme: 'light',
      setToken: (token) => set({ token }),
      setUser: (user) => set({ user }),
      addMeal: (meal) => set((state) => ({ previousMeals: [...state.previousMeals, meal] })),
      clearMeals: () => set({ previousMeals: [] }),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
