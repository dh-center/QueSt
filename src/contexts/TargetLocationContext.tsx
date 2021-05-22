import React, { ReactElement, PropsWithChildren, useState, createContext, useContext, useEffect } from 'react';
import Geolocation from 'react-native-geolocation-service';
import haversine from 'haversine';

/**
 * Coordinates of location
 */
interface LocationCoords {
  latitude: number
  longitude: number
}

/**
 * Props of TargetLocationContext
 */
interface TargetLocationContextValue {
  isUserNearLocation: boolean
  targetLocation: LocationCoords | undefined
  setTargetLocation(ref: LocationCoords): void
}

const TargetLocationContext = createContext<TargetLocationContextValue | undefined>(undefined);

/**
 * Considers whether the user is within the radius of the target location
 *
 * @param start - first location
 * @param end - second location
 */
function isUserInRadius(start: LocationCoords, end: LocationCoords): boolean {
  return haversine(start, end, { threshold: 15,
    unit: 'meter' });
}

/**
 * Provider for TargetLocationContext
 *
 * @param props - children
 */
export function TargetLocationProvider(props: PropsWithChildren<unknown>): ReactElement {
  const [isUserNear, setIsUserNear] = useState(false);
  const [location, setLocation] = useState<LocationCoords>();

  useEffect(() => {
    if (location) {
      const watchId = Geolocation.watchPosition(
        (position) => {
          setIsUserNear(false);

          const userPos = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };

          if (isUserInRadius(userPos, location)) {
            Geolocation.clearWatch(watchId);
            setIsUserNear(true);
          }
        },
        (error) => {
          console.log('error', error.code, error.message);
        },
        { enableHighAccuracy: true,
          distanceFilter: 0,
          interval: 5000 }
      );
    }
  }, [ location ]);

  return (
    <TargetLocationContext.Provider
      value={{
        isUserNearLocation: isUserNear,
        targetLocation: location,
        setTargetLocation: setLocation,
      }}
    >
      {props.children}
    </TargetLocationContext.Provider>
  );
}

/**
 * Helper hook for accessing data in TargetLocationContext
 */
export default function useTargetLocationContext(): TargetLocationContextValue {
  const context = useContext(TargetLocationContext);

  if (!context) {
    throw new Error('You should use this hook only inside CurrentMapContentProvider');
  }

  return context;
}
