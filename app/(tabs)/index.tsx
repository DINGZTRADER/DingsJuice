import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, SafeAreaView, Modal } from 'react-native';
import { ShoppingCart, Search, Leaf, X, CupSoda, ShoppingBag } from 'lucide-react-native';
import { products } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { Product, SizeOption } from '@/types';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'expo-router';

import { SizeSelectionModal } from '@/components/SizeSelectionModal';

export default function HomeScreen() {
  const router = useRouter();
  const { cart, addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Juices');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showSizeModal, setShowSizeModal] = useState(false);

  const categories = ['All Juices', 'Poppular', 'Detox & Energy', 'Traditional & Organic'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All Juices' || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

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
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 pt-4 pb-2">
        <View className="flex-row items-center">
          <View className="bg-primary p-2 rounded-full mr-2">
            <Leaf size={24} color="#0f172a" />
          </View>
          <Text className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">DingsJuice</Text>
        </View>
        <TouchableOpacity
          onPress={() => router.push('/checkout')}
          className="relative bg-slate-200/50 dark:bg-slate-800/50 p-2.5 rounded-full"
        >
          <ShoppingCart size={24} color="#0f172a" />
          {cart.length > 0 && (
            <View className="absolute -right-1 -top-1 bg-primary h-5 w-5 rounded-full items-center justify-center border-2 border-background-light dark:border-background-dark">
              <Text className="text-[10px] font-bold text-slate-900">{cart.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-4">
        {/* Search Bar */}
        <View className="flex-row items-center bg-slate-200/50 dark:bg-slate-800/50 rounded-full px-4 py-2 mt-4 mb-4">
          <Search size={18} color="#64748b" className="mr-2" />
          <TextInput
            className="flex-1 text-sm text-slate-900 dark:text-white"
            placeholder="Search healthy blends..."
            placeholderTextColor="#64748b"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              onPress={() => setActiveCategory(cat)}
              className={`mr-2 px-4 py-2 rounded-full ${activeCategory === cat ? 'bg-primary' : 'bg-slate-200/50 dark:bg-slate-800/50'}`}
            >
              <Text className={`text-sm font-semibold ${activeCategory === cat ? 'text-slate-900' : 'text-slate-500 dark:text-slate-400'}`}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Main Content */}
        <Text className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
          {activeCategory === 'All Juices' ? 'Freshly Squeezed in Kampala' : activeCategory}
        </Text>

        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onPress={handleProductPress}
            />
          ))
        ) : (
          <View className="items-center py-20">
            <Text className="text-slate-400 font-medium">No juices found matching your search</Text>
          </View>
        )}

        {/* Bottom Spacing */}
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
