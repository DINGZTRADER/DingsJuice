import { Product } from '../types';
import { PRICING } from '../constants/business';

export const products: Product[] = [
    {
        id: '1',
        name: 'Sugarcane & Beetroot',
        description: 'A deep red organic blend rich in nitrates and natural vitality.',
        prices: { cup: PRICING.CUP, big_bottle: PRICING.BIG_BOTTLE },
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBNGR_-_f2uT4O85A-xAh2FUiEuhwTOQem36ELTlfPpaPdG3qMizrzWb5kfSZU3pgZcuPkjVwDpHwUr1L15sth2nno7VxwUR4xOqmxpzyFAHZ5e_4uFmnwKcvD0WTda1piYD8wGXTz8BgT3rpamgkuc7m-esAMn4TGBv-UafjLeIRpdVuHq-WBr0KRICVTfib97zNjNGsQ45xkrj4m7t8o8lQAPL-AvhAeVr9zs7gZe2tQCCzxvpPraXwYkTO-pc2_H2uUH-6H1j_D',
        category: 'Detox & Energy',
        label: 'Detox & Energy',
        labelColor: 'bg-red-500',
    },
    {
        id: '2',
        name: 'Sugarcane & Ginger',
        description: 'Bright yellow kick of Ugandan ginger to awaken your senses.',
        prices: { cup: PRICING.CUP, big_bottle: PRICING.BIG_BOTTLE },
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANxnIuF84przKi5utomWQAYXfDrqZF1Hx9CEOq7bKM4FSikUoEwvbfe7lXm8Dxle3hYDVqPuYU_Lny7G2JiC6kRUNuz7ggiBuJRBiIzYmF3qy-qEoNYfu0vh8YMT3pA_WBKsA_S_qZK78Np-TCmZlPj-_DoDM0V7MZy78fG8atfCkhY0wAMhLob6eUZuPdEEvqp19gLay7vr-3S5Xued7A_wOhLCccDLhS02mQ41u-5zwd6yM8s3R58uYJtenST2tYRcHMCeYGXuqw',
        category: 'Immunity & Zest',
        label: 'Immunity & Zest',
        labelColor: 'bg-yellow-500',
    },
    {
        id: '3',
        name: 'Sugarcane & Mulondo',
        description: 'An earthy green blend featuring native Mondia whitei roots.',
        prices: { cup: PRICING.CUP, big_bottle: PRICING.BIG_BOTTLE },
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjUcpCyqhKc5DobROTyLLHWj-3URTNhBEZjeSLoToE4jqDgwORaKKQFnCM9QuDuWEdQGjNPRX6vFT3oQOJYvX6fmihlpHmdnfpywtLfQ2HoK6-OST3tHWMvRScKn6k9kfFdYKR3MUbSmLZkvGYa3XaUs8xlh389pbM1pFZP8GTO_6vfkxgoLoHLr9SvIjTBzG6w9amF0x_S13N8hbAxShBri7CXZELo-wV48Gla5d4UcT9ajziCPRpn0GpsTdZvTFWuRjUXL8SFsoq',
        category: 'Traditional & Organic',
        label: 'Traditional & Organic',
        labelColor: 'bg-emerald-600',
    },
];
