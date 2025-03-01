import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../../constants/theme';

const LocationHeader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.locationContainer}>
        <Text style={styles.label}>Delivery Address</Text>
        <View style={styles.addressRow}>
          <Ionicons name="location-outline" size={20} color={COLORS.primary} />
          <Text style={styles.address}>Dhaka, Bangladesh</Text>
          <Ionicons name="chevron-down" size={20} color={COLORS.text.secondary} />
        </View>
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
    gap: 8,
  },
  address: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primary,
    marginRight: 4,
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