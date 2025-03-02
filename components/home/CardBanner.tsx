import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ImageSourcePropType } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';
import Carousel from 'react-native-reanimated-carousel';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;

// Interface untuk tipe data item carousel
interface CarouselItem {
    id: string;
    title: string;
    buttonText: string;
    image: ImageSourcePropType;
    color: string;
}

// Data untuk carousel
const carouselData: CarouselItem[] = [
    {
        id: '1',
        title: 'Shop Smarter,\nSave More!',
        buttonText: 'Get 40% Off ',
        image: require('../../public/images/orang-banner1.png'),
        color: COLORS.accent,
    },
    {
        id: '2',
        title: 'Quick Order\nFavorites',
        buttonText: 'Order Now ',
        image: require('../../public/images/orang-banner1.png'), // Gunakan gambar yang sama untuk sementara
        color: '#4CAF50', // Warna hijau
    },
    {
        id: '3',
        title: 'Join\nMembership',
        buttonText: 'Get Benefits ',
        image: require('../../public/images/orang-banner1.png'), // Gunakan gambar yang sama untuk sementara
        color: '#5C6BC0', // Warna biru
    },
];

const BannerCard: React.FC<{ item: CarouselItem }> = ({ item }) => {
    return (
        <View style={[styles.container, { width: CARD_WIDTH }]}>
            <View style={[styles.cardContent, { backgroundColor: item.color }]}>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{item.title}</Text>

                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>{item.buttonText}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Image
                source={item.image}
                style={styles.image}
                resizeMode="contain"
            />
        </View>
    );
};

const CardBanner: React.FC = () => {
    return (
        <View style={styles.carouselContainer}>

            <Carousel
                loop
                width={CARD_WIDTH}
                height={160}
                autoPlay={true}
                data={carouselData}
                scrollAnimationDuration={1000}
                autoPlayInterval={5000}
                mode="parallax"
                modeConfig={{
                    parallaxScrollingScale: 0.9,
                    parallaxScrollingOffset: 50,
                }}
                style={{ width: width }}
                renderItem={({ item }) => <BannerCard item={item} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    carouselContainer: {
        paddingVertical: 15,
        width: width,
        alignItems: 'center',
        position: 'relative', // Penting untuk positioning gradient
    },
    container: {
        height: 160,
        borderRadius: SIZES.radius.lg,
        overflow: 'hidden',
        position: 'relative',
    },
    cardContent: {
        width: '100%',
        height: '100%',
        borderRadius: SIZES.radius.lg,
        paddingHorizontal: 20,
        marginHorizontal: 10,
        paddingVertical: 15,
        flexDirection: 'row',
    },
    textContainer: {
        width: '60%',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.white,
        lineHeight: 30,
    },
    button: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        marginTop: 12,
        alignSelf: 'flex-start',
        borderWidth: 1,
        borderColor: COLORS.white,
    },
    buttonText: {
        color: COLORS.white,
        fontWeight: '600',
        fontSize: 14,
    },
    image: {
        position: 'absolute',
        right: -20,
        bottom: -20,
        width: 220,
        height: 180, // Sengaja dibuat lebih tinggi agar bisa melebihi card
        zIndex: 1,
    },
});

export default CardBanner;