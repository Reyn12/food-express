import { View, Text, StyleSheet, ScrollView, RefreshControl   } from 'react-native';
import { useEffect, useState } from 'react';
import LocationHeader from '../../components/home/LocationHeader';
import CardBanner from '../../components/home/CardBanner';
import { COLORS } from '../../constants/theme';
import SearchFilter from '../../components/home/SearchFilter';
import CardProduk from '../../components/home/CardProduk';
import { supabase } from '../../lib/supabase';
import { FoodItem } from '@/types/database';
import { Dimensions } from 'react-native';
import React from 'react';

const { width } = Dimensions.get('window');

export default function Home() {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<FoodItem[]>([]);
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setIsLoading(true); // Tambahkan ini untuk menampilkan loading
     
    // Panggil fungsi fetchFoodItems dan tunggu sampai selesai
    fetchFoodItems();
    
    // Set timeout untuk simulasi loading dan matikan refreshing
    setTimeout(() => {
      setRefreshing(false);
      setIsLoading(false);
    }, 2000);
  }, []);
  

  // Simulasi loading
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    fetchFoodItems();
  }, []);

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

  // Filter data berdasarkan kategori dan search
  useEffect(() => {
    if (foodItems.length > 0) {
      let result = [...foodItems];

      // Filter berdasarkan kategori jika ada yang aktif
      if (activeCategories.length > 0 && !activeCategories.includes('Semua')) {
        result = result.filter(item =>
          activeCategories.includes(item.category)
        );
      }

      // Filter berdasarkan search query
      if (searchQuery) {
        result = result.filter(item =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      setFilteredItems(result);
    }
  }, [foodItems, activeCategories, searchQuery]);

  return (
    <View style={styles.container}>
      <LocationHeader />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <CardBanner />
        <SearchFilter
          onCategoryChange={setActiveCategories}
          onSearchChange={setSearchQuery}
        />

        {/* Tampilkan daftar makanan */}
        <View style={styles.foodGrid}>
          {isLoading ? (
            // Loading indicator yang lebih menarik
            <>
              {[1, 2, 3, 4].map((item) => (
                <View key={`loading-${item}`} style={styles.loadingCard}>
                  <View style={styles.loadingImage} />
                  <View style={styles.loadingContent}>
                    <View style={styles.loadingTitle} />
                    <View style={styles.loadingCategory} />
                    <View style={styles.loadingPrice} />
                  </View>
                </View>
              ))}
            </>
          ) : filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <CardProduk
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.price}
                imageUrl={item.image_url}
                category={item.category}
                deliveryTime={item.delivery_time}
              />
            ))
          ) : (
            <Text>Tidak ada makanan tersedia</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  foodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 5,
  },

  // Loading card style
  loadingCard: {
    width: width / 2 - 30,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#EEEEEE',
  },
  loadingImage: {
    width: '100%',
    height: 140,
    backgroundColor: '#E0E0E0',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  loadingContent: {
    padding: 12,
  },
  loadingTitle: {
    width: '80%',
    height: 16,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    marginBottom: 8,
  },
  loadingCategory: {
    width: '50%',
    height: 12,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    marginBottom: 12,
  },
  loadingPrice: {
    width: '40%',
    height: 14,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
  },
});
