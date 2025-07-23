import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';

interface Category {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  route: string;
}

export default function ExploreScreen() {
  const handleCategoryPress = (route: string) => {
    router.push(route as any);
  };

  const categories: Category[] = [
    {
      id: 'articles',
      title: 'Health Articles',
      subtitle: 'Evidence-based eye health information',
      icon: '📚',
      color: '#3B82F6',
      route: '/health-articles'
    },
    {
      id: 'tips',
      title: 'Eye Care Tips',
      subtitle: 'Daily habits for healthy vision',
      icon: '💡',
      color: '#10B981',
      route: '/eye-care-tips'
    },
    {
      id: 'exercises',
      title: 'Eye Exercises',
      subtitle: 'Simple exercises to maintain eye health',
      icon: '👀',
      color: '#F59E0B',
      route: '/eye-exercises'
    },
    {
      id: 'nutrition',
      title: 'Eye Nutrition',
      subtitle: 'Foods that support eye health',
      icon: '🥕',
      color: '#EF4444',
      route: '/eye-nutrition'
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.title}>Explore</ThemedText>
        <ThemedText style={styles.subtitle}>Discover eye health resources</ThemedText>
      </ThemedView>

      <ThemedView style={styles.categoriesContainer}>
        <ThemedText style={styles.sectionTitle}>Health Resources</ThemedText>
        
        <View style={styles.categoriesGrid}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[styles.categoryCard, { borderColor: `${category.color}40` }]}
              activeOpacity={0.8}
              onPress={() => handleCategoryPress(category.route)}
            >
              <View style={[styles.categoryIcon, { backgroundColor: `${category.color}20` }]}>
                <ThemedText style={styles.categoryIconText}>{category.icon}</ThemedText>
              </View>
              
              <View style={styles.categoryContent}>
                <ThemedText style={styles.categoryTitle}>{category.title}</ThemedText>
                <ThemedText style={styles.categorySubtitle}>{category.subtitle}</ThemedText>
              </View>
              
              <View style={styles.categoryArrow}>
                <ThemedText style={[styles.arrowText, { color: category.color }]}>→</ThemedText>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <ThemedView style={styles.infoSection}>
          <ThemedText style={[styles.infoIcon, { color: '#10B981' }]}>ℹ️</ThemedText>
          <ThemedText style={styles.infoText}>
            Explore evidence-based eye health information and tips to maintain optimal vision.
          </ThemedText>
        </ThemedView>
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
  categoriesContainer: {
    padding: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  categoriesGrid: {
    gap: 16,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 12,
    backgroundColor: 'transparent',
    borderWidth: 1,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  categoryIconText: {
    fontSize: 24,
    textAlign: 'center',
  },
  categoryContent: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginBottom: 4,
  },
  categorySubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  categoryArrow: {
    marginLeft: 12,
  },
  arrowText: {
    fontSize: 18,
    fontWeight: '600',
  },
  infoSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#374151',
  },
  infoIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#9CA3AF',
    flex: 1,
    lineHeight: 20,
  },
});