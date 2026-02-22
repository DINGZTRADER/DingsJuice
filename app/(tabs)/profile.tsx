import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { User, Settings, Shield, Bell, HelpCircle } from 'lucide-react-native';

export default function ProfileScreen() {
    return (
        <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
            <ScrollView className="flex-1 px-4 pt-10">
                <View className="items-center mb-10">
                    <View className="size-24 bg-slate-200 dark:bg-slate-800 rounded-full items-center justify-center mb-4">
                        <User size={48} color="#64748b" />
                    </View>
                    <Text className="text-2xl font-bold text-slate-900 dark:text-white">Welcome to DingsJuice</Text>
                    <Text className="text-slate-500">Uganda's Fresh Sugarcane Juice</Text>
                </View>

                <View className="space-y-4">
                    <ProfileItem icon={<Settings size={20} color="#64748b" />} label="Settings" />
                    <ProfileItem icon={<Shield size={20} color="#64748b" />} label="Privacy & Security" />
                    <ProfileItem icon={<Bell size={20} color="#64748b" />} label="Notifications" />
                    <ProfileItem icon={<HelpCircle size={20} color="#64748b" />} label="Help & Support" />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const ProfileItem = ({ icon, label }: { icon: React.ReactNode, label: string }) => (
    <TouchableOpacity className="flex-row items-center p-4 bg-white dark:bg-slate-900 rounded-xl border border-primary/5 mb-4">
        {icon}
        <Text className="ml-4 font-semibold text-slate-900 dark:text-white">{label}</Text>
    </TouchableOpacity>
);
