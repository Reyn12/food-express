import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: '#e91e63',
      tabBarInactiveTintColor: 'gray',
      headerShown: false,
      tabBarStyle: {
        paddingTop: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        height: 80,
      },
    }}>
      <Tabs.Screen 
        name="home" 
        options={{
          title: 'Home',
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen 
        name="menu" 
        options={{
          title: 'Menu',
          tabBarLabel: 'Menu',
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name={focused ? 'restaurant' : 'restaurant-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen 
        name="cart" 
        options={{
          title: '',
          tabBarLabel: '',
          tabBarIcon: () => (
            <View style={styles.cartButtonContainer}>
              <View style={styles.cartButton}>
                <Ionicons name="cart-outline" size={28} color="#fff" />
              </View>
            </View>
          ),
        }}
      />
      <Tabs.Screen 
        name="pesanan" 
        options={{
          title: 'Pesanan',
          tabBarLabel: 'Pesanan',
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name={focused ? 'receipt' : 'receipt-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen 
        name="profile" 
        options={{
          title: 'Profile',
          tabBarLabel: 'Profile',
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name={focused ? 'person' : 'person-outline'} size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  cartButtonContainer: {
    position: 'absolute',
    bottom: 0,
    height: 80,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartButton: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: '#e91e63',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});