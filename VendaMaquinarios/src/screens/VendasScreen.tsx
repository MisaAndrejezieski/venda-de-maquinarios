import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { Colors } from '../constants/colors';

const VENDAS = [
  { id: 1, cliente: 'Metal ABC', maquina: 'Escavadeira CAT 320', valor: 850000, comissao: 17000, data: '15/04/2026', vendedor: 'Carlos Silva' },
  { id: 2, cliente: 'PlastiXYZ', maquina: 'Torno CNC Romi', valor: 320000, comissao: 6400, data: '10/04/2026', vendedor: 'Ana Santos' },
  { id: 3, cliente: 'Nova Era', maquina: 'Compressor Atlas', valor: 180000, comissao: 3600, data: '05/04/2026', vendedor: 'Carlos Silva' },
];

const formatMoeda = (valor: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);

export default function VendasScreen() {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  const totalVendas = VENDAS.reduce((acc, v) => acc + v.valor, 0);
  const totalComissao = VENDAS.reduce((acc, v) => acc + v.comissao, 0);

  return (
    <ScrollView style={styles.container}>
      {/* Cards de resumo */}
      <View style={[styles.resumoGrid, isTablet && styles.tabletResumoGrid]}>
        <View style={styles.resumoCard}>
          <Ionicons name="trending-up" size={28} color={Colors.success} />
          <Text style={styles.resumoValor}>{formatMoeda(totalVendas)}</Text>
          <Text style={styles.resumoLabel}>Total em Vendas</Text>
        </View>
        <View style={styles.resumoCard}>
          <Ionicons name="cash" size={28} color={Colors.secondary} />
          <Text style={styles.resumoValor}>{formatMoeda(totalComissao)}</Text>
          <Text style={styles.resumoLabel}>Total em Comissões</Text>
        </View>
        <View style={styles.resumoCard}>
          <Ionicons name="checkmark-circle" size={28} color={Colors.primary} />
          <Text style={styles.resumoValor}>{VENDAS.length}</Text>
          <Text style={styles.resumoLabel}>Máquinas Vendidas</Text>
        </View>
      </View>

      {/* Lista de vendas */}
      <Text style={styles.sectionTitle}>Últimas Vendas</Text>
      {VENDAS.map((venda) => (
        <View key={venda.id} style={[styles.card, isTablet && styles.tabletCard]}>
          <View style={styles.cardIcon}>
            <Ionicons name="checkmark-circle" size={32} color={Colors.success} />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.clienteName}>{venda.cliente}</Text>
            <Text style={styles.maquinaName}>{venda.maquina}</Text>
            <View style={styles.cardDetails}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Valor</Text>
                <Text style={styles.detailValue}>{formatMoeda(venda.valor)}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Comissão</Text>
                <Text style={styles.detailValueComissao}>{formatMoeda(venda.comissao)}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Vendedor</Text>
                <Text style={styles.detailText}>{venda.vendedor}</Text>
              </View>
            </View>
            <Text style={styles.dataText}>📅 {venda.data}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  resumoGrid: { flexDirection: 'row', flexWrap: 'wrap', padding: 10 },
  tabletResumoGrid: { padding: 20 },
  resumoCard: { width: '48%', backgroundColor: Colors.surface, margin: '1%', padding: 16, borderRadius: 12, alignItems: 'center', elevation: 2 },
  resumoValor: { fontSize: 20, fontWeight: 'bold', color: Colors.text, marginTop: 8 },
  resumoLabel: { fontSize: 12, color: Colors.textSecondary, marginTop: 4 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: Colors.text, padding: 16, paddingBottom: 8 },
  card: { backgroundColor: Colors.surface, margin: 10, marginTop: 0, borderRadius: 12, padding: 16, flexDirection: 'row', elevation: 2 },
  tabletCard: { marginHorizontal: 20 },
  cardIcon: { marginRight: 14, justifyContent: 'center' },
  cardContent: { flex: 1 },
  clienteName: { fontSize: 16, fontWeight: 'bold', color: Colors.text },
  maquinaName: { fontSize: 13, color: Colors.textSecondary, marginTop: 2 },
  cardDetails: { flexDirection: 'row', marginTop: 10, gap: 12 },
  detailItem: {},
  detailLabel: { fontSize: 10, color: Colors.textSecondary },
  detailValue: { fontSize: 14, fontWeight: 'bold', color: Colors.secondary },
  detailValueComissao: { fontSize: 14, fontWeight: 'bold', color: Colors.success },
  detailText: { fontSize: 13, color: Colors.text },
  dataText: { fontSize: 12, color: Colors.textSecondary, marginTop: 8 },
});