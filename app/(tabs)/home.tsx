import { View, Text, StyleSheet } from 'react-native';
import LocationHeader from '../../components/home/LocationHeader';

export default function Home() {
  return (
    <View style={styles.container}>
      <LocationHeader />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
