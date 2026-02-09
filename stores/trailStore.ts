import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Trail, TrailProgress } from '@/types';
import { mockTrails } from '@/data/mockData';

interface TrailState {
  trails: Trail[];
  trailProgress: TrailProgress[];
  
  // Actions
  startTrail: (trailId: string, userId: string) => void;
  visitShopOnTrail: (trailId: string, shopId: string, userId: string) => void;
  getTrailProgress: (trailId: string, userId: string) => TrailProgress | undefined;
  getCompletedTrails: (userId: string) => string[];
  getProgressForTrail: (trailId: string, userId: string) => {
    total: number;
    visited: number;
    percentage: number;
  };
}

export const useTrailStore = create<TrailState>()(
  persist(
    (set, get) => ({
      trails: mockTrails,
      trailProgress: [],

      startTrail: (trailId, userId) => set((state) => {
        const existing = state.trailProgress.find(
          p => p.trailId === trailId && p.userId === userId
        );
        
        if (existing) return state;
        
        const newProgress: TrailProgress = {
          trailId,
          userId,
          startedAt: new Date().toISOString(),
          visitedShopIds: [],
          isCompleted: false,
        };
        
        return {
          trailProgress: [...state.trailProgress, newProgress],
        };
      }),
      
      visitShopOnTrail: (trailId, shopId, userId) => set((state) => {
        const trail = state.trails.find(t => t.id === trailId);
        if (!trail) return state;
        
        const progressIndex = state.trailProgress.findIndex(
          p => p.trailId === trailId && p.userId === userId
        );
        
        let newProgress: TrailProgress[];
        
        if (progressIndex === -1) {
          // Start trail if not started
          const isCompleted = trail.shopIds.length === 1 && trail.shopIds[0] === shopId;
          newProgress = [...state.trailProgress, {
            trailId,
            userId,
            startedAt: new Date().toISOString(),
            completedAt: isCompleted ? new Date().toISOString() : undefined,
            visitedShopIds: [shopId],
            isCompleted,
          }];
        } else {
          // Update existing progress
          const current = state.trailProgress[progressIndex];
          if (current.visitedShopIds.includes(shopId)) return state;
          
          const newVisited = [...current.visitedShopIds, shopId];
          const isCompleted = newVisited.length === trail.shopIds.length;
          
          newProgress = [...state.trailProgress];
          newProgress[progressIndex] = {
            ...current,
            visitedShopIds: newVisited,
            isCompleted,
            completedAt: isCompleted ? new Date().toISOString() : undefined,
          };
        }
        
        return { trailProgress: newProgress };
      }),
      
      getTrailProgress: (trailId, userId) => {
        return get().trailProgress.find(
          p => p.trailId === trailId && p.userId === userId
        );
      },
      
      getCompletedTrails: (userId) => {
        return get().trailProgress
          .filter(p => p.userId === userId && p.isCompleted)
          .map(p => p.trailId);
      },
      
      getProgressForTrail: (trailId, userId) => {
        const trail = get().trails.find(t => t.id === trailId);
        const progress = get().trailProgress.find(
          p => p.trailId === trailId && p.userId === userId
        );
        
        const total = trail?.shopIds.length || 0;
        const visited = progress?.visitedShopIds.length || 0;
        
        return {
          total,
          visited,
          percentage: total > 0 ? Math.round((visited / total) * 100) : 0,
        };
      },
    }),
    {
      name: 'trail-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
