import { ThemedText } from '../components/ThemedText';
import { ThemedView } from '../components/ThemedView';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

interface NutritionInfo {
  title: string;
  summary: string;
  details: string;
  foods: string[];
  benefits: string;
}

export default function EyeNutritionScreen() {
  const nutritionInfo: NutritionInfo[] = [
    {
      title: 'Omega-3 Rich Foods',
      summary: 'Fish, walnuts, and flax seeds support retinal health.',
      details: 'DHA, an omega-3 fatty acid, is concentrated in the retina. Regular intake may reduce risk of dry eyes and macular degeneration.',
      foods: ['Salmon', 'Mackerel', 'Sardines', 'Walnuts', 'Flax seeds', 'Chia seeds', 'Tuna'],
      benefits: 'Supports retinal function, reduces inflammation, and may prevent dry eye syndrome.'
    },
    {
      title: 'Antioxidant Powerhouses',
      summary: 'Leafy greens, berries, and colorful vegetables protect against oxidative damage.',
      details: 'Lutein and zeaxanthin in spinach, kale, and corn act as natural sunglasses, filtering harmful blue light.',
      foods: ['Spinach', 'Kale', 'Collard greens', 'Corn', 'Blueberries', 'Carrots', 'Bell peppers'],
      benefits: 'Filters blue light, reduces risk of cataracts and macular degeneration, protects against oxidative stress.'
    },
    {
      title: 'Vitamin A Sources',
      summary: 'Carrots, sweet potatoes, and liver support night vision.',
      details: 'Vitamin A is essential for rhodopsin production, the protein that allows you to see in low light conditions.',
      foods: ['Carrots', 'Sweet potatoes', 'Liver', 'Egg yolks', 'Cantaloupe', 'Apricots', 'Mangoes'],
      benefits: 'Essential for night vision, prevents night blindness, maintains healthy cornea.'
    },
    {
      title: 'Vitamin C Rich Foods',
      summary: 'Citrus fruits and vegetables support blood vessel health in the eyes.',
      details: 'Vitamin C helps maintain healthy blood vessels in the retina and may reduce risk of cataracts.',
      foods: ['Oranges', 'Strawberries', 'Broccoli', 'Brussels sprouts', 'Kiwi', 'Papaya', 'Red peppers'],
      benefits: 'Supports blood vessel health, may reduce cataract risk, aids in collagen production.'
    },
    {
      title: 'Zinc Sources',
      summary: 'Nuts, seeds, and legumes help transport vitamin A to the retina.',
      details: 'Zinc helps transport vitamin A from the liver to the retina and supports overall eye health.',
      foods: ['Pumpkin seeds', 'Chickpeas', 'Cashews', 'Almonds', 'Quinoa', 'Dark chocolate', 'Oysters'],
      benefits: 'Helps vitamin A absorption, supports night vision, may slow age-related macular degeneration.'
    },
    {
      title: 'Vitamin E Foods',
      summary: 'Nuts and seeds provide vitamin E to protect eye cells from damage.',
      details: 'Vitamin E is a powerful antioxidant that helps protect eye cells from free radical damage.',
      foods: ['Almonds', 'Sunflower seeds', 'Hazelnuts', 'Avocado', 'Olive oil', 'Wheat germ', 'Spinach'],
      benefits: 'Protects cell membranes, may reduce risk of cataracts and age-related macular degeneration.'
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
        <ThemedText style={styles.title}>🥕 Eye Nutrition</ThemedText>
        <ThemedText style={styles.subtitle}>Foods that support eye health</ThemedText>
      </ThemedView>

      <ThemedView style={styles.nutritionContainer}>
        {nutritionInfo.map((nutrition, index) => (
          <View key={index} style={styles.nutritionCard}>
            <ThemedText style={styles.nutritionTitle}>{nutrition.title}</ThemedText>
            <ThemedText style={styles.nutritionSummary}>{nutrition.summary}</ThemedText>
            <ThemedText style={styles.nutritionDetails}>{nutrition.details}</ThemedText>
            
            <View style={styles.foodsContainer}>
              <ThemedText style={styles.foodsLabel}>Best Food Sources:</ThemedText>
              <View style={styles.foodsList}>
                {nutrition.foods.map((food, foodIndex) => (
                  <View key={foodIndex} style={styles.foodItem}>
                    <ThemedText style={styles.foodText}>• {food}</ThemedText>
                  </View>
                ))}
              </View>
            </View>
            
            <View style={styles.benefitsContainer}>
              <ThemedText style={styles.benefitsLabel}>Health Benefits:</ThemedText>
              <ThemedText style={styles.benefits}>{nutrition.benefits}</ThemedText>
            </View>
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
    color: '#EF4444',
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
  nutritionContainer: {
    padding: 24,
    gap: 20,
  },
  nutritionCard: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#374151',
  },
  nutritionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 12,
  },
  nutritionSummary: {
    fontSize: 16,
    color: '#EF4444',
    marginBottom: 12,
    fontWeight: '500',
  },
  nutritionDetails: {
    fontSize: 14,
    color: '#9CA3AF',
    lineHeight: 20,
    marginBottom: 16,
  },
  foodsContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#1F2937',
    borderRadius: 8,
  },
  foodsLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#EF4444',
    marginBottom: 8,
  },
  foodsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  foodItem: {
    marginBottom: 4,
    minWidth: '45%',
  },
  foodText: {
    fontSize: 13,
    color: '#D1D5DB',
  },
  benefitsContainer: {
    padding: 16,
    backgroundColor: '#0F1419',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#EF4444',
  },
  benefitsLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#EF4444',
    marginBottom: 8,
  },
  benefits: {
    fontSize: 13,
    color: '#D1D5DB',
    lineHeight: 18,
  },
});
