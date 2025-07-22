import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import React, { useRef, useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function ScanScreen() {
  const [facing, setFacing] = useState<CameraType>('front');
  const [permission, requestPermission] = useCameraPermissions();
  const [isScanning, setIsScanning] = useState(false);
  const cameraRef = useRef<CameraView>(null);

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

  const performEyeScan = async () => {
    if (isScanning) return;
    
    setIsScanning(true);
    try {
      // Simulate eye scanning process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock results - in a real app, this would use ML/AI processing
      const mockResults = [
        'Visual acuity: Normal',
        'No signs of cataracts detected',
        'Pupil response: Normal',
        'Color vision: Good'
      ];
      
      Alert.alert(
        'Scan Complete',
        mockResults.join('\n'),
        [{ text: 'OK' }]
      );
    } catch {
      Alert.alert('Error', 'Scan failed. Please try again.');
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.title}>Netra Eye Scanner</ThemedText>
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
              <View style={styles.eyeCircle} />
              <ThemedText style={styles.instructionText}>
                {isScanning ? 'Scanning...' : 'Keep your eye steady'}
              </ThemedText>
            </View>
          </View>
        </CameraView>
      </View>

      <ThemedView style={styles.controls}>
        <TouchableOpacity
          style={[styles.scanButton, isScanning && styles.scanButtonDisabled]}
          onPress={performEyeScan}
          disabled={isScanning}
        >
          <ThemedText style={styles.scanButtonText}>
            {isScanning ? 'Scanning...' : 'Start Scan'}
          </ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.flipButton}
          onPress={() => setFacing(current => (current === 'back' ? 'front' : 'back'))}
        >
          <ThemedText style={styles.flipButtonText}>Flip Camera</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00bcd4',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
    fontSize: 18,
  },
  cameraContainer: {
    flex: 1,
    margin: 20,
    borderRadius: 20,
    overflow: 'hidden',
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
    borderColor: '#00bcd4',
    borderStyle: 'dashed',
    backgroundColor: 'rgba(0, 188, 212, 0.1)',
  },
  instructionText: {
    color: '#ffffff',
    fontSize: 18,
    marginTop: 20,
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  controls: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  button: {
    backgroundColor: '#00bcd4',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  scanButton: {
    backgroundColor: '#00bcd4',
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 30,
    marginBottom: 15,
    minWidth: 200,
  },
  scanButtonDisabled: {
    backgroundColor: '#666666',
  },
  scanButtonText: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  flipButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#00bcd4',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  flipButtonText: {
    color: '#00bcd4',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
