import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../contexts/AuthContext.simple';

export default function LandingScreen() {
  const { user, loading } = useAuth();

  console.log('Index.tsx - Auth state:', { user: !!user, loading }); // Debug log

  useEffect(() => {
    console.log('Index.tsx - useEffect triggered:', { user: !!user, loading }); // Debug log
    if (!loading && user) {
      console.log('Index.tsx - Navigating to tabs'); // Debug log
      router.replace('/(tabs)');
    }
  }, [user, loading]);

  const handleSkipAuth = () => {
    // For development: skip auth and go directly to app
    router.replace('/(tabs)');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <View style={styles.logoContainer}>
          <Ionicons name="eye" size={60} color="#3B82F6" />
          <Text style={styles.logoText}>Netra</Text>
          <Text style={styles.tagline}>AI-Powered Eye Health</Text>
        </View>
        <ActivityIndicator size="large" color="#3B82F6" style={styles.loadingIndicator} />
        <Text style={styles.loadingText}>Initializing...</Text>
        
        {/* Skip button for development */}
        <TouchableOpacity style={styles.skipButton} onPress={handleSkipAuth}>
          <Text style={styles.skipButtonText}>Skip for now (Dev)</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Ionicons name="eye" size={60} color="#3B82F6" />
          <Text style={styles.logoText}>Netra</Text>
          <Text style={styles.tagline}>AI-Powered Eye Health</Text>
        </View>

        <View style={styles.featuresContainer}>
          <Text style={styles.featuresTitle}>Comprehensive Eye Care</Text>
          <View style={styles.feature}>
            <Ionicons name="checkmark-circle" size={20} color="#10B981" />
            <Text style={styles.featureText}>AI-powered diagnostics</Text>
          </View>
          <View style={styles.feature}>
            <Ionicons name="checkmark-circle" size={20} color="#10B981" />
            <Text style={styles.featureText}>Real-time health monitoring</Text>
          </View>
          <View style={styles.feature}>
            <Ionicons name="checkmark-circle" size={20} color="#10B981" />
            <Text style={styles.featureText}>Personalized recommendations</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.signupButton}
            onPress={() => router.push('/signup')}
          >
            <Text style={styles.signupButtonText}>Get Started</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => router.push('/login')}
          >
            <Text style={styles.loginButtonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F23',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logoText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 16,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 18,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  featuresContainer: {
    marginBottom: 48,
  },
  featuresTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
    marginBottom: 24,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 24,
  },
  featureText: {
    fontSize: 16,
    color: '#9CA3AF',
    marginLeft: 12,
  },
  buttonContainer: {
    gap: 16,
  },
  signupButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#374151',
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#9CA3AF',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#0F0F23',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  loadingIndicator: {
    marginVertical: 24,
  },
  loadingText: {
    color: '#9CA3AF',
    fontSize: 16,
    fontWeight: '500',
  },
  skipButton: {
    marginTop: 24,
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#374151',
    borderRadius: 8,
  },
  skipButtonText: {
    color: '#9CA3AF',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
});
