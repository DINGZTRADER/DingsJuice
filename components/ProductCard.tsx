import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { Product } from '@/types';
import { Plus, Heart } from 'lucide-react-native';
import { useFavorites } from '@/context/FavoritesContext';

interface ProductCardProps {
    product: Product;
    onPress: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
    const { toggleFavorite, isFavorite } = useFavorites();
    const isFav = isFavorite(product.id);

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => onPress(product)}
            className="mb-6 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-lg border border-primary/10"
        >
            <ImageBackground
                source={{ uri: product.image }}
                className="h-48 w-full justify-end"
            >
                <View className="absolute inset-0 bg-black/40" />

                <TouchableOpacity
                    onPress={() => toggleFavorite(product)}
                    className="absolute top-3 right-3 p-2 bg-white/20 rounded-full"
                >
                    <Heart size={20} color={isFav ? "#43f906" : "#ffffff"} fill={isFav ? "#43f906" : "transparent"} />
                </TouchableOpacity>

                {product.label && (
                    <View className={`absolute top-3 left-3 px-2 py-1 rounded-full ${product.labelColor || 'bg-primary'}`}>
                        <Text className="text-[10px] font-bold text-white uppercase">{product.label}</Text>
                    </View>
                )}
            </ImageBackground>

            <View className="p-4">
                <View className="flex-row justify-between items-start">
                    <View className="flex-1 mr-2">
                        <Text className="text-lg font-bold text-slate-900 dark:text-white">{product.name}</Text>
                        <Text className="text-xs text-slate-500 dark:text-slate-400 mt-1" numberOfLines={2}>
                            {product.description}
                        </Text>
                    </View>
                    <View className="items-end">
                        <Text className="text-sm font-bold text-primary">Cup: UGX {product.prices.cup.toLocaleString()}</Text>
                        <Text className="text-xs font-semibold text-slate-500 dark:text-slate-400">Bottle: UGX {product.prices.big_bottle.toLocaleString()}</Text>
                    </View>
                </View>

                <View className="mt-4 flex-row items-center justify-between">
                    <View className="flex-row">
                        <View className="h-6 w-6 rounded-full bg-red-400 border-2 border-white dark:border-slate-800" />
                        <View className="h-6 w-6 rounded-full bg-green-400 border-2 border-white dark:border-slate-800 -ml-2" />
                    </View>

                    <TouchableOpacity
                        className="bg-primary px-6 py-2 rounded-full flex-row items-center"
                        onPress={() => onPress(product)}
                    >
                        <Text className="text-slate-900 font-bold mr-1">Select</Text>
                        <Plus size={16} color="#0f172a" strokeWidth={3} />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
};
