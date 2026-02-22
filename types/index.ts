export type SizeOption = 'cup' | 'big_bottle';

export interface Product {
    id: string;
    name: string;
    description: string;
    prices: Record<SizeOption, number>;
    image: string;
    category: string;
    label?: string;
    labelColor?: string;
}

export type OrderStatus = 'Pending' | 'Delivered' | 'Completed' | 'Cancelled';

export interface Order {
    id: string;
    date: string;
    status: OrderStatus;
    total: number;
    items: {
        id: string;
        name: string;
        size: SizeOption;
        quantity: number;
        price: number;
    }[];
    phone: string;
    paymentMethod: 'MTN' | 'AIRTEL';
}
