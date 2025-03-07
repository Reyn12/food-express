import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions, StatusBar, RefreshControl } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../../constants/theme';
import { supabase } from '../../lib/supabase';
import { FoodItem } from '@/types/database';

const { width } = Dimensions.get('window');

// Data kategori
const categories = [
  {
    id: '1',
    name: 'Semua',
    icon: 'grid-outline',
  },
  {
    id: '2',
    name: 'Burger',
    icon: 'fast-food-outline',
  },
  {
    id: '3',
    name: 'Pizza',
    icon: 'pizza-outline',
  },
  {
    id: '4',
    name: 'Minuman',
    icon: 'cafe-outline',
  },
  {
    id: '5',
    name: 'Dessert',
    icon: 'ice-cream-outline',
  },
  {
    id: '6',
    name: 'Seafood',
    icon: 'fish-outline',
  },
];

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('1');
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<FoodItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Fungsi untuk mengambil data dari Supabase
  const fetchFoodItems = async () => {
    try {
      const { data, error } = await supabase
        .from('food_items')
        .select('*')
        .eq('is_available', true);

      if (error) {
        console.error('Error fetching food items:', error);
        return;
      }

      if (data) {
        setFoodItems(data);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fungsi untuk refresh data
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setIsLoading(true);
    
    fetchFoodItems();
    
    setTimeout(() => {
      setRefreshing(false);
      setIsLoading(false);
    }, 2000);
  }, []);

  // Mengambil data saat komponen dimount
  useEffect(() => {
    fetchFoodItems();
  }, []);

  // Filter data berdasarkan kategori
  useEffect(() => {
    if (foodItems.length > 0) {
      if (activeCategory === '1') {
        setFilteredItems(foodItems);
      } else {
        const categoryName = categories.find(cat => cat.id === activeCategory)?.name || '';
        const filtered = foodItems.filter(item => item.category === categoryName);
        setFilteredItems(filtered);
      }
    }
  }, [foodItems, activeCategory]);

  // Render item menu
  const renderMenuItem = (item: FoodItem) => {
    return (
      <TouchableOpacity key={item.id} style={styles.menuItem}>
        <View style={styles.menuImageContainer}>
          <Image 
            source={{ uri: `https://ik.imagekit.io/reyy112/food-express/${item.image_url}` }} 
            style={styles.menuImage}
            resizeMode="cover"
          />
          {item.delivery_time && (
            <View style={styles.deliveryTimeContainer}>
              <Ionicons name="time-outline" size={12} color={COLORS.white} />
              <Text style={styles.deliveryTimeText}>{item.delivery_time} min</Text>
            </View>
          )}
        </View>
        
        <View style={styles.menuInfo}>
          <Text style={styles.menuName} numberOfLines={1}>{item.name}</Text>
          <Text style={styles.menuCategory}>{item.category}</Text>
          <View style={styles.menuPriceRow}>
            <Text style={styles.menuPrice}>Rp {item.price.toLocaleString()}</Text>
            <TouchableOpacity style={styles.addButton}>
              <Ionicons name="add" size={18} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // Render loading skeleton
  const renderSkeletonLoading = () => {
    return Array(4).fill(0).map((_, index) => (
      <View key={`skeleton-${index}`} style={styles.menuItem}>
        <View style={[styles.menuImageContainer, styles.skeletonImage]} />
        <View style={styles.menuInfo}>
          <View style={[styles.skeletonText, { width: '80%', height: 16 }]} />
          <View style={[styles.skeletonText, { width: '50%', height: 12, marginTop: 8 }]} />
          <View style={[styles.skeletonText, { width: '70%', height: 14, marginTop: 12 }]} />
        </View>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Menu Kami</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search-outline" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      
      {/* Kategori */}
      <View style={styles.categorySection}>
        <Text style={styles.sectionTitle}>Kategori</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                activeCategory === category.id && styles.activeCategoryButton
              ]}
              onPress={() => setActiveCategory(category.id)}
            >
              <View style={[
                styles.categoryIconContainer,
                activeCategory === category.id && styles.activeCategoryIconContainer
              ]}>
                <Ionicons 
                  name={category.icon as any} 
                  size={20} 
                  color={activeCategory === category.id ? COLORS.white : COLORS.primary} 
                />
              </View>
              <Text 
                style={[
                  styles.categoryText,
                  activeCategory === category.id && styles.activeCategoryText
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      {/* Daftar Menu */}
      <View style={styles.menuSection}>
        <View style={styles.menuHeader}>
          <Text style={styles.sectionTitle}>Daftar Menu</Text>
          <TouchableOpacity style={styles.sortButton}>
            <Ionicons name="options-outline" size={18} color={COLORS.primary} />
            <Text style={styles.sortText}>Urutkan</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.menuList}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {isLoading ? (
            renderSkeletonLoading()
          ) : filteredItems.length > 0 ? (
            filteredItems.map(item => renderMenuItem(item))
          ) : (
            <View style={styles.emptyContainer}>
              <Ionicons name="fast-food-outline" size={60} color={COLORS.secondary} />
              <Text style={styles.emptyText}>Tidak ada menu tersedia</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: COLORS.white,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categorySection: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 12,
  },
  categoriesContainer: {
    paddingBottom: 10,
  },
  categoryButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
    width: 80,
    height: 90,
    borderRadius: 15,
    backgroundColor: '#F5F5F5',
    padding: 10,
  },
  activeCategoryButton: {
    backgroundColor: COLORS.primary,
  },
  categoryIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  activeCategoryIconContainer: {
    backgroundColor: COLORS.accent,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.primary,
    textAlign: 'center',
  },
  activeCategoryText: {
    color: COLORS.white,
  },
  menuSection: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  sortText: {
    fontSize: 14,
    color: COLORS.primary,
    marginLeft: 5,
  },
  menuList: {
    paddingBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  menuImageContainer: {
    width: 100,
    height: 100,
    position: 'relative',
  },
  menuImage: {
    width: '100%',
    height: '100%',
  },
  deliveryTimeContainer: {
    position: 'absolute',
    bottom: 5,
    left: 5,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  deliveryTimeText: {
    color: COLORS.white,
    fontSize: 10,
    marginLeft: 3,
    fontWeight: '500',
  },
  menuInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  menuName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primary,
  },
  menuCategory: {
    fontSize: 12,
    color: COLORS.text.secondary,
    marginTop: 4,
  },
  menuPriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  menuPrice: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.primary,
  },
  addButton: {
    backgroundColor: COLORS.accent,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.text.secondary,
    marginTop: 10,
  },
  // Skeleton loading styles
  skeletonImage: {
    backgroundColor: '#E0E0E0',
  },
  skeletonText: {
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
  },
});
