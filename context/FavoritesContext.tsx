import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FavoritesContextType {
    favorites: Product[];
    toggleFavorite: (product: Product) => void;
    isFavorite: (productId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [favorites, setFavorites] = useState<Product[]>([]);

    useEffect(() => {
        loadFavorites();
    }, []);

    const loadFavorites = async () => {
        try {
            const saved = await AsyncStorage.getItem('favorites');
            if (saved) setFavorites(JSON.parse(saved));
        } catch (e) {
            console.error('Failed to load favorites', e);
        }
    };

    const toggleFavorite = (product: Product) => {
        setFavorites(prev => {
            const isFav = prev.some(p => p.id === product.id);
            const next = isFav ? prev.filter(p => p.id !== product.id) : [...prev, product];
            AsyncStorage.setItem('favorites', JSON.stringify(next));
            return next;
        });
    };

    const isFavorite = (productId: string) => favorites.some(p => p.id === productId);

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) throw new Error('useFavorites must be used within a FavoritesProvider');
    return context;
};
