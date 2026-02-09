import { User, Achievement, Reward } from '../types';

export const CURRENT_USER: User = {
  id: "user-001",
  name: "Coffee Lover",
  username: "@coffeelover",
  email: "user@coffeepass.app",
  avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=200",
  bio: "Exploring St. Louis one coffee shop at a time ☕",
  level: 5,
  xp: 2450,
  stats: {
    totalCheckins: 24,
    uniqueShopsVisited: 8,
    currentStreak: 5,
    longestStreak: 12,
    trailsCompleted: 2,
    rewardsEarned: 7,
    points: 850
  },
  achievements: ["early-bird", "first-checkin", "streak-7", "trail-blazer"],
  favoriteShops: ["sump-coffee", "blueprint-coffee"],
  joinedAt: "2024-01-15T00:00:00Z"
};

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "first-checkin",
    name: "First Sip",
    description: "Check in to your first coffee shop",
    icon: "☕",
    requirement: 1,
    requirementType: "checkins",
    tier: "bronze"
  },
  {
    id: "checkins-10",
    name: "Regular",
    description: "Check in 10 times",
    icon: "🎯",
    requirement: 10,
    requirementType: "checkins",
    tier: "bronze"
  },
  {
    id: "checkins-50",
    name: "Coffee Addict",
    description: "Check in 50 times",
    icon: "⚡",
    requirement: 50,
    requirementType: "checkins",
    tier: "silver"
  },
  {
    id: "checkins-100",
    name: "Caffeine Fiend",
    description: "Check in 100 times",
    icon: "🔥",
    requirement: 100,
    requirementType: "checkins",
    tier: "gold"
  },
  {
    id: "shops-5",
    name: "Explorer",
    description: "Visit 5 different coffee shops",
    icon: "🗺️",
    requirement: 5,
    requirementType: "shops",
    tier: "bronze"
  },
  {
    id: "shops-15",
    name: "Adventurer",
    description: "Visit 15 different coffee shops",
    icon: "🧭",
    requirement: 15,
    requirementType: "shops",
    tier: "silver"
  },
  {
    id: "shops-30",
    name: "Coffee Tourist",
    description: "Visit 30 different coffee shops",
    icon: "🌟",
    requirement: 30,
    requirementType: "shops",
    tier: "gold"
  },
  {
    id: "streak-3",
    name: "Getting Started",
    description: "Maintain a 3-day check-in streak",
    icon: "📅",
    requirement: 3,
    requirementType: "streak",
    tier: "bronze"
  },
  {
    id: "streak-7",
    name: "Week Warrior",
    description: "Maintain a 7-day check-in streak",
    icon: "🔥",
    requirement: 7,
    requirementType: "streak",
    tier: "silver"
  },
  {
    id: "streak-30",
    name: "Month Master",
    description: "Maintain a 30-day check-in streak",
    icon: "💪",
    requirement: 30,
    requirementType: "streak",
    tier: "gold"
  },
  {
    id: "trail-blazer",
    name: "Trail Blazer",
    description: "Complete your first trail",
    icon: "🏆",
    requirement: 1,
    requirementType: "trails",
    tier: "bronze"
  },
  {
    id: "trail-master",
    name: "Trail Master",
    description: "Complete 5 trails",
    icon: "🎖️",
    requirement: 5,
    requirementType: "trails",
    tier: "silver"
  },
  {
    id: "points-1000",
    name: "Point Collector",
    description: "Earn 1,000 points",
    icon: "💰",
    requirement: 1000,
    requirementType: "points",
    tier: "bronze"
  },
  {
    id: "points-5000",
    name: "Point Hoarder",
    description: "Earn 5,000 points",
    icon: "💎",
    requirement: 5000,
    requirementType: "points",
    tier: "silver"
  },
  {
    id: "early-bird",
    name: "Early Bird",
    description: "Check in before 7am",
    icon: "🌅",
    requirement: 1,
    requirementType: "checkins",
    tier: "bronze"
  }
];

export const AVAILABLE_REWARDS: Reward[] = [
  {
    id: "reward-free-coffee",
    name: "Free Coffee",
    description: "Get a free coffee at any participating shop",
    type: "free_coffee",
    value: 1,
    cost: 500,
    imageUrl: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=500",
    isRedeemed: false
  },
  {
    id: "reward-10-percent",
    name: "10% Off",
    description: "10% off your next purchase",
    type: "discount",
    value: 10,
    cost: 250,
    imageUrl: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=500",
    isRedeemed: false
  },
  {
    id: "reward-25-percent",
    name: "25% Off",
    description: "25% off your next purchase",
    type: "discount",
    value: 25,
    cost: 600,
    imageUrl: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=500",
    isRedeemed: false
  },
  {
    id: "reward-free-pastry",
    name: "Free Pastry",
    description: "Get a free pastry with any drink",
    type: "free_coffee",
    value: 1,
    cost: 350,
    imageUrl: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=500",
    isRedeemed: false
  },
  {
    id: "reward-merch-mug",
    name: "Coffee Pass Mug",
    description: "Exclusive Coffee Pass branded mug",
    type: "merchandise",
    value: 25,
    cost: 1000,
    imageUrl: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&q=80&w=500",
    isRedeemed: false
  },
  {
    id: "reward-points-boost",
    name: "2x Points Day",
    description: "Earn double points for 24 hours",
    type: "points",
    value: 2,
    cost: 400,
    imageUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=500",
    isRedeemed: false
  }
];

// User's earned rewards
export const USER_REWARDS: Reward[] = [
  {
    id: "user-reward-1",
    name: "South City Champion",
    description: "Complete the South City Coffee Crawl",
    type: "badge",
    value: 100,
    cost: 0,
    imageUrl: "🏆",
    isRedeemed: true,
    redeemedAt: "2024-02-01T00:00:00Z"
  },
  {
    id: "user-reward-2",
    name: "10% Off Sump Coffee",
    description: "10% off your next visit to Sump Coffee",
    type: "discount",
    value: 10,
    cost: 0,
    imageUrl: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=500",
    isRedeemed: false,
    expiresAt: "2024-03-01T00:00:00Z"
  },
  {
    id: "user-reward-3",
    name: "Free Birthday Coffee",
    description: "Free coffee on your birthday",
    type: "free_coffee",
    value: 1,
    cost: 0,
    imageUrl: "🎂",
    isRedeemed: false,
    expiresAt: "2024-12-31T00:00:00Z"
  }
];
