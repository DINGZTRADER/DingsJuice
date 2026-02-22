import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { User, Settings, Shield, Bell, HelpCircle, LogOut, ChevronRight, MapPin, CreditCard } from 'lucide-react-native';

export default function ProfileScreen() {
    // Mock user data - in a real app, this would come from AuthContext/Firebase
    const user = {
        name: "Dings Trader",
        phone: "+256 700 000 000",
        location: "Kampala, Uganda",
        avatar: "https://lh3.googleusercontent.com/a/ACg8ocL_XF_r_X_X_X_X_X_X_X_X_X_X_X_X_X_X_X_X_X_X=s96-c"
    };

    return (
        <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
            <ScrollView className="flex-1 px-4 pt-6" showsVerticalScrollIndicator={false}>
                {/* Profile Header */}
                <View className="items-center mb-8">
                    <View className="relative">
                        <View className="size-28 bg-primary/10 rounded-full items-center justify-center p-1 border-2 border-primary">
                            <Image
                                source={{ uri: user.avatar }}
                                className="size-full rounded-full"
                                defaultSource={require('@/assets/images/logo.png')}
                            />
                        </View>
                        <View className="absolute bottom-0 right-0 bg-primary p-2 rounded-full border-4 border-background-light dark:border-background-dark">
                            <Settings size={16} color="#0f172a" />
                        </View>
                    </View>

                    <Text className="text-2xl font-bold text-slate-900 dark:text-white mt-4">{user.name}</Text>
                    <View className="flex-row items-center mt-1">
                        <MapPin size={14} color="#64748b" />
                        <Text className="text-slate-500 ml-1">{user.location}</Text>
                    </View>
                </View>

                {/* Account Section */}
                <Text className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 px-2">Account Settings</Text>
                <View className="bg-white dark:bg-slate-900/50 rounded-3xl overflow-hidden border border-primary/5 mb-8">
                    <ProfileItem
                        icon={<User size={20} color="#64748b" />}
                        label="Personal Information"
                        value={user.phone}
                    />
                    <ProfileItem
                        icon={<CreditCard size={20} color="#64748b" />}
                        label="Payment Methods"
                        value="MoMo / Airtel"
                    />
                    <ProfileItem
                        icon={<Bell size={20} color="#64748b" />}
                        label="Notifications"
                    />
                </View>

                {/* Support Section */}
                <Text className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 px-2">Support & Legal</Text>
                <View className="bg-white dark:bg-slate-900/50 rounded-3xl overflow-hidden border border-primary/5 mb-8">
                    <ProfileItem
                        icon={<Shield size={20} color="#64748b" />}
                        label="Privacy Policy"
                    />
                    <ProfileItem
                        icon={<HelpCircle size={20} color="#64748b" />}
                        label="Help Center"
                    />
                </View>

                {/* Logout Button */}
                <TouchableOpacity className="flex-row items-center justify-center p-4 bg-red-50 dark:bg-red-950/20 rounded-2xl mb-12">
                    <LogOut size={20} color="#ef4444" />
                    <Text className="ml-2 font-bold text-red-500">Sign Out</Text>
                </TouchableOpacity>

                <View className="items-center mb-20">
                    <Text className="text-[10px] text-slate-400 uppercase font-bold tracking-[4px]">DingsJuice v1.0.0</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

interface ProfileItemProps {
    icon: React.ReactNode;
    label: string;
    value?: string;
    onPress?: () => void;
}

const ProfileItem = ({ icon, label, value, onPress }: ProfileItemProps) => (
    <TouchableOpacity
        onPress={onPress}
        className="flex-row items-center p-4 border-b border-slate-50 dark:border-slate-800/50"
    >
        <View className="size-10 bg-slate-100 dark:bg-slate-800 rounded-full items-center justify-center">
            {icon}
        </View>
        <View className="flex-1 ml-4">
            <Text className="font-semibold text-slate-900 dark:text-white">{label}</Text>
            {value && <Text className="text-xs text-slate-500 mt-0.5">{value}</Text>}
        </View>
        <ChevronRight size={18} color="#cbd5e1" />
    </TouchableOpacity>
);
