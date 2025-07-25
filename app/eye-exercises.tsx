import { ThemedText } from '../components/ThemedText';
import { ThemedView } from '../components/ThemedView';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

interface Exercise {
  title: string;
  summary: string;
  details: string;
  instructions: string;
}

export default function EyeExercisesScreen() {
  const exercises: Exercise[] = [
    {
      title: 'Focus Shifting',
      summary: 'Hold a finger 10 inches away, focus on it, then shift to something 20 feet away.',
      details: 'Repeat 10 times. This exercise helps improve focus flexibility and reduces eye strain from prolonged near work.',
      instructions: '1. Hold your finger 10 inches from your face\n2. Focus on your finger for 3 seconds\n3. Shift focus to an object 20 feet away\n4. Focus on the distant object for 3 seconds\n5. Return focus to your finger\n6. Repeat 10 times'
    },
    {
      title: 'Palming',
      summary: 'Cover closed eyes with palms for 30 seconds to relax eye muscles.',
      details: 'This relaxation technique helps reduce eye fatigue and can be done anywhere, anytime you feel eye strain.',
      instructions: '1. Sit comfortably and close your eyes\n2. Place your palms gently over your closed eyes\n3. Ensure no light enters through your fingers\n4. Relax and breathe deeply for 30 seconds\n5. Remove hands slowly and open eyes'
    },
    {
      title: 'Figure Eight',
      summary: 'Trace imaginary figure eights with your eyes to improve eye movement.',
      details: 'Trace slowly for 30 seconds clockwise, then counterclockwise. This improves eye muscle coordination.',
      instructions: '1. Sit with your back straight\n2. Look straight ahead\n3. Slowly trace a large figure 8 with your eyes\n4. Complete 5 clockwise figure 8s\n5. Rest for 5 seconds\n6. Complete 5 counterclockwise figure 8s'
    },
    {
      title: 'Eye Rolling',
      summary: 'Gentle circular eye movements to relax eye muscles.',
      details: 'Helps improve blood circulation around the eyes and relieves tension from the eye muscles.',
      instructions: '1. Close your eyes gently\n2. Roll your eyes in a circular motion clockwise\n3. Complete 5 slow rotations\n4. Rest for 3 seconds\n5. Roll eyes counterclockwise 5 times\n6. Keep movements slow and controlled'
    },
    {
      title: 'Blinking Exercise',
      summary: 'Rapid blinking followed by gentle eye closure to lubricate eyes.',
      details: 'Helps combat dry eyes and refreshes the tear film across your cornea.',
      instructions: '1. Blink rapidly for 10 seconds\n2. Close your eyes gently for 5 seconds\n3. Open eyes and look around normally\n4. Repeat the cycle 3 times\n5. Focus on complete, gentle blinks'
    },
    {
      title: 'Near and Far Focus',
      summary: 'Alternate focusing between near and far objects to exercise focusing muscles.',
      details: 'Strengthens the ciliary muscles responsible for changing the shape of your lens for focusing.',
      instructions: '1. Hold a pen 6 inches from your nose\n2. Focus on the pen tip for 5 seconds\n3. Look at an object across the room\n4. Focus on the distant object for 5 seconds\n5. Return to the pen\n6. Repeat 10 times'
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
        <ThemedText style={styles.title}>👀 Eye Exercises</ThemedText>
        <ThemedText style={styles.subtitle}>Simple exercises to maintain eye health</ThemedText>
      </ThemedView>

      <ThemedView style={styles.exercisesContainer}>
        {exercises.map((exercise, index) => (
          <View key={index} style={styles.exerciseCard}>
            <ThemedText style={styles.exerciseTitle}>{exercise.title}</ThemedText>
            <ThemedText style={styles.exerciseSummary}>{exercise.summary}</ThemedText>
            <ThemedText style={styles.exerciseDetails}>{exercise.details}</ThemedText>
            <View style={styles.instructionsContainer}>
              <ThemedText style={styles.instructionsLabel}>Instructions:</ThemedText>
              <ThemedText style={styles.instructions}>{exercise.instructions}</ThemedText>
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
    color: '#F59E0B',
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
  exercisesContainer: {
    padding: 24,
    gap: 20,
  },
  exerciseCard: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#374151',
  },
  exerciseTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 12,
  },
  exerciseSummary: {
    fontSize: 16,
    color: '#F59E0B',
    marginBottom: 12,
    fontWeight: '500',
  },
  exerciseDetails: {
    fontSize: 14,
    color: '#9CA3AF',
    lineHeight: 20,
    marginBottom: 16,
  },
  instructionsContainer: {
    marginTop: 8,
    padding: 16,
    backgroundColor: '#1F2937',
    borderRadius: 8,
  },
  instructionsLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#F59E0B',
    marginBottom: 8,
  },
  instructions: {
    fontSize: 13,
    color: '#D1D5DB',
    lineHeight: 18,
  },
});
