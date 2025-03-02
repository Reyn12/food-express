import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../../constants/theme';
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import mapboxSdk from '@mapbox/mapbox-sdk';
import geocoding from '@mapbox/mapbox-sdk/services/geocoding';
import ENV from '../../env';


const LocationHeader = () => {
  const [address, setAddress] = useState('Loading...');
  
  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = async () => {
    try {
      // Minta izin lokasi
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        setAddress('Izin lokasi ditolak');
        return;
      }
      

      // Dapatkan lokasi user
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      
      // Gunakan Mapbox untuk reverse geocoding
      const mapboxClient = mapboxSdk({ accessToken: ENV.MAPBOX_ACCESS_TOKEN });
      const geocodingClient = geocoding(mapboxClient);
      
      const response = await geocodingClient.reverseGeocode({
        query: [longitude, latitude],
        limit: 1
      }).send();
      
      if (response && response.body.features.length > 0) {
        const place = response.body.features[0];
        // Menggunakan place.text yang berisi nama lokasi utama saja
        setAddress(place.text);
      }
    } catch (error) {
      console.error('Error getting location:', error);
      setAddress('Gagal mendapatkan lokasi');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.locationContainer}>
        <Text style={styles.label}>Delivery Address</Text>
        <TouchableOpacity style={styles.addressRow} onPress={getUserLocation}>
          <Ionicons name="location-outline" size={20} color={COLORS.primary} />
          <Text 
            style={styles.address} 
            numberOfLines={1} 
            ellipsizeMode="middle"
          >
            {address}
          </Text>
          <Ionicons name="chevron-down" size={20} color={COLORS.text.secondary} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.cartButton}>
        <Ionicons name="cart-outline" size={24} color="white" />
        <View style={styles.badge}>
          <Text style={styles.badgeText}>10</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingTop: 60,
  },
  locationContainer: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginBottom: 4,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  address: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primary,
  },
  cartButton: {
    position: 'relative',
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 12,
  },
  badge: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: COLORS.accent,
    borderRadius: 12,
    minWidth: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  badgeText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default LocationHeader;