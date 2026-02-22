import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Heart, ShoppingBag } from 'lucide-react-native';
import { useFavorites } from '@/context/FavoritesContext';
import { ProductCard } from '@/components/ProductCard';
import { SizeSelectionModal } from '@/components/SizeSelectionModal';
import { Product, SizeOption } from '@/types';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'expo-router';

export default function FavoritesScreen() {
    const { favorites } = useFavorites();
    const { addToCart } = useCart();
    const router = useRouter();

    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [showSizeModal, setShowSizeModal] = useState(false);

    const handleProductPress = (product: Product) => {
        setSelectedProduct(product);
        setShowSizeModal(true);
    };

    const handleAddToCart = (size: SizeOption) => {
        if (selectedProduct) {
            addToCart(selectedProduct, size);
            setShowSizeModal(false);
            setSelectedProduct(null);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
            <View className="px-4 pt-6 pb-2">
                <Text className="text-3xl font-extrabold text-slate-900 dark:text-white">Your Favorites</Text>
                <Text className="text-slate-500">Your most loved juice blends</Text>
            </View>

            <ScrollView className="flex-1 px-4 pt-6" showsVerticalScrollIndicator={false}>
                {favorites.length > 0 ? (
                    <View>
                        {favorites.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onPress={handleProductPress}
                            />
                        ))}
                    </View>
                ) : (
                    <View className="items-center mt-20">
                        <View className="bg-primary/10 p-6 rounded-full">
                            <Heart size={64} color="#43f906" fill="#43f906" opacity={0.2} />
                        </View>
                        <Text className="text-2xl font-bold mt-6 text-slate-900 dark:text-white">No favorites yet</Text>
                        <Text className="text-slate-500 text-center mt-2 px-10">
                            Tap the heart icon on any juice to save it here for quick access.
                        </Text>

                        <TouchableOpacity
                            onPress={() => router.push('/(tabs)')}
                            className="mt-10 bg-primary px-8 py-4 rounded-full shadow-lg shadow-primary/20"
                        >
                            <Text className="font-bold text-slate-900 text-lg">Browse Menu</Text>
                        </TouchableOpacity>
                    </View>
                )}

                <View className="h-24" />
            </ScrollView>

            <SizeSelectionModal
                visible={showSizeModal}
                product={selectedProduct}
                onClose={() => setShowSizeModal(false)}
                onSelectSize={handleAddToCart}
            />
        </SafeAreaView>
    );
}
