import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import LocationHeader from '../../components/home/LocationHeader';
import CardBanner from '../../components/home/CardBanner';
import { COLORS } from '../../constants/theme';
import SearchFilter from '../../components/home/SearchFilter';
import CardProduk from '../../components/home/CardProduk';
import { supabase } from '../../lib/supabase';
import { FoodItem } from '@/types/database';


export default function Home() {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <LocationHeader />
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <CardBanner />
        <SearchFilter />
        
        {/* Tampilkan daftar makanan */}
        <View style={styles.foodGrid}>
          {loading ? (
            <Text>Loading...</Text>
          ) : foodItems.length > 0 ? (
            foodItems.map((item) => (
              <CardProduk
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.price}
                imageUrl={item.image_url}
                category={item.category}
                deliveryTime={item.delivery_time}
                onPress={() => console.log('Item pressed:', item.id)}
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
    marginTop: 20,
  },
});
