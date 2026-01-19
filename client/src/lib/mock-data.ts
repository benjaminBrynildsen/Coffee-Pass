
import coldBrewImage from "@assets/generated_images/cold_brew_coffee_flight_on_a_wooden_board.png";

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
  code?: string; // Mock code for partner rewards
}

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
    status: "LOCKED"
  },
  {
    id: "r2",
    type: "PLATFORM",
    title: "Free Month of Coffee Pass",
    description: "Visit 10 different coffee shops to unlock a free month.",
    criteria: "10 Check-ins",
    progress: 3,
    total: 10,
    status: "LOCKED"
  },
  {
    id: "r3",
    type: "PLATFORM",
    title: "Caffeine Streak",
    description: "Visit 3 shops in 7 days.",
    criteria: "Streak",
    progress: 1,
    total: 3,
    status: "LOCKED"
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
    code: "SUMPFREE"
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
    code: "COFFEEPASSFREE"
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
    distance: "0.8 mi"
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
    distance: "2.1 mi"
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
