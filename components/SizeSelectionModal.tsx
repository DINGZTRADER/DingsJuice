import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { X, CupSoda, ShoppingBag } from 'lucide-react-native';
import { Product, SizeOption } from '@/types';

interface SizeSelectionModalProps {
    visible: boolean;
    onClose: () => void;
    product: Product | null;
    onSelectSize: (size: SizeOption) => void;
}

export const SizeSelectionModal: React.FC<SizeSelectionModalProps> = ({ visible, onClose, product, onSelectSize }) => {
    if (!product) return null;

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View className="flex-1 justify-end bg-black/60">
                <View className="bg-white dark:bg-slate-900 rounded-t-[32px] p-6 pb-12 shadow-2xl">
                    <View className="flex-row justify-between items-center mb-6">
                        <View>
                            <Text className="text-2xl font-bold text-slate-900 dark:text-white">{product.name}</Text>
                            <Text className="text-slate-500">Choose your size</Text>
                        </View>
                        <TouchableOpacity
                            onPress={onClose}
                            className="bg-slate-100 dark:bg-slate-800 p-2 rounded-full"
                        >
                            <X size={20} color="#64748b" />
                        </TouchableOpacity>
                    </View>

                    <View className="flex-row gap-4">
                        <TouchableOpacity
                            onPress={() => onSelectSize('cup')}
                            className="flex-1 bg-slate-50 dark:bg-slate-800/50 border-2 border-primary/20 rounded-2xl p-5 items-center"
                        >
                            <View className="bg-primary/10 p-3 rounded-full mb-3">
                                <CupSoda size={32} color="#43f906" />
                            </View>
                            <Text className="font-bold text-lg text-slate-900 dark:text-white">Cup</Text>
                            <Text className="text-primary font-black mt-1">UGX {product.prices.cup.toLocaleString()}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => onSelectSize('big_bottle')}
                            className="flex-1 bg-slate-50 dark:bg-slate-800/50 border-2 border-primary rounded-2xl p-5 items-center"
                        >
                            <View className="bg-primary p-3 rounded-full mb-3">
                                <ShoppingBag size={32} color="#0f172a" />
                            </View>
                            <Text className="font-bold text-lg text-slate-900 dark:text-white">Big Bottle</Text>
                            <Text className="text-slate-900 dark:text-primary font-black mt-1">UGX {product.prices.big_bottle.toLocaleString()}</Text>
                        </TouchableOpacity>
                    </View>

                    <Text className="text-center text-[10px] text-slate-400 mt-6 uppercase tracking-widest font-bold">
                        Pure Natural Sugarcane Base • No Added Sugar
                    </Text>
                </View>
            </View>
        </Modal>
    );
};
