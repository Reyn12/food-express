import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';

const CardBanner = () => {
  return (
    <View style={styles.container}>
      <View style={styles.cardContent}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Shop Smarter,</Text>
          <Text style={styles.title}>Save More!</Text>
          
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Get 40% Off 🎉</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <Image 
        source={require('../../public/images/orang-banner1.png')}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 160,
    borderRadius: SIZES.radius.lg,
    overflow: 'hidden',
    marginVertical: 15,
    position: 'relative',
  },
  cardContent: {
    backgroundColor: COLORS.accent,
    width: '100%',
    height: '100%',
    borderRadius: SIZES.radius.lg,
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
  },
  textContainer: {
    width: '60%',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
    lineHeight: 30,
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginTop: 12,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: COLORS.white,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 14,
  },
  image: {
    position: 'absolute',
    right: -20,
    bottom: -20,
    width: 220,
    height: 180, // Sengaja dibuat lebih tinggi agar bisa melebihi card
    zIndex: 1,
  },
});

export default CardBanner;