export interface CoffeeShop {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone?: string;
  website?: string;
  imageUrl?: string;
  rating: number;
  reviewCount: number;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  hours: {
    [key: string]: string;
  };
  amenities: string[];
  tags: string[];
  priceLevel: 1 | 2 | 3 | 4;
}

export interface User {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  email: string;
  bio?: string;
  level: number;
  xp: number;
  stats: UserStats;
  achievements: string[];
  favoriteShops: string[];
  joinedAt: string;
}

export interface UserStats {
  totalCheckins: number;
  uniqueShopsVisited: number;
  currentStreak: number;
  longestStreak: number;
  trailsCompleted: number;
  rewardsEarned: number;
  points: number;
}

export interface CheckIn {
  id: string;
  userId: string;
  shopId: string;
  timestamp: string;
  note?: string;
  rating?: number;
  photoUrl?: string;
  latitude?: number;
  longitude?: number;
}

export interface Trail {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: number; // in minutes
  distance: number; // in miles
  shopIds: string[];
  rewards: TrailReward[];
  tags: string[];
  createdBy?: string;
  createdAt: string;
  featured?: boolean;
}

export interface TrailProgress {
  trailId: string;
  userId: string;
  startedAt: string;
  completedAt?: string;
  visitedShopIds: string[];
  isCompleted: boolean;
}

export interface TrailReward {
  id: string;
  name: string;
  description: string;
  type: 'badge' | 'discount' | 'free_coffee' | 'points';
  value: number;
  icon?: string;
}

export interface Reward {
  id: string;
  name: string;
  description: string;
  type: 'discount' | 'free_coffee' | 'merchandise' | 'points';
  value: number;
  shopId?: string;
  imageUrl?: string;
  cost: number; // points cost
  expiresAt?: string;
  isRedeemed: boolean;
  redeemedAt?: string;
}

export interface UserReward {
  rewardId: string;
  userId: string;
  acquiredAt: string;
  redeemedAt?: string;
  isRedeemed: boolean;
}

export interface SocialPost {
  id: string;
  userId: string;
  type: 'checkin' | 'trail_complete' | 'reward' | 'review';
  content?: string;
  imageUrl?: string;
  shopId?: string;
  trailId?: string;
  rewardId?: string;
  rating?: number;
  likes: number;
  likedBy: string[];
  comments: Comment[];
  createdAt: string;
}

export interface Comment {
  id: string;
  userId: string;
  content: string;
  createdAt: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: number;
  requirementType: 'checkins' | 'shops' | 'streak' | 'trails' | 'points';
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
}
