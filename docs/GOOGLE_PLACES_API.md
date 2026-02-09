# Google Places API Integration Guide

## Setup

### 1. Get API Key
- Go to [Google Cloud Console](https://console.cloud.google.com/)
- Create a new project or select existing
- Enable **Places API (New)**
- Create credentials → API Key
- Restrict key to mobile apps (iOS/Android bundle IDs)

### 2. Environment Variables
Create `.env` file:
```
GOOGLE_PLACES_API_KEY=your_api_key_here
```

### 3. Install Dependencies
```bash
npm install react-native-dotenv
```

## API Endpoints

### Search Nearby Coffee Shops
```typescript
// GET https://places.googleapis.com/v1/places:searchNearby

const searchNearbyCoffeeShops = async (latitude: number, longitude: number, radius: number = 5000) => {
  const response = await fetch('https://places.googleapis.com/v1/places:searchNearby', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': process.env.GOOGLE_PLACES_API_KEY,
      'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.location,places.rating,places.userRatingCount,places.photos,places.currentOpeningHours,places.websiteUri,places.internationalPhoneNumber,places.priceLevel,places.types,places.editorialSummary',
    },
    body: JSON.stringify({
      locationRestriction: {
        circle: {
          center: {
            latitude,
            longitude,
          },
          radius,
        },
      },
      includedTypes: ['cafe', 'coffee_shop'],
      maxResultCount: 20,
    }),
  });

  return response.json();
};
```

### Search Text (City/Neighborhood)
```typescript
// GET https://places.googleapis.com/v1/places:searchText

const searchCoffeeShopsByText = async (query: string) => {
  const response = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': process.env.GOOGLE_PLACES_API_KEY,
      'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.location,places.rating,places.photos',
    },
    body: JSON.stringify({
      textQuery: `${query} coffee shop`,
      includedType: 'cafe',
      maxResultCount: 20,
    }),
  });

  return response.json();
};
```

### Get Place Details
```typescript
// GET https://places.googleapis.com/v1/places/{placeId}

const getPlaceDetails = async (placeId: string) => {
  const response = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
    headers: {
      'X-Goog-Api-Key': process.env.GOOGLE_PLACES_API_KEY,
      'X-Goog-FieldMask': 'id,displayName,formattedAddress,location,rating,userRatingCount,photos,currentOpeningHours,websiteUri,internationalPhoneNumber,priceLevel,types,editorialSummary,reviews',
    },
  });

  return response.json();
};
```

### Get Photo
```typescript
// GET https://places.googleapis.com/v1/{photoName}/media

const getPlacePhoto = (photoName: string, maxWidth: number = 800) => {
  return `https://places.googleapis.com/v1/${photoName}/media?maxWidthPx=${maxWidth}&key=${process.env.GOOGLE_PLACES_API_KEY}`;
};
```

## Rate Limits & Pricing

**Free Tier:**
- 5,000 requests/month for Nearby Search
- 5,000 requests/month for Text Search
- 5,000 requests/month for Place Details

**Paid:**
- $17 per 1,000 requests (Nearby/Text Search)
- $17 per 1,000 requests (Place Details)
- $7 per 1,000 photos

## React Native Hook

```typescript
// hooks/useGooglePlaces.ts
import { useState, useCallback } from 'react';

export const useGooglePlaces = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchNearby = useCallback(async (lat: number, lng: number, radius = 5000) => {
    setLoading(true);
    setError(null);
    
    try {
      // Implementation here
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { searchNearby, loading, error };
};
```

## Caching Strategy

```typescript
// Cache places for 24 hours
const CACHE_DURATION = 24 * 60 * 60 * 1000;

const getCachedOrFetch = async (key: string, fetchFn: () => Promise<any>) => {
  const cached = await AsyncStorage.getItem(key);
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_DURATION) {
      return data;
    }
  }
  
  const data = await fetchFn();
  await AsyncStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
  return data;
};
```
