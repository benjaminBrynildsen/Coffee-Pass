import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, CheckIn, UserStats } from '@/types';
import { mockUser } from '@/data/mockData';

interface UserState {
  user: User | null;
  checkIns: CheckIn[];
  isAuthenticated: boolean;
  
  // Actions
  setUser: (user: User) => void;
  updateUser: (updates: Partial<User>) => void;
  updateStats: (updates: Partial<UserStats>) => void;
  addCheckIn: (checkIn: CheckIn) => void;
  addPoints: (points: number) => void;
  addXp: (xp: number) => void;
  addAchievement: (achievementId: string) => void;
  addFavoriteShop: (shopId: string) => void;
  removeFavoriteShop: (shopId: string) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: mockUser, // Start with mock user for demo
      checkIns: [],
      isAuthenticated: true, // Auto-authenticated for demo

      setUser: (user) => set({ user, isAuthenticated: true }),
      
      updateUser: (updates) => set((state) => ({
        user: state.user ? { ...state.user, ...updates } : null,
      })),
      
      updateStats: (updates) => set((state) => ({
        user: state.user ? {
          ...state.user,
          stats: { ...state.user.stats, ...updates },
        } : null,
      })),
      
      addCheckIn: (checkIn) => set((state) => {
        const newCheckIns = [checkIn, ...state.checkIns];
        const uniqueShops = new Set(newCheckIns.map(c => c.shopId));
        
        return {
          checkIns: newCheckIns,
          user: state.user ? {
            ...state.user,
            stats: {
              ...state.user.stats,
              totalCheckins: newCheckIns.length,
              uniqueShopsVisited: uniqueShops.size,
            },
          } : null,
        };
      }),
      
      addPoints: (points) => set((state) => ({
        user: state.user ? {
          ...state.user,
          stats: {
            ...state.user.stats,
            points: state.user.stats.points + points,
          },
        } : null,
      })),
      
      addXp: (xp) => set((state) => {
        if (!state.user) return state;
        
        const newXp = state.user.xp + xp;
        const newLevel = Math.floor(newXp / 500) + 1;
        
        return {
          user: {
            ...state.user,
            xp: newXp,
            level: newLevel > state.user.level ? newLevel : state.user.level,
          },
        };
      }),
      
      addAchievement: (achievementId) => set((state) => ({
        user: state.user ? {
          ...state.user,
          achievements: state.user.achievements.includes(achievementId)
            ? state.user.achievements
            : [...state.user.achievements, achievementId],
        } : null,
      })),
      
      addFavoriteShop: (shopId) => set((state) => ({
        user: state.user ? {
          ...state.user,
          favoriteShops: state.user.favoriteShops.includes(shopId)
            ? state.user.favoriteShops
            : [...state.user.favoriteShops, shopId],
        } : null,
      })),
      
      removeFavoriteShop: (shopId) => set((state) => ({
        user: state.user ? {
          ...state.user,
          favoriteShops: state.user.favoriteShops.filter(id => id !== shopId),
        } : null,
      })),
      
      logout: () => set({ user: null, isAuthenticated: false, checkIns: [] }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
