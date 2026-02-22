import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, SafeAreaView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { ArrowLeft, CheckCircle2, Lock, Contact2, Trash2, Plus, Minus } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useCart } from '@/context/CartContext';
import { useOrders } from '@/context/OrderContext';
import { SizeOption } from '@/types';

export default function CheckoutScreen() {
    const router = useRouter();
    const { cart, updateQuantity, removeFromCart, total, clearCart } = useCart();
    const { addOrder } = useOrders();
    const [paymentMethod, setPaymentMethod] = useState<'MTN' | 'AIRTEL'>('MTN');
    const [phoneNumber, setPhoneNumber] = useState('');

    const sizeLabel = (size: SizeOption) => size === 'cup' ? 'Cup' : 'Big Bottle';
    const deliveryFee = 3000;
    const finalTotal = total + deliveryFee;

    const handlePayment = () => {
        if (cart.length === 0) {
            Alert.alert('Cart Empty', 'Please add some juices before checking out.');
            return;
        }

        if (phoneNumber.length < 9) {
            Alert.alert('Invalid Number', 'Please enter a valid Ugandan phone number.');
            return;
        }

        // Create the order object
        addOrder({
            total: finalTotal,
            items: cart.map(item => ({
                id: item.productId,
                name: item.name,
                size: item.size,
                quantity: item.quantity,
                price: item.price
            })),
            phone: `+256${phoneNumber}`,
            paymentMethod: paymentMethod
        });

        Alert.alert(
            'Payment Initiated',
            `A USSD prompt has been sent to ${phoneNumber}. Please enter your PIN to complete the payment of UGX ${finalTotal.toLocaleString()}.`,
            [{
                text: 'OK',
                onPress: () => {
                    // In a real app, we'd wait for webhook/callback
                    clearCart();
                    router.push('/fulfillment');
                }
            }]
        );
    };

    if (cart.length === 0) {
        return (
            <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark justify-center items-center p-6">
                <Text className="text-xl font-bold text-slate-900 dark:text-white mb-2">Your cart is empty</Text>
                <Text className="text-slate-500 text-center mb-6">Looks like you haven't added any sugarcane blends yet.</Text>
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="bg-primary px-8 py-3 rounded-full"
                >
                    <Text className="font-bold">Browse Juices</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                {/* Header */}
                <View className="flex-row items-center px-4 py-4 border-b border-primary/10 bg-white/80 dark:bg-slate-900/80">
                    <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-full bg-slate-100 dark:bg-slate-800">
                        <ArrowLeft size={20} color="#0f172a" />
                    </TouchableOpacity>
                    <Text className="flex-1 text-center text-lg font-bold mr-10 text-slate-900 dark:text-white">Secure Checkout</Text>
                </View>

                <ScrollView className="flex-1 px-4 pt-6" showsVerticalScrollIndicator={false}>
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-lg font-bold text-slate-900 dark:text-white">Order Summary</Text>
                        <View className="bg-primary/10 px-3 py-1 rounded-full">
                            <Text className="text-sm font-medium text-primary">{cart.length} Blends</Text>
                        </View>
                    </View>

                    {/* Items List */}
                    <View className="space-y-3">
                        {cart.map((item) => (
                            <View key={item.id} className="flex-row items-center gap-4 bg-white dark:bg-slate-900/50 p-3 rounded-xl border border-primary/5 shadow-sm">
                                <View className="bg-slate-200 rounded-lg size-16 items-center justify-center overflow-hidden">
                                    <Text className="text-[10px] font-bold text-slate-400 absolute">DINGS</Text>
                                    {/* Image would go here */}
                                </View>
                                <View className="flex-1">
                                    <View className="flex-row justify-between items-start">
                                        <View>
                                            <Text className="font-bold text-base text-slate-900 dark:text-white" numberOfLines={1}>{item.name}</Text>
                                            <Text className="text-slate-500 text-xs">{sizeLabel(item.size)} • UGX {item.price.toLocaleString()}</Text>
                                        </View>
                                        <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                                            <Trash2 size={16} color="#ef4444" />
                                        </TouchableOpacity>
                                    </View>

                                    <View className="flex-row justify-between items-center mt-2">
                                        <View className="flex-row items-center bg-slate-100 dark:bg-slate-800 rounded-full px-2 py-1">
                                            <TouchableOpacity onPress={() => updateQuantity(item.id, -1)} className="p-1">
                                                <Minus size={14} color="#64748b" />
                                            </TouchableOpacity>
                                            <Text className="px-3 font-bold text-slate-900 dark:text-white">{item.quantity}</Text>
                                            <TouchableOpacity onPress={() => updateQuantity(item.id, 1)} className="p-1">
                                                <Plus size={14} color="#64748b" />
                                            </TouchableOpacity>
                                        </View>
                                        <Text className="font-bold text-sm text-slate-900 dark:text-white">UGX {(item.price * item.quantity).toLocaleString()}</Text>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>

                    {/* Price Breakdown */}
                    <View className="mt-8 bg-white dark:bg-slate-900/50 p-5 rounded-2xl border border-primary/5 shadow-sm">
                        <View className="flex-row justify-between mb-2">
                            <Text className="text-slate-500">Subtotal</Text>
                            <Text className="font-bold text-slate-900 dark:text-white">UGX {total.toLocaleString()}</Text>
                        </View>
                        <View className="flex-row justify-between mb-3">
                            <Text className="text-slate-500">Delivery Fee (Kampala Central)</Text>
                            <Text className="font-bold text-slate-900 dark:text-white">UGX {deliveryFee.toLocaleString()}</Text>
                        </View>
                        <View className="h-px bg-slate-200 dark:bg-slate-800 my-2" />
                        <View className="flex-row justify-between mt-1">
                            <Text className="text-lg font-bold text-slate-900 dark:text-white">Total Amount</Text>
                            <Text className="text-lg font-extrabold text-primary">UGX {finalTotal.toLocaleString()}</Text>
                        </View>
                    </View>

                    {/* Payment Methods */}
                    <Text className="text-lg font-bold mt-10 mb-4 text-slate-900 dark:text-white">Select Payment Method</Text>
                    <View className="flex-row gap-3">
                        <TouchableOpacity
                            onPress={() => setPaymentMethod('MTN')}
                            className={`flex-1 p-4 rounded-xl border-2 items-center ${paymentMethod === 'MTN' ? 'border-primary bg-primary/5' : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50'}`}
                        >
                            <View className="w-10 h-10 mb-2 rounded-lg bg-[#FFCC00] items-center justify-center">
                                <Text className="font-black text-black text-[10px]">MTN</Text>
                            </View>
                            <Text className="text-[10px] font-bold uppercase text-slate-600 dark:text-slate-400">MTN MoMo</Text>
                            {paymentMethod === 'MTN' && <CheckCircle2 size={12} color="#43f906" className="absolute top-2 right-2" />}
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setPaymentMethod('AIRTEL')}
                            className={`flex-1 p-4 rounded-xl border-2 items-center ${paymentMethod === 'AIRTEL' ? 'border-primary bg-primary/5' : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50'}`}
                        >
                            <View className="w-10 h-10 mb-2 rounded-lg bg-[#E41937] items-center justify-center">
                                <Text className="font-black text-white text-[10px]">airtel</Text>
                            </View>
                            <Text className="text-[10px] font-bold uppercase text-slate-600 dark:text-slate-400">Airtel Money</Text>
                            {paymentMethod === 'AIRTEL' && <CheckCircle2 size={12} color="#43f906" className="absolute top-2 right-2" />}
                        </TouchableOpacity>
                    </View>

                    {/* Phone Input */}
                    <View className="mt-6">
                        <Text className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-2">MoMo Number to Charge</Text>
                        <View className="relative">
                            <View className="absolute left-4 top-4 z-10">
                                <Text className="text-slate-400 font-bold">+256</Text>
                            </View>
                            <TextInput
                                className="bg-white dark:bg-slate-900/50 pl-16 pr-12 py-4 rounded-xl font-bold text-lg text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800"
                                placeholder="7XX XXX XXX"
                                placeholderTextColor="#94a3b8"
                                keyboardType="phone-pad"
                                maxLength={9}
                                value={phoneNumber}
                                onChangeText={setPhoneNumber}
                            />
                            <TouchableOpacity className="absolute right-4 top-4">
                                <Contact2 size={24} color="#43f906" />
                            </TouchableOpacity>
                        </View>
                        <Text className="text-[10px] text-slate-400 text-center mt-3 uppercase tracking-widest leading-relaxed">
                            A secure USSD push will be sent to your phone.{"\n"}Enter your Mobile Money PIN to authorize.
                        </Text>
                    </View>

                    {/* Pay Button Area */}
                    <View className="mt-10 mb-16 items-center">
                        <View className="flex-row items-center gap-1 mb-4 opacity-50">
                            <Lock size={12} color="#64748b" />
                            <Text className="text-[10px] font-bold text-slate-500 uppercase">Secure Ugandan Payment Gateway</Text>
                        </View>

                        <TouchableOpacity
                            onPress={handlePayment}
                            className="w-full bg-primary py-4 rounded-full items-center shadow-lg shadow-primary/30"
                        >
                            <Text className="text-slate-900 font-extrabold text-lg">Send USSD Prompt (UGX {finalTotal.toLocaleString()})</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
