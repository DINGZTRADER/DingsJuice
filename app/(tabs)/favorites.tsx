import React from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import { Heart } from 'lucide-react-native';

export default function FavoritesScreen() {
    return (
        <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
            <ScrollView className="flex-1 px-4 pt-10">
                <View className="items-center mt-20">
                    <Heart size={64} color="#43f906" />
                    <Text className="text-2xl font-bold mt-4 text-slate-900 dark:text-white">Your Favorites</Text>
                    <Text className="text-slate-500 text-center mt-2">Log in to save your favorite juice blends here.</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
