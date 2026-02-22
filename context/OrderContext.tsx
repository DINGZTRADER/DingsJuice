import React, { createContext, useContext, useState, useEffect } from 'react';
import { Order } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface OrderContextType {
    orders: Order[];
    addOrder: (order: Omit<Order, 'id' | 'date' | 'status'>) => void;
    clearOrders: () => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        try {
            const savedOrders = await AsyncStorage.getItem('orders');
            if (savedOrders) setOrders(JSON.parse(savedOrders));
        } catch (e) {
            console.error('Failed to load orders', e);
        }
    };

    const addOrder = async (orderData: Omit<Order, 'id' | 'date' | 'status'>) => {
        const newOrder: Order = {
            ...orderData,
            id: `DJ-${Math.floor(10000 + Math.random() * 90000)}`,
            date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
            status: 'Pending',
        };

        const updatedOrders = [newOrder, ...orders];
        setOrders(updatedOrders);
        try {
            await AsyncStorage.setItem('orders', JSON.stringify(updatedOrders));
        } catch (e) {
            console.error('Failed to save order', e);
        }
    };

    const clearOrders = async () => {
        setOrders([]);
        await AsyncStorage.removeItem('orders');
    };

    return (
        <OrderContext.Provider value={{ orders, addOrder, clearOrders }}>
            {children}
        </OrderContext.Provider>
    );
};

export const useOrders = () => {
    const context = useContext(OrderContext);
    if (!context) throw new Error('useOrders must be used within an OrderProvider');
    return context;
};
