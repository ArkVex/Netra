import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';

interface QuickActionProps {
  icon: any;
  title: string;
  description: string;
  onPress: () => void;
  color: string;
}

const QuickAction: React.FC<QuickActionProps> = ({ icon, title, description, onPress, color }) => {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={[styles.actionCard, { transform: [{ scale: scaleAnim }], borderColor: `${color}40` }]}>
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        activeOpacity={1}
      >
        <LinearGradient
          colors={[`${color}15`, `${color}05`]}
          style={styles.actionGradient}
        >
          <View style={[styles.iconContainer, { backgroundColor: `${color}25` }]}>
            <ThemedText style={[styles.iconText, { color }]}>{icon}</ThemedText>
          </View>
          <View style={styles.actionTextContainer}>
            <ThemedText style={styles.actionTitle}>{title}</ThemedText>
            <ThemedText style={styles.actionDescription}>{description}</ThemedText>
          </View>
          <View style={styles.actionArrow}>
            <ThemedText style={[styles.arrowText, { color }]}>→</ThemedText>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default function HomeScreen() {
  const router = useRouter();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const titleScaleAnim = React.useRef(new Animated.Value(0.95)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(titleScaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, titleScaleAnim]);

  const quickActions = [
    {
      icon: '📱',
      title: 'Eye Scan',
      description: 'Start a new eye health assessment',
      onPress: () => router.push('/(tabs)/scan'),
      color: '#00bcd4'
    },
    {
      icon: '📊',
      title: 'Dashboard',
      description: 'View your health analytics',
      onPress: () => router.push('/(tabs)/dashboard'),
      color: '#4CAF50'
    },
    {
      icon: '📋',
      title: 'History',
      description: 'Review past scan results',
      onPress: () => router.push('/(tabs)/explore'),
      color: '#FF9800'
    }
  ];

  return (
    <Animated.ScrollView
      style={[styles.container, { opacity: fadeAnim }]}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <ThemedView style={styles.header}>
        <Animated.View style={{ transform: [{ scale: titleScaleAnim }] }}>
          <ThemedText type="title" style={styles.welcomeTitle}>Welcome to Netra</ThemedText>
        </Animated.View>
        <ThemedText style={styles.welcomeSubtitle}>Your personal eye health companion</ThemedText>
      </ThemedView>

      <ThemedView style={styles.heroSection}>
        <LinearGradient
          colors={['#00bcd440', '#00bcd420', '#00bcd405']}
          style={styles.heroGradient}
        >
          <View style={styles.heroIconContainer}>
            <View style={styles.heroIconBackground}>
              <ThemedText style={styles.heroMainIcon}>👁️</ThemedText>
            </View>
            <View style={styles.heroIconAccent}>
              <ThemedText style={styles.heroAccentIcon}>✨</ThemedText>
            </View>
          </View>
          <Animated.View style={{ transform: [{ scale: titleScaleAnim }] }}>
            <ThemedText style={styles.heroTitle}>Advanced Eye Health Monitoring</ThemedText>
          </Animated.View>
          <ThemedText style={styles.heroDescription}>
            Use cutting-edge camera technology to assess your eye health from the comfort of your home.
            Get instant feedback and track your progress over time.
          </ThemedText>
          <View style={styles.heroStats}>
            <View style={styles.heroStat}>
              <ThemedText style={styles.heroStatIcon}>✅</ThemedText>
              <ThemedText style={styles.heroStatText}>AI-Powered</ThemedText>
            </View>
            <View style={styles.heroStat}>
              <ThemedText style={styles.heroStatIcon}>🛡️</ThemedText>
              <ThemedText style={styles.heroStatText}>Secure</ThemedText>
            </View>
            <View style={styles.heroStat}>
              <ThemedText style={styles.heroStatIcon}>⚡</ThemedText>
              <ThemedText style={styles.heroStatText}>Real-time</ThemedText>
            </View>
          </View>
        </LinearGradient>
      </ThemedView>

      <ThemedView style={styles.actionsSection}>
        <Animated.View style={{ transform: [{ scale: titleScaleAnim }] }}>
          <ThemedText style={styles.sectionTitle}>Quick Actions</ThemedText>
        </Animated.View>
        <View style={styles.actionsGrid}>
          {quickActions.map((action, index) => (
            <QuickAction key={index} {...action} />
          ))}
        </View>
      </ThemedView>

      <ThemedView style={styles.featuresSection}>
        <Animated.View style={{ transform: [{ scale: titleScaleAnim }] }}>
          <ThemedText style={styles.sectionTitle}>Why Choose Netra?</ThemedText>
        </Animated.View>
        <View style={styles.featuresGrid}>
          <View style={styles.featureCard}>
            <View style={[styles.featureIcon, { backgroundColor: 'rgba(255, 105, 180, 0.25)' }]}>
              <View style={styles.brainIcon}>
                <View style={styles.brainShape}></View>
              </View>
            </View>
            <ThemedText style={styles.featureTitle}>AI Analysis</ThemedText>
            <ThemedText style={styles.featureDescription}>
              Advanced machine learning algorithms analyze your eye health patterns
            </ThemedText>
          </View>
          
          <View style={styles.featureCard}>
            <View style={[styles.featureIcon, { backgroundColor: 'rgba(255, 152, 0, 0.25)' }]}>
              <View style={styles.bellIcon}>
                <View style={styles.bellBody}></View>
                <View style={styles.bellDot}></View>
              </View>
            </View>
            <ThemedText style={styles.featureTitle}>Smart Alerts</ThemedText>
            <ThemedText style={styles.featureDescription}>
              Get notified about important changes or recommended actions
            </ThemedText>
          </View>
        </View>
      </ThemedView>

      <ThemedView style={styles.infoSection}>
        <Animated.View style={{ transform: [{ scale: titleScaleAnim }] }}>
          <ThemedText style={styles.sectionTitle}>Health Tips</ThemedText>
        </Animated.View>
        <View style={styles.tipCard}>
          <ThemedText style={styles.tipIcon}>💡</ThemedText>
          <View style={styles.tipContent}>
            <ThemedText style={styles.tipTitle}>Daily Eye Care</ThemedText>
            <ThemedText style={styles.tipText}>
              Take regular breaks from screen time using the 20-20-20 rule: Every 20 minutes, look at something 20 feet away for 20 seconds.
            </ThemedText>
          </View>
        </View>
      </ThemedView>

      <ThemedView style={styles.disclaimerSection}>
        <ThemedText style={styles.warningIcon}>⚠️</ThemedText>
        <ThemedText style={styles.disclaimerText}>
          This app is for educational purposes only. Always consult healthcare professionals for medical concerns.
        </ThemedText>
      </ThemedView>
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    padding: 24,
    paddingTop: 64,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  welcomeTitle: {
    fontSize: 36,
    fontWeight: '800',
    color: '#00d4ff',
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: 1,
    fontFamily: 'System', // Use system font for consistency, can be replaced with a custom font
    textShadowColor: 'rgba(0, 212, 255, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#b0b0b0',
    textAlign: 'center',
    fontWeight: '400',
    fontFamily: 'System',
  },
  heroSection: {
    marginHorizontal: 16,
    marginVertical: 16,
    borderRadius: 24,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  heroGradient: {
    padding: 28,
    alignItems: 'center',
    borderRadius: 24,
  },
  heroIconContainer: {
    position: 'relative',
    marginBottom: 24,
  },
  heroIconBackground: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(0, 188, 212, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(0, 188, 212, 0.5)',
  },
  heroIconAccent: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: 'rgba(255, 215, 0, 0.3)',
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.5)',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: 0.8,
    fontFamily: 'System',
    textShadowColor: 'rgba(255, 255, 255, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  heroDescription: {
    fontSize: 15,
    color: '#b0b0b0',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
    paddingHorizontal: 12,
    fontFamily: 'System',
  },
  heroStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 12,
    borderRadius: 12,
  },
  heroStat: {
    alignItems: 'center',
    flex: 1,
  },
  heroStatText: {
    fontSize: 13,
    color: '#b0b0b0',
    marginTop: 6,
    fontWeight: '600',
    fontFamily: 'System',
  },
  actionsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 20,
    paddingLeft: 4,
    letterSpacing: 0.8,
    fontFamily: 'System',
    textShadowColor: 'rgba(255, 255, 255, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  actionsGrid: {
    gap: 16,
  },
  actionCard: {
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  actionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    borderRadius: 20,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  actionTextContainer: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 6,
    fontFamily: 'System',
  },
  actionDescription: {
    fontSize: 13,
    color: '#b0b0b0',
    lineHeight: 18,
    fontFamily: 'System',
  },
  actionArrow: {
    marginLeft: 12,
    opacity: 0.7,
  },
  iconText: {
    fontSize: 30,
    textAlign: 'center',
  },
  arrowText: {
    fontSize: 18,
    fontWeight: '700',
  },
  heroMainIcon: {
    fontSize: 56,
    textAlign: 'center',
  },
  heroAccentIcon: {
    fontSize: 18,
    textAlign: 'center',
  },
  heroStatIcon: {
    fontSize: 18,
    marginBottom: 6,
  },
  featuresSection: {
    padding: 20,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'space-between',
  },
  featureCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 20,
    padding: 20,
    flex: 0.48,
    alignItems: 'center',
    minHeight: 160,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  featureIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  featureTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
    fontFamily: 'System',
  },
  featureDescription: {
    fontSize: 13,
    color: '#b0b0b0',
    textAlign: 'center',
    lineHeight: 18,
    fontFamily: 'System',
  },
  infoSection: {
    padding: 20,
  },
  tipIcon: {
    fontSize: 26,
    marginRight: 16,
  },
  tipCard: {
    backgroundColor: 'rgba(255, 215, 0, 0.15)',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.4)',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 6,
    fontFamily: 'System',
  },
  tipText: {
    fontSize: 13,
    color: '#b0b0b0',
    lineHeight: 20,
    fontFamily: 'System',
  },
  disclaimerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 107, 107, 0.15)',
    margin: 20,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 107, 0.4)',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  disclaimerText: {
    fontSize: 13,
    color: '#b0b0b0',
    marginLeft: 12,
    flex: 1,
    lineHeight: 18,
    fontFamily: 'System',
  },
  warningIcon: {
    fontSize: 22,
  },
  brainIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  brainShape: {
    width: 28,
    height: 24,
    backgroundColor: '#FF69B4',
    borderRadius: 14,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  bellIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bellBody: {
    width: 24,
    height: 24,
    backgroundColor: '#FF9800',
    borderRadius: 12,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  bellDot: {
    width: 8,
    height: 8,
    backgroundColor: '#FF5722',
    borderRadius: 4,
    position: 'absolute',
    top: -3,
    right: -3,
  },
});