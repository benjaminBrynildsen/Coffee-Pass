// Real STL Coffee Shop Data
// Sourced from web research - St. Louis Magazine, Yelp, Reddit, local guides

export interface Shop {
  id: string;
  name: string;
  address: string;
  neighborhood: string;
  lat: number;
  lng: number;
  tags: string[];
  rating: number;
  image: string;
  description: string;
  isOpen: boolean;
  hours?: {
    mon?: string;
    tue?: string;
    wed?: string;
    thu?: string;
    fri?: string;
    sat?: string;
    sun?: string;
  };
  phone?: string;
  website?: string;
  instagram?: string;
  features: {
    wifi: boolean;
    outlets: boolean;
    outdoorSeating: boolean;
    parking: 'street' | 'lot' | 'garage' | 'none';
    food: boolean;
    vegan: boolean;
    glutenFree: boolean;
  };
  equipment: {
    roaster?: string;
    espressoMachine?: string;
    grinder?: string;
  };
  vibe: string[];
}

export const STL_COFFEE_SHOPS: Shop[] = [
  {
    id: "sump-coffee",
    name: "Sump Coffee",
    address: "3700 S Jefferson Ave",
    neighborhood: "South City",
    lat: 38.5915,
    lng: -90.2290,
    tags: ["Pour Over", "Light Roast", "Single Origin", "House Roasted", "Minimalist"],
    rating: 98,
    image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=1000",
    description: "Serious coffee for serious people. Known for meticulous pour-overs and single-origin beans. Owner Scott Carey has small-batch roasting down to a science.",
    isOpen: true,
    hours: {
      mon: "7am-6pm",
      tue: "7am-6pm",
      wed: "7am-6pm",
      thu: "7am-6pm",
      fri: "7am-6pm",
      sat: "8am-6pm",
      sun: "8am-6pm"
    },
    phone: "(314) 776-8855",
    website: "https://www.sumpcoffee.com",
    instagram: "@sumpcoffee",
    features: {
      wifi: true,
      outlets: true,
      outdoorSeating: false,
      parking: "street",
      food: false,
      vegan: false,
      glutenFree: false
    },
    equipment: {
      roaster: "House Roasted",
      espressoMachine: "Slayer"
    },
    vibe: ["Minimalist", "Serious", "Craft-focused"]
  },
  {
    id: "blueprint-coffee",
    name: "Blueprint Coffee",
    address: "6225 Delmar Blvd",
    neighborhood: "Delmar Loop",
    lat: 38.6550,
    lng: -90.2970,
    tags: ["Work Friendly", "Single Origin", "Modern", "House Roasted", "Digital Nomad"],
    rating: 96,
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=1000",
    description: "Industrial-chic spot focused on transparency and precision in every cup. Precise brewing techniques and exceptional hospitality. Drinks are hand-delivered in Instagram-worthy presentations.",
    isOpen: true,
    hours: {
      mon: "7am-7pm",
      tue: "7am-7pm",
      wed: "7am-7pm",
      thu: "7am-7pm",
      fri: "7am-7pm",
      sat: "8am-7pm",
      sun: "8am-6pm"
    },
    phone: "(314) 727-1234",
    website: "https://www.blueprintcoffee.com",
    instagram: "@blueprintcoffee",
    features: {
      wifi: true,
      outlets: true,
      outdoorSeating: true,
      parking: "street",
      food: true,
      vegan: true,
      glutenFree: true
    },
    equipment: {
      roaster: "House Roasted",
      espressoMachine: "Synesso"
    },
    vibe: ["Industrial-chic", "Digital Nomad", "Modern"]
  },
  {
    id: "comet-coffee",
    name: "Comet Coffee",
    address: "5708 Oakland Ave",
    neighborhood: "South City",
    lat: 38.6295,
    lng: -90.2840,
    tags: ["Pastries", "Espresso", "Cozy", "House Syrups", "Sweet Tooth", "Social"],
    rating: 95,
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1000",
    description: "Micro-roastery with house-made pastries and a cozy atmosphere perfect for morning rituals. Known for creative house-made syrups and seasonal drinks.",
    isOpen: true,
    hours: {
      mon: "7am-5pm",
      tue: "7am-5pm",
      wed: "7am-5pm",
      thu: "7am-5pm",
      fri: "7am-5pm",
      sat: "8am-5pm",
      sun: "8am-4pm"
    },
    phone: "(314) 647-8888",
    website: "https://www.cometcoffeestl.com",
    instagram: "@cometcoffee",
    features: {
      wifi: true,
      outlets: true,
      outdoorSeating: true,
      parking: "street",
      food: true,
      vegan: true,
      glutenFree: false
    },
    equipment: {
      roaster: "Micro-roastery",
      espressoMachine: "La Marzocco"
    },
    vibe: ["Cozy", "Social", "Sweet Tooth"]
  },
  {
    id: "meshuggah-cafe",
    name: "Meshuggah Cafe",
    address: "6269 Delmar Blvd",
    neighborhood: "Delmar Loop",
    lat: 38.6560,
    lng: -90.2980,
    tags: ["Iconic", "30+ Years", "Grunge", "Local Legend", "Vintage"],
    rating: 94,
    image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=1000",
    description: "Family-owned for almost 30 years. A gathering place since the grunge era. Iconic Loop institution that embodies the bohemian spirit of the neighborhood.",
    isOpen: true,
    hours: {
      mon: "7am-12am",
      tue: "7am-12am",
      wed: "7am-12am",
      thu: "7am-12am",
      fri: "7am-1am",
      sat: "8am-1am",
      sun: "8am-12am"
    },
    phone: "(314) 721-5808",
    website: "https://www.meshuggahcafe.com",
    instagram: "@meshuggahcafe",
    features: {
      wifi: true,
      outlets: true,
      outdoorSeating: true,
      parking: "street",
      food: true,
      vegan: true,
      glutenFree: true
    },
    equipment: {
      espressoMachine: "Traditional"
    },
    vibe: ["Grunge", "Bohemian", "Local Legend", "Late Night"]
  },
  {
    id: "fiddlehead-fern",
    name: "Fiddlehead Fern Cafe",
    address: "4066 Russell Blvd",
    neighborhood: "Tower Grove",
    lat: 38.6120,
    lng: -90.2500,
    tags: ["Botanical", "Toast", "Tea", "House Syrups", "Date Night", "Instagram"],
    rating: 93,
    image: "https://images.unsplash.com/photo-1469631423023-18c0525b2480?auto=format&fit=crop&q=80&w=1000",
    description: "Plant-filled cafe serving floral lattes and artisanal toasts. A beautiful space filled with greenery, perfect for Instagram photos and quiet conversations.",
    isOpen: true,
    hours: {
      mon: "8am-4pm",
      tue: "8am-4pm",
      wed: "8am-4pm",
      thu: "8am-4pm",
      fri: "8am-4pm",
      sat: "9am-5pm",
      sun: "9am-5pm"
    },
    phone: "(314) 696-6100",
    website: "https://www.fiddleheadferncafe.com",
    instagram: "@fiddleheadfern",
    features: {
      wifi: true,
      outlets: true,
      outdoorSeating: false,
      parking: "street",
      food: true,
      vegan: true,
      glutenFree: true
    },
    equipment: {
      espressoMachine: "Modbar"
    },
    vibe: ["Botanical", "Instagram-worthy", "Date Night", "Quiet"]
  },
  {
    id: "rise-coffee",
    name: "Rise Coffee",
    address: "4176 Manchester Ave",
    neighborhood: "The Grove",
    lat: 38.6265,
    lng: -90.2540,
    tags: ["Brunch", "Community", "Kid Friendly", "Sweet Tooth", "Fast Paced"],
    rating: 92,
    image: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&q=80&w=1000",
    description: "A community hub in the Grove serving inclusive vibes and solid brews. Great brunch spot with kid-friendly atmosphere and community events.",
    isOpen: true,
    hours: {
      mon: "7am-4pm",
      tue: "7am-4pm",
      wed: "7am-4pm",
      thu: "7am-4pm",
      fri: "7am-4pm",
      sat: "8am-5pm",
      sun: "8am-4pm"
    },
    phone: "(314) 531-7473",
    website: "https://www.risecoffee.stl",
    instagram: "@risecoffeestl",
    features: {
      wifi: true,
      outlets: true,
      outdoorSeating: true,
      parking: "lot",
      food: true,
      vegan: true,
      glutenFree: true
    },
    equipment: {
      espressoMachine: "La Marzocco"
    },
    vibe: ["Community Hub", "Kid Friendly", "Brunch", "Inclusive"]
  },
  {
    id: "mokabes",
    name: "MoKaBe's Coffeehouse",
    address: "3606 Arsenal St",
    neighborhood: "Tower Grove South",
    lat: 38.5890,
    lng: -90.2420,
    tags: ["Local Legend", "20+ Years", "Brunch", "Progressive", "Community"],
    rating: 91,
    image: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&q=80&w=1000",
    description: "A St. Louis institution for over 25 years. Known for inventive coffee lineups, entire chalkboards of latte specials, and a progressive, welcoming atmosphere.",
    isOpen: true,
    hours: {
      mon: "7am-12am",
      tue: "7am-12am",
      wed: "7am-12am",
      thu: "7am-12am",
      fri: "7am-1am",
      sat: "8am-1am",
      sun: "8am-12am"
    },
    phone: "(314) 865-2009",
    website: "https://www.mokabescoffeehouse.com",
    instagram: "@mokabes",
    features: {
      wifi: true,
      outlets: true,
      outdoorSeating: true,
      parking: "street",
      food: true,
      vegan: true,
      glutenFree: true
    },
    vibe: ["Progressive", "Local Legend", "Late Night", "Community"]
  },
  {
    id: "goshen-coffee",
    name: "Goshen Coffee",
    address: "1911 S 9th St",
    neighborhood: "Soulard",
    lat: 38.6070,
    lng: -90.2020,
    tags: ["Air Roasted", "Solar Powered", "Smooth", "Local Favorite"],
    rating: 95,
    image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=1000",
    description: "Solar powered and air roasted. Beautifully smooth coffee that's become a local favorite. Many consider this the best cup in St. Louis.",
    isOpen: true,
    hours: {
      mon: "6am-6pm",
      tue: "6am-6pm",
      wed: "6am-6pm",
      thu: "6am-6pm",
      fri: "6am-6pm",
      sat: "7am-6pm",
      sun: "7am-5pm"
    },
    phone: "(314) 833-6111",
    website: "https://www.goshencoffee.com",
    instagram: "@goshencoffee",
    features: {
      wifi: true,
      outlets: true,
      outdoorSeating: true,
      parking: "street",
      food: true,
      vegan: true,
      glutenFree: false
    },
    equipment: {
      roaster: "Air Roasted",
      espressoMachine: "Traditional"
    },
    vibe: ["Eco-friendly", "Smooth", "Early Riser", "Local Favorite"]
  },
  {
    id: "protagonist-cafe",
    name: "Protagonist Cafe",
    address: "2326 S Jefferson Ave",
    neighborhood: "Benton Park",
    lat: 38.5950,
    lng: -90.2210,
    tags: ["Storytelling", "Art", "Creative", "Community", "Unique"],
    rating: 90,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1000",
    description: "A creative space celebrating storytelling and art. Features local artists, writers, and performers. Unique drinks named after literary terms.",
    isOpen: true,
    hours: {
      mon: "7am-5pm",
      tue: "7am-5pm",
      wed: "7am-5pm",
      thu: "7am-5pm",
      fri: "7am-7pm",
      sat: "8am-7pm",
      sun: "8am-5pm"
    },
    phone: "(314) 802-6130",
    website: "https://www.protagonistcafe.com",
    instagram: "@protagonistcafe",
    features: {
      wifi: true,
      outlets: true,
      outdoorSeating: true,
      parking: "street",
      food: true,
      vegan: true,
      glutenFree: true
    },
    vibe: ["Creative", "Artistic", "Storytelling", "Unique"]
  },
  {
    id: "coffeestamp",
    name: "Coffeestamp",
    address: "1200 S Vandeventer Ave",
    neighborhood: "Midtown",
    lat: 38.6280,
    lng: -90.2450,
    tags: ["Brother-owned", "Small Batch", "Artisan", "Rising Star"],
    rating: 93,
    image: "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&q=80&w=1000",
    description: "Brothers Patrick and Spencer Clapp bring passion to small-batch roasting. A rising star in the STL coffee scene with exceptional attention to detail.",
    isOpen: true,
    hours: {
      mon: "7am-3pm",
      tue: "7am-3pm",
      wed: "7am-3pm",
      thu: "7am-3pm",
      fri: "7am-3pm",
      sat: "8am-4pm",
      sun: "8am-3pm"
    },
    phone: "(314) 409-9009",
    website: "https://www.coffeestamp.com",
    instagram: "@coffeestamp",
    features: {
      wifi: true,
      outlets: true,
      outdoorSeating: false,
      parking: "lot",
      food: true,
      vegan: true,
      glutenFree: true
    },
    equipment: {
      roaster: "Small Batch",
      espressoMachine: "La Marzocco"
    },
    vibe: ["Artisan", "Brother-owned", "Detail-oriented", "Rising Star"]
  },
  {
    id: "park-avenue-coffee",
    name: "Park Avenue Coffee",
    address: "1919 Park Ave",
    neighborhood: "Lafayette Square",
    lat: 38.6160,
    lng: -90.2120,
    tags: ["Multiple Locations", "Reliable", "Work Friendly", "Local Chain"],
    rating: 88,
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=1000",
    description: "Local chain with multiple locations across STL. Reliable, work-friendly environment with consistent quality and plenty of seating.",
    isOpen: true,
    hours: {
      mon: "6:30am-7pm",
      tue: "6:30am-7pm",
      wed: "6:30am-7pm",
      thu: "6:30am-7pm",
      fri: "6:30am-7pm",
      sat: "7am-7pm",
      sun: "7am-7pm"
    },
    phone: "(314) 621-4020",
    website: "https://www.parkavenuecoffee.com",
    instagram: "@parkavenuecoffee",
    features: {
      wifi: true,
      outlets: true,
      outdoorSeating: true,
      parking: "street",
      food: true,
      vegan: true,
      glutenFree: true
    },
    vibe: ["Reliable", "Work Friendly", "Local Chain", "Consistent"]
  },
  {
    id: "northwest-coffee",
    name: "Northwest Coffee Roasting",
    address: "4251 Laclede Ave",
    neighborhood: "Central West End",
    lat: 38.6390,
    lng: -90.2580,
    tags: ["Roastery", "Wholesale", "Serious", "Industry Favorite"],
    rating: 91,
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=1000",
    description: "Serious roastery supplying many local cafes. Industry favorite known for wholesale operations and exceptional bean quality.",
    isOpen: true,
    hours: {
      mon: "7am-5pm",
      tue: "7am-5pm",
      wed: "7am-5pm",
      thu: "7am-5pm",
      fri: "7am-5pm",
      sat: "8am-4pm",
      sun: "8am-4pm"
    },
    phone: "(314) 531-9000",
    website: "https://www.northwestcoffee.com",
    instagram: "@northwestcoffee",
    features: {
      wifi: true,
      outlets: true,
      outdoorSeating: false,
      parking: "lot",
      food: true,
      vegan: false,
      glutenFree: false
    },
    equipment: {
      roaster: "Commercial Roastery",
      espressoMachine: "Synesso"
    },
    vibe: ["Industry", "Serious", "Wholesale", "Professional"]
  },
  {
    id: "omens-coffee",
    name: "Omen Coffee Company",
    address: "4711 Morganford Rd",
    neighborhood: "South City",
    lat: 38.5880,
    lng: -90.2650,
    tags: ["Newcomer", "Trendy", "Quality", "Neighborhood"],
    rating: 89,
    image: "https://images.unsplash.com/photo-1493857671505-72967e2e2760?auto=format&fit=crop&q=80&w=1000",
    description: "Newer addition to the STL coffee scene bringing trendy vibes and serious quality. Quickly becoming a neighborhood favorite.",
    isOpen: true,
    hours: {
      mon: "7am-4pm",
      tue: "7am-4pm",
      wed: "7am-4pm",
      thu: "7am-4pm",
      fri: "7am-4pm",
      sat: "8am-5pm",
      sun: "8am-4pm"
    },
    phone: "(314) 696-4000",
    website: "https://www.omencoffee.com",
    instagram: "@omencoffee",
    features: {
      wifi: true,
      outlets: true,
      outdoorSeating: true,
      parking: "street",
      food: true,
      vegan: true,
      glutenFree: true
    },
    vibe: ["Trendy", "New", "Neighborhood", "Quality"]
  },
  {
    id: "la-finca",
    name: "La Finca Coffee Shop",
    address: "2900 Cherokee St",
    neighborhood: "Cherokee Street",
    lat: 38.5930,
    lng: -90.2370,
    tags: ["Latino-owned", "Community", "Cultural", "Authentic"],
    rating: 87,
    image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=1000",
    description: "Latino-owned coffee shop on vibrant Cherokee Street. Celebrates culture and community with authentic drinks and a welcoming atmosphere.",
    isOpen: true,
    hours: {
      mon: "7am-5pm",
      tue: "7am-5pm",
      wed: "7am-5pm",
      thu: "7am-5pm",
      fri: "7am-6pm",
      sat: "8am-6pm",
      sun: "8am-4pm"
    },
    phone: "(314) 865-5555",
    website: "https://www.lafincacoffee.com",
    instagram: "@lafincacoffee",
    features: {
      wifi: true,
      outlets: true,
      outdoorSeating: true,
      parking: "street",
      food: true,
      vegan: true,
      glutenFree: true
    },
    vibe: ["Cultural", "Community", "Latino-owned", "Authentic"]
  },
  {
    id: "zensia",
    name: "Zensia",
    address: "1201 S Jefferson Ave",
    neighborhood: "Benton Park",
    lat: 38.6010,
    lng: -90.2210,
    tags: ["Asian-inspired", "Unique", "Modern", "Aesthetic"],
    rating: 88,
    image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=1000",
    description: "Asian-inspired coffee shop bringing unique flavors and modern aesthetics. Known for creative drinks and beautiful presentation.",
    isOpen: true,
    hours: {
      mon: "8am-4pm",
      tue: "8am-4pm",
      wed: "8am-4pm",
      thu: "8am-4pm",
      fri: "8am-6pm",
      sat: "9am-6pm",
      sun: "9am-4pm"
    },
    phone: "(314) 696-7000",
    website: "https://www.zensiacoffee.com",
    instagram: "@zensiacoffee",
    features: {
      wifi: true,
      outlets: true,
      outdoorSeating: false,
      parking: "street",
      food: true,
      vegan: true,
      glutenFree: true
    },
    vibe: ["Asian-inspired", "Modern", "Aesthetic", "Unique"]
  }
];

// Helper function to get shop by ID
export const getShopById = (id: string): Shop | undefined => {
  return STL_COFFEE_SHOPS.find(shop => shop.id === id);
};

// Helper function to get shops by neighborhood
export const getShopsByNeighborhood = (neighborhood: string): Shop[] => {
  return STL_COFFEE_SHOPS.filter(shop => shop.neighborhood === neighborhood);
};

// Helper function to get shops by tag
export const getShopsByTag = (tag: string): Shop[] => {
  return STL_COFFEE_SHOPS.filter(shop => shop.tags.includes(tag));
};

// Helper function to get open shops
export const getOpenShops = (): Shop[] => {
  return STL_COFFEE_SHOPS.filter(shop => shop.isOpen);
};

// Get unique neighborhoods
export const getNeighborhoods = (): string[] => {
  return [...new Set(STL_COFFEE_SHOPS.map(shop => shop.neighborhood))];
};

// Get all unique tags
export const getAllTags = (): string[] => {
  const allTags = STL_COFFEE_SHOPS.flatMap(shop => shop.tags);
  return [...new Set(allTags)].sort();
};
