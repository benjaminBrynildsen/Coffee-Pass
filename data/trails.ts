import { Trail } from '../types';

export const STL_TRAILS: Trail[] = [
  {
    id: "trail-south-city",
    name: "South City Coffee Crawl",
    description: "Explore the best of South City coffee culture. From serious roasters to cozy neighborhood spots.",
    imageUrl: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=1000",
    difficulty: "medium",
    estimatedTime: 180,
    distance: 4.2,
    shopIds: ["sump-coffee", "omens-coffee", "la-finca", "mokabes"],
    rewards: [
      {
        id: "reward-south-city",
        name: "South City Champion",
        description: "Complete the South City Coffee Crawl",
        type: "badge",
        value: 100,
        icon: "🏆"
      },
      {
        id: "discount-south-city",
        name: "10% Off Next Visit",
        description: "10% off at any South City coffee shop",
        type: "discount",
        value: 10,
        icon: "💰"
      }
    ],
    tags: ["South City", "Local Favorites", "Roasters"],
    createdAt: "2024-01-01",
    featured: true
  },
  {
    id: "trail-loop-delmar",
    name: "Delmar Loop Experience",
    description: "The iconic Delmar Loop coffee scene. From legendary institutions to modern craft coffee.",
    imageUrl: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=1000",
    difficulty: "easy",
    estimatedTime: 120,
    distance: 2.1,
    shopIds: ["blueprint-coffee", "meshuggah-cafe"],
    rewards: [
      {
        id: "reward-loop",
        name: "Loop Explorer",
        description: "Complete the Delmar Loop Experience",
        type: "badge",
        value: 75,
        icon: "🎭"
      }
    ],
    tags: ["Delmar Loop", "Iconic", "Historic"],
    createdAt: "2024-01-01",
    featured: true
  },
  {
    id: "trail-botanical",
    name: "Botanical & Beautiful",
    description: "Coffee shops that bring the outdoors in. Plant-filled spaces perfect for relaxation.",
    imageUrl: "https://images.unsplash.com/photo-1469631423023-18c0525b2480?auto=format&fit=crop&q=80&w=1000",
    difficulty: "easy",
    estimatedTime: 90,
    distance: 3.5,
    shopIds: ["fiddlehead-fern", "rise-coffee"],
    rewards: [
      {
        id: "reward-botanical",
        name: "Plant Parent",
        description: "Complete the Botanical & Beautiful trail",
        type: "badge",
        value: 50,
        icon: "🌿"
      }
    ],
    tags: ["Plants", "Aesthetic", "Instagram-worthy"],
    createdAt: "2024-01-01"
  },
  {
    id: "trail-early-bird",
    name: "Early Bird Special",
    description: "For those who need coffee before the sun comes up. Shops that open at 6am or earlier.",
    imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1000",
    difficulty: "hard",
    estimatedTime: 240,
    distance: 12.0,
    shopIds: ["goshen-coffee", "park-avenue-coffee"],
    rewards: [
      {
        id: "reward-early",
        name: "Early Bird",
        description: "Complete the Early Bird Special trail",
        type: "badge",
        value: 150,
        icon: "🌅"
      },
      {
        id: "free-coffee-early",
        name: "Free Morning Coffee",
        description: "Get a free coffee at any participating shop before 8am",
        type: "free_coffee",
        value: 1,
        icon: "☕"
      }
    ],
    tags: ["Early Riser", "Morning", "Productivity"],
    createdAt: "2024-01-01"
  },
  {
    id: "trail-artisan",
    name: "Artisan Alley",
    description: "Serious coffee for serious people. The best roasters and most meticulous preparation in STL.",
    imageUrl: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=1000",
    difficulty: "medium",
    estimatedTime: 150,
    distance: 5.5,
    shopIds: ["sump-coffee", "blueprint-coffee", "coffeestamp", "northwest-coffee"],
    rewards: [
      {
        id: "reward-artisan",
        name: "Coffee Connoisseur",
        description: "Complete the Artisan Alley trail",
        type: "badge",
        value: 200,
        icon: "🎖️"
      },
      {
        id: "points-artisan",
        name: "500 Bonus Points",
        description: "Earn 500 bonus points for completing Artisan Alley",
        type: "points",
        value: 500,
        icon: "⭐"
      }
    ],
    tags: ["Artisan", "Roasters", "Craft", "Serious Coffee"],
    createdAt: "2024-01-01",
    featured: true
  },
  {
    id: "trail-community",
    name: "Community Hubs",
    description: "Coffee shops that bring people together. Great for meeting friends, working, or just belonging.",
    imageUrl: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&q=80&w=1000",
    difficulty: "easy",
    estimatedTime: 120,
    distance: 4.0,
    shopIds: ["rise-coffee", "mokabes", "protagonist-cafe"],
    rewards: [
      {
        id: "reward-community",
        name: "Community Builder",
        description: "Complete the Community Hubs trail",
        type: "badge",
        value: 100,
        icon: "🤝"
      }
    ],
    tags: ["Community", "Social", "Inclusive"],
    createdAt: "2024-01-01"
  },
  {
    id: "trail-hidden-gems",
    name: "Hidden Gems",
    description: "Discover the lesser-known spots that locals love. Off the beaten path but worth the trip.",
    imageUrl: "https://images.unsplash.com/photo-1517701604599-bb29b5c7355c?auto=format&fit=crop&q=80&w=1000",
    difficulty: "hard",
    estimatedTime: 300,
    distance: 18.0,
    shopIds: ["zensia", "omens-coffee", "la-finca", "coffeestamp"],
    rewards: [
      {
        id: "reward-hidden",
        name: "Explorer",
        description: "Complete the Hidden Gems trail",
        type: "badge",
        value: 250,
        icon: "🧭"
      }
    ],
    tags: ["Hidden Gems", "Local Secrets", "Off the Beaten Path"],
    createdAt: "2024-01-01"
  },
  {
    id: "trail-weekend",
    name: "Weekend Warrior",
    description: "Shops with great brunch and extended hours. Perfect for Saturday morning adventures.",
    imageUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=1000",
    difficulty: "easy",
    estimatedTime: 180,
    distance: 6.0,
    shopIds: ["rise-coffee", "fiddlehead-fern", "park-avenue-coffee"],
    rewards: [
      {
        id: "reward-weekend",
        name: "Weekend Warrior",
        description: "Complete the Weekend Warrior trail",
        type: "badge",
        value: 75,
        icon: "🎯"
      }
    ],
    tags: ["Weekend", "Brunch", "Relaxing"],
    createdAt: "2024-01-01"
  }
];

// Helper to get trail by ID
export const getTrailById = (id: string): Trail | undefined => {
  return STL_TRAILS.find(trail => trail.id === id);
};

// Helper to get featured trails
export const getFeaturedTrails = (): Trail[] => {
  return STL_TRAILS.filter(trail => trail.featured);
};

// Helper to get trails by difficulty
export const getTrailsByDifficulty = (difficulty: Trail['difficulty']): Trail[] => {
  return STL_TRAILS.filter(trail => trail.difficulty === difficulty);
};

// Helper to get trails containing a specific shop
export const getTrailsByShop = (shopId: string): Trail[] => {
  return STL_TRAILS.filter(trail => trail.shopIds.includes(shopId));
};
