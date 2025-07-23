import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import React, { useRef, useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity, View, ScrollView, Animated, Text } from 'react-native';

export default function ScanScreen() {
  const [facing, setFacing] = useState<CameraType>('front');
  const [permission, requestPermission] = useCameraPermissions();
  const [isScanning, setIsScanning] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const cameraRef = useRef<CameraView>(null);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const scanCategories = [
    {
      id: 'refractory',
      title: 'Refractory Error',
      subtitle: 'Vision screening',
      icon: '👓',
      color: '#3B82F6',
    },
    {
      id: 'squint',
      title: 'Squint/Strabismus',
      subtitle: 'Eye alignment',
      icon: '👀',
      color: '#10B981',
    },
    {
      id: 'cataract',
      title: 'Cataract',
      subtitle: 'Lens opacity',
      icon: '☁️',
      color: '#3B82F6',
    },
    {
      id: 'other',
      title: 'Other Conditions',
      subtitle: 'General screening',
      icon: '🔍',
      color: '#9CA3AF',
    },
  ];

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText style={styles.message}>Camera permission required for eye scanning</ThemedText>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <ThemedText style={styles.buttonText}>Grant Permission</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    );
  }

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    
    // Animate selection
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    // Navigate to camera after brief delay
    setTimeout(() => {
      setShowCamera(true);
    }, 300);
  };

  const performEyeScan = async () => {
    if (isScanning) return;
    
    setIsScanning(true);
    try {
      // Simulate eye scanning process based on selected category
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock results based on category
      const category = scanCategories.find(cat => cat.id === selectedCategory);
      const mockResults = generateMockResults(selectedCategory || '');
      
      Alert.alert(
        `${category?.title} Scan Complete`,
        mockResults.join('\n'),
        [
          { text: 'Scan Again', onPress: () => setShowCamera(false) },
          { text: 'OK', onPress: () => setShowCamera(false) }
        ]
      );
    } catch {
      Alert.alert('Error', 'Scan failed. Please try again.');
    } finally {
      setIsScanning(false);
    }
  };

  const generateMockResults = (categoryId: string): string[] => {
    switch (categoryId) {
      case 'refractory':
        return [
          'Visual acuity: 20/20 (Normal)',
          'No significant refractive error detected',
          'Recommendation: Continue regular check-ups'
        ];
      case 'squint':
        return [
          'Eye alignment: Normal',
          'No strabismus detected',
          'Binocular vision: Good'
        ];
      case 'nystagmus':
        return [
          'Eye movement: Stable',
          'No involuntary movements detected',
          'Fixation: Normal'
        ];
      case 'cataract':
        return [
          'Lens clarity: Normal',
          'No opacity detected',
          'Visual clarity: Good'
        ];
      case 'amblyopia':
        return [
          'Binocular vision: Balanced',
          'No lazy eye detected',
          'Visual development: Normal'
        ];
      case 'other':
        return [
          'External eye: Normal appearance',
          'No signs of inflammation',
          'Conjunctiva: Clear',
          'Eyelids: Normal position',
          'Overall eye health: Good'
        ];
      default:
        return ['Scan completed successfully'];
    }
  };

  // Show category selection screen
  if (!showCamera) {
    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <ThemedView style={styles.header}>
          <ThemedText type="title" style={styles.title}>Netra Eye Scanner</ThemedText>
          <ThemedText style={styles.subtitle}>Select screening category</ThemedText>
        </ThemedView>

        <ThemedView style={styles.categoriesContainer}>
          <ThemedText style={styles.sectionTitle}>Comprehensive Eye Health Screening</ThemedText>
          
          <View style={styles.categoriesGrid}>
            {scanCategories.map((category) => (
              <Animated.View 
                key={category.id} 
                style={[
                  styles.categoryCard,
                  { transform: [{ scale: selectedCategory === category.id ? scaleAnim : 1 }] }
                ]}
              >
                <TouchableOpacity
                  onPress={() => handleCategorySelect(category.id)}
                  activeOpacity={0.8}
                  style={styles.categoryGradient}
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
              </Animated.View>
            ))}
          </View>

          <ThemedView style={styles.infoSection}>
            <ThemedText style={[styles.infoIcon, { color: '#10B981' }]}>✓</ThemedText>
            <ThemedText style={styles.infoText}>
              Select the appropriate screening category for accurate diagnosis. Each test is designed for specific eye conditions.
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </ScrollView>
    );
  }

  // Show camera interface
  const selectedCategoryData = scanCategories.find(cat => cat.id === selectedCategory);
  
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => setShowCamera(false)}
        >
          <ThemedText style={styles.backButtonText}>← Back</ThemedText>
        </TouchableOpacity>
        <ThemedText type="title" style={styles.title}>
          {selectedCategoryData?.title} Scan
        </ThemedText>
        <ThemedText style={styles.subtitle}>Position your eye in the center circle</ThemedText>
      </ThemedView>

      <View style={styles.cameraContainer}>
        <CameraView
          style={styles.camera}
          facing={facing}
          ref={cameraRef}
        >
          <View style={styles.overlay}>
            <View style={styles.eyeGuide}>
              <View style={[styles.eyeCircle, { borderColor: selectedCategoryData?.color || '#3B82F6' }]} />
              <ThemedText style={styles.instructionText}>
                {isScanning ? `Scanning for ${selectedCategoryData?.title}...` : 'Keep your eye steady'}
              </ThemedText>
            </View>
          </View>
        </CameraView>
      </View>

      <ThemedView style={styles.controls}>
        <TouchableOpacity
          style={[
            styles.scanButton, 
            { backgroundColor: selectedCategoryData?.color || '#3B82F6' },
            isScanning && styles.scanButtonDisabled
          ]}
          onPress={performEyeScan}
          disabled={isScanning}
        >
          <ThemedText style={styles.scanButtonText}>
            {isScanning ? 'Scanning...' : `Start ${selectedCategoryData?.title} Scan`}
          </ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.flipButton, { borderColor: selectedCategoryData?.color || '#3B82F6' }]}
          onPress={() => setFacing(current => (current === 'back' ? 'front' : 'back'))}
        >
          <ThemedText style={[styles.flipButtonText, { color: selectedCategoryData?.color || '#3B82F6' }]}>
            🔄 Flip Camera
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
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
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 24,
    top: 65,
    padding: 12,
    backgroundColor: 'transparent',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#374151',
  },
  backButtonText: {
    color: '#9CA3AF',
    fontSize: 16,
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
  message: {
    textAlign: 'center',
    paddingBottom: 10,
    fontSize: 18,
    color: 'white',
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
    borderRadius: 12,
    overflow: 'hidden',
  },
  categoryGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 12,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#374151',
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
  categoryDescription: {
    fontSize: 13,
    color: '#9CA3AF',
    lineHeight: 18,
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
  cameraContainer: {
    flex: 1,
    margin: 24,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#000000',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  eyeGuide: {
    alignItems: 'center',
  },
  eyeCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderStyle: 'dashed',
    backgroundColor: 'transparent',
  },
  instructionText: {
    color: 'white',
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
    backgroundColor: 'rgba(15, 15, 35, 0.8)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    fontWeight: '600',
    borderWidth: 1,
    borderColor: '#374151',
  },
  controls: {
    padding: 24,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  button: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  scanButton: {
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    marginBottom: 16,
    minWidth: 200,
  },
  scanButtonDisabled: {
    opacity: 0.7,
  },
  scanButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  flipButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  flipButtonText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});
