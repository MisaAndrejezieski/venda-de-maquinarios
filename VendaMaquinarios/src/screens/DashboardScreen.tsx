import React from 'react';
import { ScrollView, StyleSheet, Text, useWindowDimensions, View, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { LineChart, BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const vendasMensais = {
  labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
  datasets: [
    {
      data: [450000, 520000, 380000, 620000, 480000, 750000],
      color: (opacity = 1) => `rgba(255, 111, 0, ${opacity})`,
      strokeWidth: 2,
    },
  ],
};

const maquinasPorCategoria = {
  labels: ['Pesado', 'Médio', 'Leve', 'Especial'],
  datasets: [
    {
      data: [15, 22, 30, 8],
    },
  ],
};

export default function DashboardScreen() {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const chartWidth = isTablet ? width * 0.65 : screenWidth - 40;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Bom dia, Vendedor!</Text>
        <Text style={styles.subtitle}>Painel de Vendas</Text>
      </View>

      {/* Cards de métricas */}
      <View style={[styles.metricsGrid, isTablet && styles.tabletMetricsGrid]}>
        <View style={[styles.metricCard, isTablet && styles.tabletMetricCard]}>
          <Ionicons name="trending-up" size={32} color={Colors.success} />
          <Text style={styles.metricValue}>R$ 3.2M</Text>
          <Text style={styles.metricLabel}>Vendas Totais</Text>
        </View>
        <View style={[styles.metricCard, isTablet && styles.tabletMetricCard]}>
          <Ionicons name="document-text" size={32} color={Colors.primary} />
          <Text style={styles.metricValue}>12</Text>
          <Text style={styles.metricLabel}>Propostas Ativas</Text>
        </View>
        <View style={[styles.metricCard, isTablet && styles.tabletMetricCard]}>
          <Ionicons name="people" size={32} color={Colors.warning} />
          <Text style={styles.metricValue}>48</Text>
          <Text style={styles.metricLabel}>Clientes</Text>
        </View>
        <View style={[styles.metricCard, isTablet && styles.tabletMetricCard]}>
          <Ionicons name="cash" size={32} color={Colors.secondary} />
          <Text style={styles.metricValue}>R$ 64K</Text>
          <Text style={styles.metricLabel}>Comissões</Text>
        </View>
      </View>

      {/* Gráfico de Vendas Mensais */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Vendas Mensais (R$)</Text>
        <LineChart
          data={vendasMensais}
          width={chartWidth}
          height={220}
          yAxisLabel="R$"
          yAxisSuffix=""
          chartConfig={{
            backgroundColor: Colors.surface,
            backgroundGradientFrom: Colors.surface,
            backgroundGradientTo: Colors.surface,
            decimalCount: 0,
            color: (opacity = 1) => `rgba(26, 35, 126, ${opacity})`,
            labelColor: () => Colors.textSecondary,
            propsForDots: {
              r: '5',
              strokeWidth: '2',
              stroke: Colors.secondary,
            },
          }}
          bezier
          style={styles.chart}
        />
      </View>

      {/* Gráfico de Máquinas por Categoria */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Máquinas por Categoria</Text>
        <BarChart
          data={maquinasPorCategoria}
          width={chartWidth}
          height={220}
          yAxisLabel=""
          yAxisSuffix=""
          chartConfig={{
            backgroundColor: Colors.surface,
            backgroundGradientFrom: Colors.surface,
            backgroundGradientTo: Colors.surface,
            decimalCount: 0,
            color: (opacity = 1) => `rgba(255, 111, 0, ${opacity})`,
            labelColor: () => Colors.textSecondary,
            barPercentage: 0.6,
          }}
          style={styles.chart}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { padding: 20, backgroundColor: Colors.surface },
  greeting: { fontSize: 28, fontWeight: 'bold', color: Colors.text },
  subtitle: { fontSize: 16, color: Colors.textSecondary, marginTop: 4 },
  
  metricsGrid: { padding: 10, flexDirection: 'row', flexWrap: 'wrap' },
  tabletMetricsGrid: { padding: 20 },
  metricCard: {
    width: '48%', backgroundColor: Colors.surface, margin: '1%',
    padding: 16, borderRadius: 12, alignItems: 'center', elevation: 2,
  },
  tabletMetricCard: { width: '23%' },
  metricValue: { fontSize: 22, fontWeight: 'bold', color: Colors.text, marginTop: 8 },
  metricLabel: { fontSize: 14, color: Colors.textSecondary, marginTop: 4 },

  chartContainer: {
    backgroundColor: Colors.surface,
    margin: 12,
    borderRadius: 16,
    padding: 16,
    elevation: 3,
  },
  chartTitle: { fontSize: 16, fontWeight: 'bold', color: Colors.text, marginBottom: 12 },
  chart: { borderRadius: 12 },
});