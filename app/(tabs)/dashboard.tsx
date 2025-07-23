import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAuth } from '@/contexts/AuthContext.simple';
import { router } from 'expo-router';
import React from 'react';
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

interface StatCardProps {
    title: string;
    value: string;
    icon: string;
    color: string;
    subtitle?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color, subtitle }) => (
    <View style={[styles.statCard, { borderColor: color }]}>
        <View style={styles.cardHeader}>
            <ThemedText style={styles.cardIcon}>{icon}</ThemedText>
            <View style={styles.cardContent}>
                <ThemedText style={[styles.cardValue, { color }]}>{value}</ThemedText>
                <ThemedText style={styles.cardTitle}>{title}</ThemedText>
                {subtitle && <ThemedText style={styles.cardSubtitle}>{subtitle}</ThemedText>}
            </View>
        </View>
    </View>
);

interface MetricBarProps {
    label: string;
    value: number;
    maxValue: number;
    color: string;
}

const MetricBar: React.FC<MetricBarProps> = ({ label, value, maxValue, color }) => {
    const percentage = (value / maxValue) * 100;

    return (
        <View style={styles.metricItem}>
            <View style={styles.metricHeader}>
                <ThemedText style={styles.metricLabel}>{label}</ThemedText>
                <ThemedText style={styles.metricValue}>{value}/{maxValue}</ThemedText>
            </View>
            <View style={styles.progressBar}>
                <View
                    style={[
                        styles.progressFill,
                        { width: `${percentage}%`, backgroundColor: color }
                    ]}
                />
            </View>
        </View>
    );
};

export default function DashboardScreen() {
    const { logout } = useAuth();

    const handleLogout = async () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Logout',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await logout();
                            router.replace('/');
                        } catch {
                            Alert.alert('Error', 'Failed to logout');
                        }
                    }
                }
            ]
        );
    };

    const stats = [
        {
            title: 'Total Scans',
            value: '12',
            icon: '📱',
            color: '#00bcd4',
            subtitle: 'This month'
        },
        {
            title: 'Health Score',
            value: '85%',
            icon: '💚',
            color: '#4CAF50',
            subtitle: 'Excellent'
        },
        {
            title: 'Last Scan',
            value: '2d',
            icon: '🕒',
            color: '#FF9800',
            subtitle: 'ago'
        },
        {
            title: 'Alerts',
            value: '0',
            icon: '🔔',
            color: '#F44336',
            subtitle: 'Active'
        }
    ];

    const metrics = [
        { label: 'Visual Acuity', value: 85, maxValue: 100, color: '#4CAF50' },
        { label: 'Color Vision', value: 92, maxValue: 100, color: '#2196F3' },
        { label: 'Eye Movement', value: 78, maxValue: 100, color: '#FF9800' },
        { label: 'Overall Health', value: 85, maxValue: 100, color: '#00bcd4' }
    ];

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Header */}
            <ThemedView style={styles.header}>
                <View style={styles.headerContent}>
                    <View>
                        <ThemedText style={styles.title}>Dashboard</ThemedText>
                        <ThemedText style={styles.subtitle}>Your eye health overview</ThemedText>
                    </View>
                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                        <ThemedText style={styles.logoutButtonText}>Logout</ThemedText>
                    </TouchableOpacity>
                </View>
            </ThemedView>

            {/* Stats Grid */}
            <ThemedView style={styles.section}>
                <View style={styles.statsGrid}>
                    {stats.map((stat, index) => (
                        <View key={index} style={{ flexBasis: '48%', marginBottom: 12 }}>
                            <StatCard {...stat} />
                        </View>
                    ))}
                </View>
            </ThemedView>

            {/* Health Metrics */}
            <ThemedView style={styles.section}>
                <ThemedText style={styles.sectionTitle}>Health Metrics</ThemedText>
                <View style={styles.metricsContainer}>
                    {metrics.map((metric, index) => (
                        <MetricBar key={index} {...metric} />
                    ))}
                </View>
            </ThemedView>


            {/* Quick Tip */}
            <ThemedView style={styles.section}>
                <View style={styles.tipCard}>
                    <ThemedText style={styles.tipIcon}>💡</ThemedText>
                    <View style={styles.tipContent}>
                        <ThemedText style={styles.tipTitle}>Daily Eye Care</ThemedText>
                        <ThemedText style={styles.tipText}>
                            Regular scans help track your eye health. Schedule your next scan for continued monitoring.
                        </ThemedText>
                    </View>
                </View>
            </ThemedView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    header: {
        padding: 20,
        paddingTop: 60,
        alignItems: 'center',
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    logoutButton: {
        backgroundColor: '#F44336',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
    },
    logoutButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#00bcd4',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#cccccc',
        textAlign: 'center',
    },
    section: {
        padding: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 16,
    },

    // Stats Cards
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    statCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 16,
        padding: 20,
        borderWidth: 1,
        flex: 0.48,
        minHeight: 100,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardIcon: {
        fontSize: 30,
        marginRight: 16,
    },
    cardContent: {
        flex: 1,
    },
    cardValue: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    cardTitle: {
        fontSize: 14,
        color: '#cccccc',
        fontWeight: '600',
    },
    cardSubtitle: {
        fontSize: 12,
        color: '#888888',
        marginTop: 2,
    },

    // Health Metrics
    metricsContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 16,
        padding: 20,
        gap: 16,
    },
    metricItem: {
        marginBottom: 4,
    },
    metricHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    metricLabel: {
        fontSize: 16,
        color: '#ffffff',
        fontWeight: '500',
    },
    metricValue: {
        fontSize: 14,
        color: '#cccccc',
        fontWeight: '600',
    },
    progressBar: {
        height: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        borderRadius: 4,
    },

    // Tip Card
    tipCard: {
        backgroundColor: 'rgba(255, 215, 0, 0.1)',
        borderRadius: 16,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderWidth: 1,
        borderColor: 'rgba(255, 215, 0, 0.3)',
    },
    tipIcon: {
        fontSize: 24,
        marginRight: 16,
    },
    tipContent: {
        flex: 1,
    },
    tipTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 8,
    },
    tipText: {
        fontSize: 14,
        color: '#cccccc',
        lineHeight: 20,
    },
});
