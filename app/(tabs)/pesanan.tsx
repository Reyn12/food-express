import { View, Text, StyleSheet } from 'react-native';

export default function Pesanan() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pesanan</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
