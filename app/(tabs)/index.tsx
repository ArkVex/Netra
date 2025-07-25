import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { useAuth } from '../../contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      // Go back to login screen
      router.replace('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Get user's display name or email
  const getUserName = () => {
    if (user?.displayName) {
      return user.displayName;
    } else if (user?.email) {
      // Extract name from email (before @ symbol)
      return user.email.split('@')[0];
    }
    return 'User';
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <View>
          <ThemedText type="title" style={[styles.title, { fontSize: 46, fontWeight: 'bold' }]}>Netra</ThemedText>
          <ThemedText style={[styles.subtitle, { fontSize: 18, fontWeight: 'bold' }]}>Eye Health Scanner</ThemedText>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="#EF4444" />
        </TouchableOpacity>
      </View>

      <ThemedView style={styles.welcomeCard}>
        <ThemedText style={styles.welcomeText}>Welcome back, {getUserName()}</ThemedText>
        <ThemedText style={styles.welcomeSubtext}>
          Ready to scan your eyes?
        </ThemedText>
        {user?.email && (
          <ThemedText style={styles.userEmail}>{user.email}</ThemedText>
        )}
      </ThemedView>

      <View style={styles.actionSection}>
        <TouchableOpacity 
          style={styles.scanButton}
          onPress={() => router.push('/scan_gemini')}
        >
          <View style={styles.scanIcon}>
            <ThemedText style={styles.scanIconText}>👁️</ThemedText>
          </View>
          <View style={styles.scanTextContainer}>
            <ThemedText style={styles.scanTitle}>Start Eye Scan</ThemedText>
            <ThemedText style={styles.scanDescription}>AI-powered eye health assessment</ThemedText>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#2563EB" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.exploreButton}
          onPress={() => router.push('/(tabs)/explore')}
        >
          <View style={styles.exploreIcon}>
            <ThemedText style={styles.exploreIconText}>📊</ThemedText>
          </View>
          <View style={styles.exploreTextContainer}>
            <ThemedText style={styles.exploreTitle}>View History</ThemedText>
            <ThemedText style={styles.exploreDescription}>Check your previous scans</ThemedText>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#10B981" />
        </TouchableOpacity>
      </View>

      <ThemedView style={styles.infoCard}>
        <ThemedText style={styles.infoTitle}>About Eye Scanning</ThemedText>
        <ThemedText style={styles.infoText}>
          Our AI-powered eye scanner helps detect potential eye health issues early. 
          Regular scanning can help maintain healthy vision.
        </ThemedText>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F23',
  },
  contentContainer: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 2,
  },
  logoutButton: {
    padding: 8,
    backgroundColor: '#1A1A2E',
    borderRadius: 8,
  },
  welcomeCard: {
    margin: 20,
    padding: 24,
    backgroundColor: '#1A1A2E',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#374151',
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  welcomeSubtext: {
    fontSize: 16,
    color: '#9CA3AF',
  },
  userEmail: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 8,
    fontStyle: 'italic',
  },
  actionSection: {
    paddingHorizontal: 20,
    gap: 16,
  },
  scanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A2E',
    padding: 20,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#2563EB',
  },
  scanIcon: {
    width: 50,
    height: 50,
    backgroundColor: '#2563EB15',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  scanIconText: {
    fontSize: 24,
  },
  scanTextContainer: {
    flex: 1,
  },
  scanTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  scanDescription: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  exploreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A2E',
    padding: 20,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#10B981',
  },
  exploreIcon: {
    width: 50,
    height: 50,
    backgroundColor: '#10B98115',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  exploreIconText: {
    fontSize: 24,
  },
  exploreTextContainer: {
    flex: 1,
  },
  exploreTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  exploreDescription: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  infoCard: {
    margin: 20,
    padding: 20,
    backgroundColor: '#16213E',
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
});
