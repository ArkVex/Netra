import { ThemedText } from '../components/ThemedText';
import { ThemedView } from '../components/ThemedView';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

interface Article {
  title: string;
  summary: string;
  details: string;
}

export default function HealthArticlesScreen() {
  const articles: Article[] = [
    {
      title: 'Understanding Digital Eye Strain',
      summary: 'Learn about symptoms and prevention of computer vision syndrome.',
      details: 'Digital eye strain affects 70% of adults who spend 2+ hours on screens daily. Symptoms include dry eyes, headaches, and blurred vision. The condition is also known as Computer Vision Syndrome (CVS) and can be managed through proper screen habits, regular breaks, and appropriate lighting.'
    },
    {
      title: 'Age-Related Macular Degeneration',
      summary: 'Early detection and management strategies for AMD.',
      details: 'AMD is the leading cause of vision loss in adults over 50. Regular eye exams can detect early changes before symptoms appear. There are two types: dry AMD (more common, progresses slowly) and wet AMD (less common, progresses rapidly). Risk factors include age, genetics, smoking, and UV exposure.'
    },
    {
      title: 'Diabetic Retinopathy Prevention',
      summary: 'How diabetes affects your eyes and prevention tips.',
      details: 'Diabetic retinopathy can cause permanent vision loss. Annual dilated eye exams are crucial for early detection and treatment. High blood sugar damages blood vessels in the retina. Prevention includes maintaining good blood sugar control, blood pressure management, and regular exercise.'
    },
    {
      title: 'Glaucoma: The Silent Thief of Sight',
      summary: 'Understanding the importance of early glaucoma detection.',
      details: 'Glaucoma often has no early symptoms, earning it the nickname "silent thief of sight." It gradually damages the optic nerve, usually due to increased eye pressure. Regular comprehensive eye exams are essential, especially for those over 40 or with family history.'
    },
    {
      title: 'Cataracts: Causes and Treatment',
      summary: 'Learn about cataract development and modern treatment options.',
      details: 'Cataracts are a natural part of aging, causing the eye\'s lens to become cloudy. Symptoms include blurred vision, sensitivity to light, and difficulty seeing at night. Modern cataract surgery is highly successful, with over 95% success rate in improving vision.'
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
        <ThemedText style={styles.title}>📚 Health Articles</ThemedText>
        <ThemedText style={styles.subtitle}>Evidence-based eye health information</ThemedText>
      </ThemedView>

      <ThemedView style={styles.articlesContainer}>
        {articles.map((article, index) => (
          <View key={index} style={styles.articleCard}>
            <ThemedText style={styles.articleTitle}>{article.title}</ThemedText>
            <ThemedText style={styles.articleSummary}>{article.summary}</ThemedText>
            <ThemedText style={styles.articleDetails}>{article.details}</ThemedText>
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
    color: '#3B82F6',
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
  articlesContainer: {
    padding: 24,
    gap: 20,
  },
  articleCard: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#374151',
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 12,
  },
  articleSummary: {
    fontSize: 16,
    color: '#3B82F6',
    marginBottom: 12,
    fontWeight: '500',
  },
  articleDetails: {
    fontSize: 14,
    color: '#9CA3AF',
    lineHeight: 20,
  },
});
