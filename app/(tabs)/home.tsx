import { View, Text, StyleSheet, ScrollView } from 'react-native';
import LocationHeader from '../../components/home/LocationHeader';
import CardBanner from '../../components/home/CardBanner';
import { COLORS } from '../../constants/theme';
import SearchFilter from '../../components/home/SearchFilter';

export default function Home() {
  return (
    <View style={styles.container}>
      <LocationHeader />
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <CardBanner />
        <SearchFilter />
        {/* Komponen lainnya bisa ditambahkan di sini */}
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
});
