import { router, Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useRef } from 'react';

// Type untuk props AnimatedTabIcon
interface AnimatedTabIconProps {
  focused: boolean;
  color: string;
  iconName: keyof typeof Ionicons.glyphMap;
  size?: number;
  onPress?: () => void;
}

// Komponen AnimatedTabIcon untuk handle animasi di setiap tab
const AnimatedTabIcon = ({ focused, color, iconName, size = 24, onPress }: AnimatedTabIconProps) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.8,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
    if (onPress) {
      onPress();
    }
  };

  // Tentukan nama icon yang tepat berdasarkan status focused
  const getIconName = () => {
    switch (iconName) {
      case 'home':
        return focused ? 'home' : 'home-outline';
      case 'restaurant':
        return focused ? 'restaurant' : 'restaurant-outline';
      case 'receipt':
        return focused ? 'receipt' : 'receipt-outline';
      case 'person':
        return focused ? 'person' : 'person-outline';
      default:
        return iconName;
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <Ionicons 
          name={getIconName()}
          size={size}
          color={color}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

export default function TabLayout() {
  const cartScaleAnim = useRef(new Animated.Value(1)).current;
  
  const onCartPressIn = () => {
    Animated.spring(cartScaleAnim, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };
  
  const onCartPressOut = () => {
    Animated.spring(cartScaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

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
        height: 90,
      },
    }}>
      <Tabs.Screen 
        name="home" 
        options={{
          title: 'Home',
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused, color }) => (
            <AnimatedTabIcon 
              focused={focused}
              color={color}
              iconName="home"
              onPress={() => router.push('/home')}
            />
          ),
        }}
      />
      <Tabs.Screen 
        name="menu" 
        options={{
          title: 'Menu',
          tabBarLabel: 'Menu',
          tabBarIcon: ({ focused, color }) => (
            <AnimatedTabIcon 
              focused={focused}
              color={color}
              iconName="restaurant"
              onPress={() => router.push('/menu')}
            />
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
              <TouchableOpacity
                activeOpacity={1}
                onPressIn={onCartPressIn}
                onPressOut={onCartPressOut}
                onPress={() => router.push('/cart')}
              >
                <Animated.View 
                  style={[
                    styles.cartButton,
                    { transform: [{ scale: cartScaleAnim }] }
                  ]}
                >
                  <Ionicons name="cart-outline" size={28} color="#fff" />
                </Animated.View>
              </TouchableOpacity>
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
            <AnimatedTabIcon 
              focused={focused}
              color={color}
              iconName="receipt"
              onPress={() => router.push('/pesanan')}
            />
          ),
        }}
      />
      <Tabs.Screen 
        name="profile" 
        options={{
          title: 'Profile',
          tabBarLabel: 'Profile',
          tabBarIcon: ({ focused, color }) => (
            <AnimatedTabIcon 
              focused={focused}
              color={color}
              iconName="person"
              onPress={() => router.push('/profile')}
            />
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