import coldBrewImage from "@assets/generated_images/cold_brew_coffee_flight_on_a_wooden_board.png";
import { ProviderType, RewardSourceType } from "@/integrations/types";

// --- Types ---

export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio?: string;
  stats: {
    collected: number;
    trails: number;
    streak: number;
  };
}

export interface Shop {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  tags: string[];
  rating: number; // internal score
  image: string;
  description: string;
  isOpen: boolean;
  distance: string;
  
  // New Integration Fields
  externalProvider?: ProviderType;
  externalShopId?: string;
}

export interface Reward {
  id: string;
  type: 'PLATFORM' | 'PARTNER';
  title: string;
  description: string;
  criteria: string;
  progress: number;
  total: number;
  status: 'LOCKED' | 'UNLOCKED' | 'REVEAL_STARTED' | 'REDEEMED';
  shopId?: string; // For partner rewards
  expiryDate?: string;
  
  // New Reward Source Fields
  rewardSource: RewardSourceType;
  code?: string; // For POS_CODE
  externalProvider?: ProviderType;
}

export interface Trail {
  id: string;
  title: string;
  description: string;
  shops: string[]; // shop ids
  completed: number;
  total: number;
  image: string;
}

export interface FeedItem {
  id: string;
  userId: string;
  type: 'CHECKIN' | 'TRAIL_COMPLETE' | 'REWARD_UNLOCKED';
  title: string;
  subtitle: string;
  image?: string;
  timestamp: string;
}

// --- Mock Data ---

export const CURRENT_USER: User = {
  id: "u1",
  name: "Dustin Henderson",
  username: "@dustin",
  avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=200",
  bio: "Science & Coffee Nerd • Hawkins",
  stats: {
    collected: 24,
    trails: 5,
    streak: 12
  }
};

export const MOCK_FRIENDS: User[] = [
  {
    id: "u2",
    name: "Steve Harrington",
    username: "@steve_hair",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    stats: { collected: 18, trails: 2, streak: 3 }
  },
  {
    id: "u3",
    name: "Robin Buckley",
    username: "@robin_b",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
    stats: { collected: 32, trails: 6, streak: 8 }
  },
  {
    id: "u4",
    name: "Lucas Sinclair",
    username: "@lucas_s",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    stats: { collected: 15, trails: 1, streak: 0 }
  }
];

export const MOCK_FEED: FeedItem[] = [
  {
    id: "f1",
    userId: "u2",
    type: "CHECKIN",
    title: "Steve checked in at Sump Coffee",
    subtitle: "Drinking a Pour Over",
    timestamp: "20m ago"
  },
  {
    id: "f2",
    userId: "u3",
    type: "REWARD_UNLOCKED",
    title: "Robin unlocked 'Caffeine Streak'",
    subtitle: "3 shops in 7 days!",
    timestamp: "2h ago"
  },
  {
    id: "f3",
    userId: "u3",
    type: "CHECKIN",
    title: "Robin checked in at Comet Coffee",
    subtitle: "Drinking a Latte",
    timestamp: "2h ago"
  }
];

export const MOCK_SHOPS: Shop[] = [
  {
    id: "1",
    name: "Sump Coffee",
    address: "3700 S Jefferson Ave",
    lat: 38.5915,
    lng: -90.2290,
    tags: ["Pour Over", "Light Roast", "Quiet", "House Roasted", "Vibe: Minimalist", "Machine: Slayer"],
    rating: 98,
    image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=1000",
    description: "Serious coffee for serious people. Known for their meticulous pour-overs and single-origin beans.",
    isOpen: true,
    distance: "0.8 mi",
    externalProvider: "SQUARE"
  },
  {
    id: "2",
    name: "Comet Coffee",
    address: "5708 Oakland Ave",
    lat: 38.6295,
    lng: -90.2840,
    tags: ["Pastries", "Espresso", "Cozy", "House Syrups", "Sweet Tooth", "Vibe: Social", "Machine: La Marzocco"],
    rating: 95,
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1000",
    description: "Micro-roastery with house-made pastries and a cozy atmosphere perfect for morning rituals.",
    isOpen: true,
    distance: "2.1 mi",
    externalProvider: "TOAST"
  },
  {
    id: "3",
    name: "Blueprint Coffee",
    address: "6225 Delmar Blvd",
    lat: 38.6550,
    lng: -90.2970,
    tags: ["Work Friendly", "Single Origin", "Modern", "House Roasted", "Vibe: Digital Nomad", "Machine: Synesso"],
    rating: 96,
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=1000",
    description: "Industrial-chic spot focused on transparency and precision in every cup.",
    isOpen: true,
    distance: "3.5 mi"
  },
  {
    id: "4",
    name: "Rise Coffee",
    address: "4176 Manchester Ave",
    lat: 38.6265,
    lng: -90.2540,
    tags: ["Brunch", "Community", "Kid Friendly", "Sweet Tooth", "Vibe: Fast Paced", "Machine: La Marzocco"],
    rating: 92,
    image: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&q=80&w=1000",
    description: "A community hub in the Grove serving inclusive vibes and solid brews.",
    isOpen: false,
    distance: "1.2 mi"
  },
  {
    id: "5",
    name: "Fiddlehead Fern",
    address: "4066 Russell Blvd",
    lat: 38.6120,
    lng: -90.2500,
    tags: ["Botanical", "Toast", "Tea", "House Syrups", "Vibe: Date Night", "Machine: Modbar"],
    rating: 94,
    image: "https://images.unsplash.com/photo-1469631423023-18c0525b2480?auto=format&fit=crop&q=80&w=1000",
    description: "Plant-filled cafe serving floral lattes and artisanal toasts.",
    isOpen: true,
    distance: "1.5 mi"
  }
];

export const MOCK_TRAILS: Trail[] = [
  {
    id: "t1",
    title: "The Cold Brew Circuit",
    description: "Beat the heat with the city's smoothest cold brews.",
    shops: ["1", "3", "4"],
    completed: 1,
    total: 3,
    image: coldBrewImage
  },
  {
    id: "t2",
    title: "Laptop Warrior Havens",
    description: "Best spots with reliable wifi and plenty of outlets.",
    shops: ["2", "3", "5"],
    completed: 0,
    total: 3,
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "t3",
    title: "Espresso Excellence",
    description: "For the purists. Shots pulled to perfection.",
    shops: ["1", "2"],
    completed: 2,
    total: 2,
    image: "https://images.unsplash.com/photo-1462917882517-e15001d6968f?auto=format&fit=crop&q=80&w=1000"
  }
];

export const MOCK_REWARDS: Reward[] = [
  // Platform Rewards
  {
    id: "r1",
    type: "PLATFORM",
    title: "New Explorer",
    description: "Visit 5 different coffee shops.",
    criteria: "5 Check-ins",
    progress: 3,
    total: 5,
    status: "LOCKED",
    rewardSource: "MANUAL"
  },
  {
    id: "r2",
    type: "PLATFORM",
    title: "Free Month of Coffee Pass",
    description: "Visit 10 different coffee shops to unlock a free month.",
    criteria: "10 Check-ins",
    progress: 3,
    total: 10,
    status: "LOCKED",
    rewardSource: "MANUAL"
  },
  {
    id: "r3",
    type: "PLATFORM",
    title: "Caffeine Streak",
    description: "Visit 3 shops in 7 days.",
    criteria: "Streak",
    progress: 1,
    total: 3,
    status: "LOCKED",
    rewardSource: "MANUAL"
  },
  // Partner Rewards
  {
    id: "r4",
    type: "PARTNER",
    title: "Free Drip Coffee",
    description: "Check in 5 times at Sump Coffee.",
    criteria: "5 Sump Visits",
    progress: 4,
    total: 5,
    status: "LOCKED",
    shopId: "1",
    code: "SUMPFREE",
    rewardSource: "POS_CODE",
    externalProvider: "SQUARE"
  },
  {
    id: "r5",
    type: "PARTNER",
    title: "BOGO Pastry",
    description: "Complete the Cold Brew Circuit to unlock.",
    criteria: "Trail Completion",
    progress: 1,
    total: 1,
    status: "UNLOCKED",
    shopId: "2",
    expiryDate: "Expires in 6 days",
    code: "COFFEEPASSFREE",
    rewardSource: "POS_CODE",
    externalProvider: "TOAST"
  }
];
