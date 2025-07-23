import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';

interface Tip {
  title: string;
  summary: string;
  details: string;
}

export default function EyeCareTipsScreen() {
  const tips: Tip[] = [
    {
      title: '20-20-20 Rule',
      summary: 'Every 20 minutes, look at something 20 feet away for 20 seconds.',
      details: 'This simple rule helps reduce digital eye strain by relaxing the focusing muscles in your eyes. Set a timer to remind yourself to take these breaks throughout the day. Look out a window or at a distant object to give your eyes a rest from close-up work.'
    },
    {
      title: 'Proper Lighting',
      summary: 'Optimal lighting conditions for reading and screen use.',
      details: 'Use ambient lighting that\'s about half as bright as your screen. Position screens perpendicular to windows to reduce glare. Avoid working in complete darkness with only screen light, as this creates harsh contrast that strains your eyes.'
    },
    {
      title: 'Eye Protection',
      summary: 'When and how to protect your eyes from UV and injury.',
      details: 'Wear UV-blocking sunglasses outdoors and safety glasses during activities that could cause eye injury. Choose sunglasses that block 99-100% of UV rays. Use protective eyewear when playing sports, doing yard work, or working with chemicals.'
    },
    {
      title: 'Blink More Often',
      summary: 'Conscious blinking helps maintain eye moisture.',
      details: 'When focusing on screens, we blink less frequently, leading to dry eyes. Make a conscious effort to blink fully and frequently. Consider using artificial tears if you experience persistent dryness.'
    },
    {
      title: 'Adjust Screen Settings',
      summary: 'Optimize your display for comfortable viewing.',
      details: 'Adjust brightness to match your surroundings, increase text size to reduce squinting, and use dark mode in low-light conditions. Position your screen 20-24 inches away from your eyes with the top at or below eye level.'
    },
    {
      title: 'Stay Hydrated',
      summary: 'Proper hydration supports healthy tear production.',
      details: 'Drink plenty of water throughout the day to maintain overall health and support natural tear production. Dehydration can contribute to dry eyes and general eye discomfort.'
    }
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ThemedView style={styles.header}>
        <TouchableOpacity 
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <ThemedText style={styles.backButtonText}>← Back</ThemedText>
        </TouchableOpacity>
        <ThemedText style={styles.title}>💡 Eye Care Tips</ThemedText>
        <ThemedText style={styles.subtitle}>Daily habits for healthy vision</ThemedText>
      </ThemedView>

      <ThemedView style={styles.tipsContainer}>
        {tips.map((tip, index) => (
          <View key={index} style={styles.tipCard}>
            <ThemedText style={styles.tipTitle}>{tip.title}</ThemedText>
            <ThemedText style={styles.tipSummary}>{tip.summary}</ThemedText>
            <ThemedText style={styles.tipDetails}>{tip.details}</ThemedText>
          </View>
        ))}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F23',
  },
  header: {
    padding: 24,
    paddingTop: 60,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 16,
    padding: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: '#10B981',
    fontWeight: '600',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#9CA3AF',
    textAlign: 'center',
    fontWeight: '500',
  },
  tipsContainer: {
    padding: 24,
    gap: 20,
  },
  tipCard: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#374151',
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 12,
  },
  tipSummary: {
    fontSize: 16,
    color: '#10B981',
    marginBottom: 12,
    fontWeight: '500',
  },
  tipDetails: {
    fontSize: 14,
    color: '#9CA3AF',
    lineHeight: 20,
  },
});
