import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, SizeOption } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface CartItem {
    id: string;
    productId: string;
    name: string;
    size: SizeOption;
    price: number;
    quantity: number;
    image: string;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: Product, size: SizeOption) => void;
    removeFromCart: (itemId: string) => void;
    updateQuantity: (itemId: string, delta: number) => void;
    clearCart: () => void;
    total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    useEffect(() => {
        loadDimensions();
    }, []);

    const loadDimensions = async () => {
        try {
            const savedCart = await AsyncStorage.getItem('cart');
            if (savedCart) setCart(JSON.parse(savedCart));
        } catch (e) {
            console.error('Failed to load cart', e);
        }
    };

    const saveCart = async (newCart: CartItem[]) => {
        try {
            await AsyncStorage.setItem('cart', JSON.stringify(newCart));
        } catch (e) {
            console.error('Failed to save cart', e);
        }
    };

    const addToCart = (product: Product, size: SizeOption) => {
        setCart(prev => {
            const existingItem = prev.find(item => item.productId === product.id && item.size === size);
            let nextCart;
            if (existingItem) {
                nextCart = prev.map(item =>
                    (item.productId === product.id && item.size === size)
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                nextCart = [...prev, {
                    id: `${product.id}-${size}`,
                    productId: product.id,
                    name: product.name,
                    size,
                    price: product.prices[size],
                    quantity: 1,
                    image: product.image
                }];
            }
            saveCart(nextCart);
            return nextCart;
        });
    };

    const removeFromCart = (itemId: string) => {
        setCart(prev => {
            const nextCart = prev.filter(item => item.id !== itemId);
            saveCart(nextCart);
            return nextCart;
        });
    };

    const updateQuantity = (itemId: string, delta: number) => {
        setCart(prev => {
            const nextCart = prev.map(item =>
                item.id === itemId
                    ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                    : item
            );
            saveCart(nextCart);
            return nextCart;
        });
    };

    const clearCart = () => {
        setCart([]);
        AsyncStorage.removeItem('cart');
    };

    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, total }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within a CartProvider');
    return context;
};
