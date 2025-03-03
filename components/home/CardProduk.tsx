import React, { useState } from 'react';
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
  deliveryTime?: number;
  discount?: number;
  onPress?: () => void;
}

const CardProduk: React.FC<CardProdukProps> = ({
  id,
  name,
  price,
  imageUrl,
  category,
  deliveryTime,
  discount,
  onPress
}) => {
  // Base URL untuk ImageKit
  const imageBaseUrl = 'https://ik.imagekit.io/reyy112/food-express/';
  const [isFavorite, setIsFavorite] = useState(false);
  
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {/* Gambar Produk */}
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: imageBaseUrl + imageUrl }} 
          style={styles.image}
          resizeMode="cover"
        />
        
        {/* Favorite Button */}
        <TouchableOpacity 
          style={styles.favoriteButton} 
          onPress={() => setIsFavorite(!isFavorite)}
        >
          <Ionicons 
            name={isFavorite ? "heart" : "heart-outline"} 
            size={22} 
            color={isFavorite ? "#FF3B30" : COLORS.white} 
          />
        </TouchableOpacity>
        
        {/* Discount Label */}
        {discount && (
          <View style={styles.discountContainer}>
            <Text style={styles.discountText}>{discount}%</Text>
          </View>
        )}
        
        {deliveryTime && (
          <View style={styles.timeContainer}>
            <Ionicons name="time-outline" size={12} color={COLORS.white} />
            <Text style={styles.timeText}>{deliveryTime} min</Text>
          </View>
        )}
      </View>
      
      {/* Info Produk */}
      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={1}>{name}</Text>
        
        <View style={styles.categoryContainer}>
          <Text style={styles.category}>{category}</Text>
        </View>
        
        <View style={styles.bottomRow}>
          <Text style={styles.price}>Rp {price.toLocaleString()}</Text>
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
    borderWidth: 2
    ,
    borderColor: '#EEEEEE',
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
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  discountContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: COLORS.accent,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  discountText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: 'bold',
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
    fontSize: 16,
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
  addButton: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    backgroundColor: COLORS.accent,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CardProduk;