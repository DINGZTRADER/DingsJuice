import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { ReceiptText, CheckCircle2, ChevronRight, Clock, Package } from 'lucide-react-native';
import { useOrders } from '@/context/OrderContext';
import { useRouter } from 'expo-router';

export default function OrdersScreen() {
  const { orders } = useOrders();
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
      <View className="px-4 pt-6 pb-2">
        <Text className="text-3xl font-extrabold text-slate-900 dark:text-white">Order History</Text>
        <Text className="text-slate-500">Track your fresh juice deliveries</Text>
      </View>

      <ScrollView className="flex-1 px-4 pt-6" showsVerticalScrollIndicator={false}>
        {orders.length > 0 ? (
          <View className="space-y-4">
            {orders.map((order) => (
              <TouchableOpacity key={order.id} className="bg-white dark:bg-slate-900/50 p-4 rounded-2xl border border-primary/5 shadow-sm">
                <View className="flex-row justify-between items-start mb-3">
                  <View>
                    <Text className="font-bold text-slate-900 dark:text-white">Order #{order.id}</Text>
                    <View className="flex-row items-center mt-1">
                      <Clock size={12} color="#64748b" />
                      <Text className="text-xs text-slate-500 ml-1">{order.date}</Text>
                    </View>
                  </View>
                  <View className="bg-primary/10 px-3 py-1 rounded-full flex-row items-center">
                    <CheckCircle2 size={10} color="#43f906" />
                    <Text className="text-[10px] font-bold text-primary ml-1 uppercase">{order.status}</Text>
                  </View>
                </View>

                <Text className="text-xs text-slate-600 dark:text-slate-400 mb-4" numberOfLines={1}>
                  {order.items.map(item => `${item.quantity}x ${item.name} (${item.size === 'cup' ? 'Cup' : 'Bottle'})`).join(', ')}
                </Text>

                <View className="flex-row justify-between items-center pt-3 border-t border-slate-100 dark:border-slate-800">
                  <View>
                    <Text className="text-[10px] text-slate-400 uppercase font-bold">Total Paid</Text>
                    <Text className="font-bold text-slate-900 dark:text-white">UGX {order.total.toLocaleString()}</Text>
                  </View>
                  <TouchableOpacity className="flex-row items-center">
                    <Text className="text-xs font-bold text-primary mr-1">Order Details</Text>
                    <ChevronRight size={14} color="#43f906" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View className="items-center mt-20">
            <ReceiptText size={64} color="#e2e8f0" />
            <Text className="text-2xl font-bold mt-4 text-slate-900 dark:text-white">No active orders yet</Text>
            <Text className="text-slate-500 text-center mt-2 px-10">Your healthy juice journey starts here. Place your first order today!</Text>

            <TouchableOpacity
              onPress={() => router.push('/(tabs)')}
              className="mt-8 bg-primary px-8 py-3 rounded-full"
            >
              <Text className="font-bold text-slate-900">Explore Menu</Text>
            </TouchableOpacity>
          </View>
        )}

        <View className="h-24" />
      </ScrollView>
    </SafeAreaView>
  );
}
