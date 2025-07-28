import { ThemedText } from '../../components/ThemedText';
import { useAuth } from '../../contexts/AuthContext';
import { Tabs, router } from 'expo-router';
import React, { useEffect } from 'react';
import { Platform, Text, View } from 'react-native';

import { HapticTab } from '../../components/HapticTab';
import TabBarBackground from '../../components/ui/TabBarBackground';

// Simple icon component using emojis
const TabIcon = ({ icon, color }: { icon: string; color: string }) => (
  <ThemedText style={{ fontSize: 24, color }}>{icon}</ThemedText>
);

export default function TabLayout() {
  // Use a try-catch to handle cases where AuthProvider isn't ready yet
  let user = null;
  let loading = true;
  
  try {
    const authData = useAuth();
    user = authData.user;
    loading = authData.loading;
  } catch {
    console.log('AuthProvider not ready yet, defaulting to loading state');
    // Keep default values: user = null, loading = true
  }

  useEffect(() => {
    // Only redirect if we're absolutely sure the user is not authenticated
    // and we've finished loading
    if (!loading && !user) {
      console.log('No user found after loading, redirecting to login');
      // Add a longer delay to ensure Firebase has fully checked for persisted auth
      const timer = setTimeout(() => {
        router.replace('/');
      }, 2000); // Increased to 2 seconds
      return () => clearTimeout(timer);
    } else if (!loading && user) {
      console.log('User authenticated:', user.email || user.displayName);
    }
  }, [user, loading]);

  // Show loading for a reasonable amount of time
  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#0F0F23', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'white', fontSize: 16, marginBottom: 8 }}>Loading Drishti...</Text>
        <Text style={{ color: '#666', fontSize: 14 }}>Checking authentication...</Text>
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
