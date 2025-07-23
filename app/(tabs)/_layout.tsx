import { ThemedText } from '@/components/ThemedText';
import { useAuth } from '@/contexts/AuthContext.simple';
import { Tabs, router } from 'expo-router';
import React, { useEffect } from 'react';
import { Platform, Text, View } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';

// Simple icon component using emojis
const TabIcon = ({ icon, color }: { icon: string; color: string }) => (
  <ThemedText style={{ fontSize: 24, color }}>{icon}</ThemedText>
);

export default function TabLayout() {
  const { user, loading } = useAuth();

  useEffect(() => {
    // Only redirect if we're sure the user is not authenticated
    // and we're not loading anymore
    if (!loading && !user) {
      // Add a small delay to prevent immediate redirect
      const timer = setTimeout(() => {
        router.replace('/');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [user, loading]);

  // Don't block the UI completely - allow access even during loading
  // This helps prevent infinite loading states
  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#0F0F23', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'white', fontSize: 16 }}>Loading tabs...</Text>
      </View>
    );
  }

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
          tabBarIcon: ({ color }) => <TabIcon icon="👁️" color={color} />,
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
          title: 'Explore',
          tabBarIcon: ({ color }) => <TabIcon icon="🔍" color={color} />,
        }}
      />
    </Tabs>
  );
}
