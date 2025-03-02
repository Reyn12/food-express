import { View, Text, StyleSheet, ScrollView } from 'react-native';
import LocationHeader from '../../components/home/LocationHeader';
import CardBanner from '../../components/home/CardBanner';
import { COLORS } from '../../constants/theme';

export default function Home() {
  return (
    <View style={styles.container}>
      <LocationHeader />
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <CardBanner />
        
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
