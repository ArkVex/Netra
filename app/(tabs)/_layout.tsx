import { ThemedText } from '@/components/ThemedText';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';

// Simple icon component using emojis
const TabIcon = ({ icon, color }: { icon: string; color: string }) => (
  <ThemedText style={{ fontSize: 24, color }}>{icon}</ThemedText>
);

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#00bcd4',
        tabBarInactiveTintColor: '#666666',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
          backgroundColor: '#000000',
          borderTopColor: 'rgba(255, 255, 255, 0.1)',
          borderTopWidth: 1,
          height: 80,
          paddingBottom: 20,
          paddingTop: 8,
          ...Platform.select({
            ios: {
              position: 'absolute',
              height: 90,
              paddingBottom: 30,
            },
          }),
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabIcon icon="🏠" color={color} />,
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: 'Scan',
          tabBarIcon: ({ color }) => <TabIcon icon="📱" color={color} />,
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }) => <TabIcon icon="📊" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'History',
          tabBarIcon: ({ color }) => <TabIcon icon="📋" color={color} />,
        }}
      />
    </Tabs>
  );
}
