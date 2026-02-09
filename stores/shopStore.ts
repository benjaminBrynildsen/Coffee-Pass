import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CoffeeShop } from '@/types';
import { mockShops } from '@/data/mockData';

interface ShopState {
  shops: CoffeeShop[];
  searchQuery: string;
  selectedFilters: string[];
  
  // Actions
  setSearchQuery: (query: string) => void;
  toggleFilter: (filter: string) => void;
  clearFilters: () => void;
  getShopById: (id: string) => CoffeeShop | undefined;
  getFilteredShops: () => CoffeeShop[];
  getShopsNearby: (latitude: number, longitude: number, radiusInMiles?: number) => CoffeeShop[];
}

export const useShopStore = create<ShopState>()(
  persist(
    (set, get) => ({
      shops: mockShops,
      searchQuery: '',
      selectedFilters: [],

      setSearchQuery: (query) => set({ searchQuery: query }),
      
      toggleFilter: (filter) => set((state) => ({
        selectedFilters: state.selectedFilters.includes(filter)
          ? state.selectedFilters.filter(f => f !== filter)
          : [...state.selectedFilters, filter],
      })),
      
      clearFilters: () => set({ selectedFilters: [], searchQuery: '' }),
      
      getShopById: (id) => {
        return get().shops.find(shop => shop.id === id);
      },
      
      getFilteredShops: () => {
        const { shops, searchQuery, selectedFilters } = get();
        
        return shops.filter(shop => {
          // Search filter
          const matchesSearch = !searchQuery || 
            shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            shop.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
            shop.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
          
          // Tag filters
          const matchesFilters = selectedFilters.length === 0 ||
            selectedFilters.some(filter => 
              shop.tags.includes(filter) || 
              shop.amenities.includes(filter)
            );
          
          return matchesSearch && matchesFilters;
        });
      },
      
      getShopsNearby: (latitude, longitude, radiusInMiles = 5) => {
        const { shops } = get();
        
        return shops.filter(shop => {
          const distance = calculateDistance(
            latitude,
            longitude,
            shop.coordinates.latitude,
            shop.coordinates.longitude
          );
          return distance <= radiusInMiles;
        }).sort((a, b) => {
          const distA = calculateDistance(latitude, longitude, a.coordinates.latitude, a.coordinates.longitude);
          const distB = calculateDistance(latitude, longitude, b.coordinates.latitude, b.coordinates.longitude);
          return distA - distB;
        });
      },
    }),
    {
      name: 'shop-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

// Haversine formula to calculate distance between two coordinates
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 3959; // Earth's radius in miles
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
  return R * c;
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}
