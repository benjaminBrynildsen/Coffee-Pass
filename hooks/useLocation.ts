import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

interface LocationState {
  location: Location.LocationObject | null;
  errorMsg: string | null;
  loading: boolean;
  permissionGranted: boolean;
}

export function useLocation() {
  const [state, setState] = useState<LocationState>({
    location: null,
    errorMsg: null,
    loading: true,
    permissionGranted: false,
  });

  useEffect(() => {
    let subscription: Location.LocationSubscription | null = null;

    async function getLocation() {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        
        if (status !== 'granted') {
          setState({
            location: null,
            errorMsg: 'Permission to access location was denied',
            loading: false,
            permissionGranted: false,
          });
          return;
        }

        setState(prev => ({ ...prev, permissionGranted: true }));

        // Get initial location
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

        setState(prev => ({
          ...prev,
          location,
          loading: false,
        }));

        // Subscribe to location updates
        subscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.Balanced,
            distanceInterval: 100, // Update every 100 meters
          },
          (newLocation) => {
            setState(prev => ({
              ...prev,
              location: newLocation,
            }));
          }
        );
      } catch (error) {
        setState({
          location: null,
          errorMsg: 'Error getting location',
          loading: false,
          permissionGranted: false,
        });
      }
    }

    getLocation();

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  const refreshLocation = async () => {
    setState(prev => ({ ...prev, loading: true }));
    try {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      setState(prev => ({
        ...prev,
        location,
        loading: false,
        errorMsg: null,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        errorMsg: 'Error refreshing location',
      }));
    }
  };

  return {
    ...state,
    refreshLocation,
    latitude: state.location?.coords.latitude,
    longitude: state.location?.coords.longitude,
  };
}
