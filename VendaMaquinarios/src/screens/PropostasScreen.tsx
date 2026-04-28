import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';

const PROPOSTAS = [
  { id: 1, numero: 'PROP-001', cliente: 'Metal ABC', maquina: 'Escavadeira CAT 320', valor: 850000, status: 'pendente', data: '25/04/2026' },
  { id: 2, numero: 'PROP-002', cliente: 'PlastiXYZ', maquina: 'Torno CNC Romi', valor: 320000, status: 'aprovado', data: '24/04/2026' },
  { id: 3, numero: 'PROP-003', cliente: 'Nova Era', maquina: 'Compressor Atlas', valor: 180000, status: 'pendente', data: '23/04/2026' },
  { id: 4, numero: 'PROP-004', cliente: 'Gama Motors', maquina: 'Fresadora Haas', valor: 550000, status: 'recusado', data: '20/04/2026' },
];

const getStatusStyle = (status: string) => {
  const map: Record<string, { bg: string; color: string; label: string }> = {
    pendente: { bg: '#FFF3E0', color: '#E65100', label: 'Pendente' },
    aprovado: { bg: '#E8F5E9', color: '#1B5E20', label: 'Aprovado' },
    recusado: { bg: '#FFEBEE', color: '#B71C1C', label: 'Recusado' },
  };
  return map[status] || { bg: '#F5F5F5', color: '#616161', label: status };
};

const formatMoeda = (valor: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);

export default function PropostasScreen() {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const [filtro, setFiltro] = useState('todas');

  const propostasFiltradas = filtro === 'todas' ? PROPOSTAS : PROPOSTAS.filter((p) => p.status === filtro);

  return (
    <View style={styles.container}>
      <View style={styles.filterRow}>
        {['todas', 'pendente', 'aprovado', 'recusado'].map((s) => (
          <TouchableOpacity
            key={s}
            style={[styles.filterBtn, filtro === s && styles.filterBtnActive]}
            onPress={() => setFiltro(s)}
          >
            <Text style={[styles.filterBtnText, filtro === s && styles.filterBtnTextActive]}>
              {s === 'todas' ? 'Todas' : getStatusStyle(s).label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.list}>
        {propostasFiltradas.map((proposta) => {
          const statusStyle = getStatusStyle(proposta.status);
          return (
            <TouchableOpacity key={proposta.id} style={[styles.card, isTablet && styles.tabletCard]}>
              <View style={styles.cardHeader}>
                <Text style={styles.propNum}>{proposta.numero}</Text>
                <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
                  <Text style={[styles.statusText, { color: statusStyle.color }]}>{statusStyle.label}</Text>
                </View>
              </View>
              <Text style={styles.clienteName}>
                <Ionicons name="business" size={14} /> {proposta.cliente}
              </Text>
              <Text style={styles.maquinaName}>
                <Ionicons name="construct" size={14} /> {proposta.maquina}
              </Text>
              <View style={styles.cardFooter}>
                <Text style={styles.valor}>{formatMoeda(proposta.valor)}</Text>
                <Text style={styles.data}>{proposta.data}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <TouchableOpacity style={styles.fab}>
        <Ionicons name="add" size={28} color={Colors.white} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  filterRow: { flexDirection: 'row', padding: 12, backgroundColor: Colors.surface, gap: 8 },
  filterBtn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: Colors.background },
  filterBtnActive: { backgroundColor: Colors.primary },
  filterBtnText: { fontSize: 13, color: Colors.textSecondary },
  filterBtnTextActive: { color: Colors.white, fontWeight: 'bold' },
  list: { flex: 1, padding: 10 },
  card: { backgroundColor: Colors.surface, borderRadius: 12, padding: 16, marginBottom: 10, elevation: 2 },
  tabletCard: { marginHorizontal: 20 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  propNum: { fontSize: 16, fontWeight: 'bold', color: Colors.primary },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  statusText: { fontSize: 12, fontWeight: 'bold' },
  clienteName: { fontSize: 14, color: Colors.text, marginBottom: 4 },
  maquinaName: { fontSize: 14, color: Colors.textSecondary, marginBottom: 10 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: Colors.border, paddingTop: 10 },
  valor: { fontSize: 18, fontWeight: 'bold', color: Colors.secondary },
  data: { fontSize: 12, color: Colors.textSecondary },
  fab: { position: 'absolute', right: 20, bottom: 20, width: 56, height: 56, borderRadius: 28, backgroundColor: Colors.secondary, justifyContent: 'center', alignItems: 'center', elevation: 6 },
});