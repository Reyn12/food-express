import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../../constants/theme';

// Ambil width screen
const { width } = Dimensions.get('window');

// Interface untuk props
interface CardProdukProps {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  deliveryTime: number;
  location: string;
  onPress?: () => void;
}

const CardProduk: React.FC<CardProdukProps> = ({
  id,
  name,
  price,
  imageUrl,
  category,
  deliveryTime,
  location,
  onPress
}) => {
  // Base URL untuk ImageKit
  const imageBaseUrl = 'https://ik.imagekit.io/reyy112/food-express/';
  
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {/* Gambar Produk */}
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: imageBaseUrl + imageUrl }} 
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.timeContainer}>
          <Ionicons name="time-outline" size={12} color={COLORS.white} />
          <Text style={styles.timeText}>{deliveryTime} min</Text>
        </View>
      </View>
      
      {/* Info Produk */}
      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={1}>{name}</Text>
        
        <View style={styles.categoryContainer}>
          <Text style={styles.category}>{category}</Text>
        </View>
        
        <View style={styles.bottomRow}>
          <Text style={styles.price}>Rp {price.toLocaleString()}</Text>
          
          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={12} color={COLORS.text.secondary} />
            <Text style={styles.location} numberOfLines={1}>{location}</Text>
          </View>
        </View>
      </View>
      
      {/* Tombol Add */}
      <TouchableOpacity style={styles.addButton}>
        <Ionicons name="add" size={20} color={COLORS.white} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: width / 2 - 30,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    position: 'relative',
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: 140,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  timeContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    color: COLORS.white,
    fontSize: 10,
    marginLeft: 3,
    fontWeight: '500',
  },
  infoContainer: {
    padding: 12,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 5,
  },
  categoryContainer: {
    marginBottom: 8,
  },
  category: {
    fontSize: 12,
    color: COLORS.text.secondary,
    opacity: 0.8,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: 10,
    color: COLORS.text.secondary,
    marginLeft: 2,
    maxWidth: 60,
  },
  addButton: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    backgroundColor: COLORS.primary,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CardProduk;