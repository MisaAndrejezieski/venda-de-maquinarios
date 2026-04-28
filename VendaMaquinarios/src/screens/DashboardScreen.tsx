import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { Colors } from '../constants/colors';

export default function DashboardScreen() {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Bom dia!</Text>
        <Text style={styles.subtitle}>Painel de Vendas</Text>
      </View>

      <View style={[styles.metricsGrid, isTablet && styles.tabletMetricsGrid]}>
        <View style={[styles.metricCard, isTablet && styles.tabletMetricCard]}>
          <Ionicons name="trending-up" size={32} color={Colors.success} />
          <Text style={styles.metricValue}>R$ 45.200</Text>
          <Text style={styles.metricLabel}>Vendas Hoje</Text>
        </View>

        <View style={[styles.metricCard, isTablet && styles.tabletMetricCard]}>
          <Ionicons name="document-text" size={32} color={Colors.primary} />
          <Text style={styles.metricValue}>12</Text>
          <Text style={styles.metricLabel}>Propostas</Text>
        </View>

        <View style={[styles.metricCard, isTablet && styles.tabletMetricCard]}>
          <Ionicons name="people" size={32} color={Colors.warning} />
          <Text style={styles.metricValue}>5</Text>
          <Text style={styles.metricLabel}>Novos Clientes</Text>
        </View>

        <View style={[styles.metricCard, isTablet && styles.tabletMetricCard]}>
          <Ionicons name="cash" size={32} color={Colors.secondary} />
          <Text style={styles.metricValue}>R$ 2.260</Text>
          <Text style={styles.metricLabel}>Comissão</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    padding: 20,
    backgroundColor: Colors.surface,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  metricsGrid: {
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tabletMetricsGrid: {
    padding: 20,
  },
  metricCard: {
    width: '48%',
    backgroundColor: Colors.surface,
    margin: '1%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  tabletMetricCard: {
    width: '23%',
  },
  metricValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: 8,
  },
  metricLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
  },
});