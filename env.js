import Constants from 'expo-constants';

const ENV = {
  MAPBOX_ACCESS_TOKEN: process.env.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN || Constants.expoConfig?.extra?.mapboxAccessToken
};

export default ENV;