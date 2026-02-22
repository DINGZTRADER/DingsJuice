import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { ArrowLeft, CheckCircle2, MapPin, Bike, ChevronRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useOrders } from '@/context/OrderContext';

export default function FulfillmentScreen() {
    const router = useRouter();
    const { orders } = useOrders();
    const latestOrder = orders[0];

    const handleChoice = (type: 'pickup' | 'delivery') => {
        // Logic to update fulfillment type would go here
        router.push('/(tabs)');
    };

    return (
        <SafeAreaView className="flex-1 bg-white dark:bg-slate-950">
            <View className="flex-row items-center p-6 pb-2">
                <TouchableOpacity onPress={() => router.back()} className="size-12 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                    <ArrowLeft size={24} color="#0f172a" />
                </TouchableOpacity>
                <Text className="flex-1 text-center text-lg font-bold pr-12 text-slate-900 dark:text-white">Order Status</Text>
            </View>

            <ScrollView className="flex-1 px-6">
                {/* Success Header */}
                <View className="items-center pt-10 pb-8 text-center">
                    <View className="relative mb-6">
                        <View className="absolute inset-0 bg-primary/20 rounded-full scale-125 blur-xl" />
                        <View className="relative size-24 bg-primary rounded-full items-center justify-center shadow-lg shadow-primary/30">
                            <CheckCircle2 size={48} color="#0f172a" strokeWidth={3} />
                        </View>
                    </View>
                    <Text className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">Order Successful!</Text>
                    <Text className="text-slate-500 text-center text-base leading-relaxed px-4">
                        Payment confirmed. Your fresh Ugandan DingsJuice is ready for the next step.
                    </Text>
                </View>

                {/* Fulfillment Choice */}
                <View className="mt-8">
                    <Text className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4 px-1">How would you like it?</Text>

                    <TouchableOpacity
                        onPress={() => handleChoice('pickup')}
                        className="flex-row items-center gap-5 p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl mb-4 border-2 border-transparent active:border-primary"
                    >
                        <View className="size-16 rounded-full bg-white dark:bg-slate-800 items-center justify-center shadow-sm">
                            <MapPin size={32} color="#43f906" />
                        </View>
                        <View className="flex-1">
                            <Text className="text-xl font-bold text-slate-900 dark:text-white mb-1">Pick Up In-Store</Text>
                            <Text className="text-slate-500 text-sm">Collect from your nearest branch in Kampala.</Text>
                        </View>
                        <ChevronRight size={20} color="#cbd5e1" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => handleChoice('delivery')}
                        className="flex-row items-center gap-5 p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border-2 border-transparent active:border-primary"
                    >
                        <View className="size-16 rounded-full bg-white dark:bg-slate-800 items-center justify-center shadow-sm">
                            <Bike size={32} color="#43f906" />
                        </View>
                        <View className="flex-1">
                            <Text className="text-xl font-bold text-slate-900 dark:text-white mb-1">Deliver to Me</Text>
                            <Text className="text-slate-500 text-sm">Fresh juice delivered to your current location ASAP.</Text>
                        </View>
                        <ChevronRight size={20} color="#cbd5e1" />
                    </TouchableOpacity>
                </View>

                {/* Summary Mini-Card */}
                <View className="mt-10 p-4 bg-primary/5 dark:bg-primary/10 rounded-2xl flex-row justify-between border border-primary/10 mb-10">
                    <View>
                        <Text className="text-[10px] uppercase font-bold text-slate-400">Order ID</Text>
                        <Text className="font-mono font-bold text-slate-700 dark:text-slate-300">{latestOrder?.id || '#DJ-PENDING'}</Text>
                    </View>
                    <View className="items-end">
                        <Text className="text-[10px] uppercase font-bold text-slate-400">Total Paid</Text>
                        <Text className="font-bold text-primary text-base">UGX {(latestOrder?.total || 0).toLocaleString()}</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
