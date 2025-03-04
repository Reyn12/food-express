import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../../constants/theme';

// Interface untuk kategori
interface Category {
  id: string;
  name: string;
  icon: any; // Untuk menyimpan komponen icon
  active: boolean;
}

interface SearchFilterProps {
  onCategoryChange: (categories: string[]) => void;
  onSearchChange: (query: string) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ onCategoryChange, onSearchChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<Category[]>([
    { 
      id: '1', 
      name: 'Semua', 
      icon: <Ionicons name="grid-outline" size={20} color={COLORS.white} />, 
      active: true 
    },
    { 
      id: '2', 
      name: 'Burger', 
      icon: <Ionicons name="fast-food-outline" size={20} color={COLORS.white} />, 
      active: false 
    },
    { 
      id: '3', 
      name: 'Pizza', 
      icon: <Ionicons name="pizza-outline" size={20} color={COLORS.white} />, 
      active: false 
    },
    { 
      id: '4', 
      name: 'Minuman', 
      icon: <Ionicons name="cafe-outline" size={20} color={COLORS.white} />, 
      active: false 
    },
    { 
      id: '5', 
      name: 'Dessert', 
      icon: <Ionicons name="ice-cream-outline" size={20} color={COLORS.white} />, 
      active: false 
    },
    { 
      id: '6', 
      name: 'Seafood', 
      icon: <Ionicons name="fish-outline" size={20} color={COLORS.white} />, 
      active: false 
    },
  ]);

  // Kirim perubahan ke parent
  useEffect(() => {
    const activeCategories = categories
      .filter(cat => cat.active)
      .map(cat => cat.name);
    onCategoryChange(activeCategories);
  }, [categories, onCategoryChange]);

  // Kirim perubahan search
  useEffect(() => {
    onSearchChange(searchQuery);
  }, [searchQuery, onSearchChange]);

  // Fungsi untuk mengubah kategori aktif
  const toggleCategory = (id: string) => {
    const updatedCategories = categories.map(category => ({
      ...category,
      active: category.id === id
    }));
    setCategories(updatedCategories);
  };

  return (
    <View style={styles.container}>
      {/* Search Input */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color={COLORS.text.secondary} />
        <TextInput
          style={styles.searchInput}
          placeholder="Cari makanan atau restoran..."
          placeholderTextColor={COLORS.text.secondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color={COLORS.text.secondary} />
          </TouchableOpacity>
        )}
      </View>

      {/* Filter Categories */}
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
              { backgroundColor: category.active ? COLORS.primary : COLORS.white }
            ]}
            onPress={() => toggleCategory(category.id)}
          >
            <View style={[
              styles.iconContainer,
              { backgroundColor: category.active ? COLORS.accent : COLORS.secondary }
            ]}>
              {category.icon}
            </View>
            <Text
              style={[
                styles.categoryText,
                { color: category.active ? COLORS.white : COLORS.primary }
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: SIZES.radius.md,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: COLORS.primary,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  categoriesContainer: {
    paddingVertical: 10,
    paddingRight: 20,
  },
  categoryButton: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 30,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    width: 85,
    height: 100,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
  },
});

export default SearchFilter;