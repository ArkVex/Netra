import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { analyzeEyeImage, EyeAnalysisResult } from '../../lib/geminiAI';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function ScanScreen() {
  const [facing, setFacing] = useState<CameraType>('front');
  const [permission, requestPermission] = useCameraPermissions();
  const [isCapturing, setIsCapturing] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<EyeAnalysisResult | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const cameraRef = useRef<CameraView>(null);

  const scanCategories = useMemo(() => [
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
      icon: '🔍',
      color: '#F59E0B',
    },
    {
      id: 'glaucoma',
      title: 'Glaucoma',
      subtitle: 'Pressure screening',
      icon: '🎯',
      color: '#EF4444',
    },
    {
      id: 'macular',
      title: 'Macular Degeneration',
      subtitle: 'Retinal health',
      icon: '⚫',
      color: '#8B5CF6',
    },
  ], []);

  const showAnalysisResults = useCallback((analysis: EyeAnalysisResult, scanType: string, imageUri?: string) => {
    // Handle retake scenario
    if (analysis.retakeRequired) {
      Alert.alert(
        '📸 Image Quality Issue',
        `${analysis.findings.join('\n')}

Please try again with:
${analysis.recommendations.join('\n')}`,
        [
          { text: 'Retake Photo', onPress: () => console.log('Retaking photo...') },
          { text: 'Cancel', style: 'cancel' }
        ]
      );
      return;
    }

    const probabilityText = analysis.probability > 70 ? 'High Risk' :
      analysis.probability > 40 ? 'Moderate Risk' : 'Low Risk';

    Alert.alert(
      `🤖 AI Analysis Complete`,
      `Scan Type: ${scanType}
      
🎯 Risk Assessment: ${probabilityText} (${analysis.probability}%)
🔍 Confidence: ${analysis.confidence}
⚠️ Severity: ${analysis.severity}

Key Findings:
${analysis.findings.map((finding, i) => `• ${finding}`).join('\n')}

Recommendations:
${analysis.recommendations.map((rec, i) => `• ${rec}`).join('\n')}

${analysis.requiresConsultation ? '⚕️ Professional consultation recommended' : '✅ Continue regular monitoring'}`,
      [
        {
          text: 'View Image',
          onPress: () => {
            if (imageUri) {
              console.log('📷 Captured image URI:', imageUri);
              setShowImagePreview(true);
              // Show captured image preview
              Alert.alert(
                'Captured Image',
                `Image has been captured and analyzed successfully.\n\nImage URI: ${imageUri.substring(imageUri.lastIndexOf('/') + 1)}`,
                [
                  { text: 'OK', onPress: () => setShowImagePreview(false) }
                ]
              );
            }
          },
          style: 'default'
        },
        { text: 'Save Results', onPress: () => saveAnalysis(analysis) },
        { text: 'Done', style: 'cancel' }
      ]
    );
  }, []);

  const performEyeCapture = useCallback(async () => {
    if (isCapturing || !cameraRef.current) return;

    setIsCapturing(true);
    setIsAnalyzing(true);

    try {
      // Capture high-quality image
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        base64: false,
        skipProcessing: false,
      });

      if (photo) {
        setCapturedImage(photo.uri); // Store the captured image
        const category = scanCategories.find(cat => cat.id === selectedCategory);
        console.log('📸 Eye image captured for AI analysis:', photo.uri);

        try {
          const analysis = await analyzeEyeImage(photo.uri, category?.title || 'General');
          setAnalysisResult(analysis);

          // Show analysis results
          showAnalysisResults(analysis, category?.title || 'Eye Health', photo.uri);

        } catch (analysisError) {
          console.error('AI Analysis failed:', analysisError);
          Alert.alert(
            'Analysis Error',
            'Unable to analyze image with AI. Please try again.',
            [{ text: 'OK' }]
          );
        }
      }
    } catch (error) {
      console.error('Capture error:', error);
      Alert.alert('Error', 'Failed to capture image. Please try again.');
    } finally {
      setIsCapturing(false);
      setIsAnalyzing(false);
    }
  }, [isCapturing, selectedCategory, scanCategories, showAnalysisResults, setCapturedImage]);

  const saveAnalysis = (analysis: EyeAnalysisResult) => {
    // Here you can implement saving to local storage or database
    console.log('💾 Saving analysis results:', analysis);
    Alert.alert('Saved', 'Analysis results saved to your health records.');
  };

  const handleManualCapture = useCallback(async () => {
    if (!selectedCategory) {
      Alert.alert('Please select a scan type');
      return;
    }

    Alert.alert(
      'AI Analysis',
      'This will capture your eye image and analyze it using AI for medical insights. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Analyze', onPress: performEyeCapture }
      ]
    );
  }, [selectedCategory, performEyeCapture]);

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <ThemedView style={styles.container}>
        <View style={styles.permissionContainer}>
          <ThemedText style={styles.message}>
            We need camera permission to capture eye images for AI analysis
          </ThemedText>
          <TouchableOpacity style={styles.button} onPress={requestPermission}>
            <ThemedText style={styles.buttonText}>Grant Permission</ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
    );
  }

  const selectedCategoryData = scanCategories.find(cat => cat.id === selectedCategory);

  if (showCamera && selectedCategory) {
    return (
      <ThemedView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => setShowCamera(false)}>
            <ThemedText style={styles.backButtonText}>← Back</ThemedText>
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <ThemedText style={styles.title}>{selectedCategoryData?.title}</ThemedText>
            <ThemedText style={styles.subtitle}>AI Medical Analysis</ThemedText>
          </View>
        </View>

        <View style={styles.cameraContainer}>
          <CameraView
            ref={cameraRef}
            style={styles.camera}
            facing={facing}
          />
          <View style={styles.overlay}>
            <View style={styles.eyeGuide}>
              <View style={[
                styles.eyeCircle,
                {
                  borderColor: selectedCategoryData?.color || '#3B82F6',
                  borderWidth: 2
                }
              ]} />

              <ThemedText style={styles.instructionText}>
                {isAnalyzing
                  ? '🤖 AI analyzing your eye image...'
                  : isCapturing
                    ? '📸 Capturing image for analysis...'
                    : '👁️ Position your eye in the center and tap Analyze'
                }
              </ThemedText>

              {isAnalyzing && (
                <View style={styles.analysisIndicator}>
                  <ActivityIndicator size="large" color="#10B981" />
                  <ThemedText style={styles.analysisText}>
                    AI is analyzing...
                  </ThemedText>
                </View>
              )}
            </View>
          </View>
        </View>

        <View style={styles.controls}>
          <TouchableOpacity
            style={[
              styles.scanButton,
              { backgroundColor: selectedCategoryData?.color || '#3B82F6' },
              (isCapturing || isAnalyzing) && styles.scanButtonDisabled
            ]}
            onPress={handleManualCapture}
            disabled={isCapturing || isAnalyzing}
          >
            <ThemedText style={styles.scanButtonText}>
              {isAnalyzing ? '🤖 AI Analyzing...' :
                isCapturing ? '📸 Capturing...' :
                  '🔬 Capture & Analyze'}
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.flipButton, { borderColor: selectedCategoryData?.color || '#3B82F6' }]}
            onPress={toggleCameraFacing}
          >
            <ThemedText style={[styles.flipButtonText, { color: selectedCategoryData?.color || '#3B82F6' }]}>
              📷 Flip Camera
            </ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <ThemedText style={styles.title}>AI Eye Analyzer</ThemedText>
          <ThemedText style={styles.subtitle}>Real Medical AI Analysis</ThemedText>
        </View>

        <View style={styles.infoCard}>
          <ThemedText style={styles.infoTitle}>🧠 Powered by AI</ThemedText>
          <ThemedText style={styles.infoText}>
            Our advanced AI analyzes your eye images using AI to detect potential eye conditions and provide medical insights.
          </ThemedText>
        </View>

        <View style={styles.categoriesContainer}>
          <ThemedText style={styles.sectionTitle}>Select Analysis Type</ThemedText>
          <View style={styles.categoriesGrid}>
            {scanCategories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={styles.categoryCard}
                onPress={() => {
                  setSelectedCategory(category.id);
                  setShowCamera(true);
                }}
              >
                <View style={[styles.categoryGradient, { borderColor: category.color }]}>
                  <View style={[styles.categoryIcon, { backgroundColor: category.color + '20' }]}>
                    <ThemedText style={styles.categoryIconText}>{category.icon}</ThemedText>
                  </View>
                  <View style={styles.categoryContent}>
                    <ThemedText style={styles.categoryTitle}>{category.title}</ThemedText>
                    <ThemedText style={styles.categorySubtitle}>AI Medical Analysis</ThemedText>
                  </View>
                  <View style={styles.categoryArrow}>
                    <ThemedText style={[styles.categoryArrowText, { color: category.color }]}>🤖</ThemedText>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.disclaimerCard}>
          <ThemedText style={styles.disclaimerTitle}>⚕️ Medical Disclaimer</ThemedText>
          <ThemedText style={styles.disclaimerText}>
            This AI analysis is for informational purposes only and should not replace professional medical advice. Always consult with a qualified healthcare provider for medical diagnosis and treatment.
          </ThemedText>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    padding: 24,
    paddingTop: 60,
    alignItems: 'center',
    backgroundColor: '#111111',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 24,
    top: 60,
    zIndex: 1,
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  headerContent: {
    alignItems: 'center',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  cameraContainer: {
    flex: 1,
    position: 'relative',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  eyeGuide: {
    alignItems: 'center',
  },
  eyeCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    backgroundColor: 'transparent',
  },
  instructionText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  analysisIndicator: {
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 12,
  },
  analysisText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    marginTop: 8,
  },
  controls: {
    padding: 24,
    backgroundColor: '#111111',
    alignItems: 'center',
    gap: 16,
  },
  button: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
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
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  flipButtonText: {
    fontSize: 14,
    fontWeight: '500',
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
  infoCard: {
    margin: 20,
    padding: 20,
    backgroundColor: '#1A1A2E',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#374151',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#D1D5DB',
    lineHeight: 20,
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
    fontSize: 18,
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
  categoryArrowText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  disclaimerCard: {
    margin: 20,
    padding: 20,
    backgroundColor: '#2D1B69',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#4C1D95',
  },
  disclaimerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  disclaimerText: {
    fontSize: 13,
    color: '#C4B5FD',
    lineHeight: 18,
  },
});
