import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';

const MAQUINAS = [
  {
    id: 1,
    nome: 'Escavadeira Hidráulica CAT 320',
    fabricante: 'Caterpillar',
    ano: 2023,
    preco: 850000,
    categoria: 'Pesado',
    status: 'disponivel',
    imagem: null,
  },
  {
    id: 2,
    nome: 'Torno CNC Romi C 510',
    fabricante: 'Romi',
    ano: 2022,
    preco: 320000,
    categoria: 'Médio',
    status: 'disponivel',
    imagem: null,
  },
  {
    id: 3,
    nome: 'Compressor Atlas Copco GA 75',
    fabricante: 'Atlas Copco',
    ano: 2023,
    preco: 180000,
    categoria: 'Médio',
    status: 'reservado',
    imagem: null,
  },
  {
    id: 4,
    nome: 'Prensa Hidráulica 100 Ton',
    fabricante: 'Prensas Master',
    ano: 2021,
    preco: 95000,
    categoria: 'Leve',
    status: 'disponivel',
    imagem: null,
  },
  {
    id: 5,
    nome: 'Gerador Industrial 500kVA',
    fabricante: 'STEMAC',
    ano: 2023,
    preco: 420000,
    categoria: 'Pesado',
    status: 'vendido',
    imagem: null,
  },
  {
    id: 6,
    nome: 'Fresadora CNC Haas VF-2',
    fabricante: 'Haas',
    ano: 2022,
    preco: 550000,
    categoria: 'Pesado',
    status: 'disponivel',
    imagem: null,
  },
];

const getStatusColor = (status: string) => {
  const map: Record<string, string> = {
    disponivel: Colors.success,
    reservado: Colors.warning,
    vendido: Colors.danger,
    manutencao: Colors.gray,
  };
  return map[status] || Colors.gray;
};

const getStatusLabel = (status: string) => {
  const map: Record<string, string> = {
    disponivel: 'Disponível',
    reservado: 'Reservado',
    vendido: 'Vendido',
    manutencao: 'Manutenção',
  };
  return map[status] || status;
};

const formatMoeda = (valor: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);

export default function CatalogoScreen() {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const [busca, setBusca] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('todos');

  const maquinasFiltradas = MAQUINAS.filter((m) => {
    const matchBusca = m.nome.toLowerCase().includes(busca.toLowerCase()) ||
      m.fabricante.toLowerCase().includes(busca.toLowerCase());
    const matchStatus = filtroStatus === 'todos' || m.status === filtroStatus;
    return matchBusca && matchStatus;
  });

  return (
    <View style={styles.container}>
      {/* Barra de busca e filtros */}
      <View style={styles.filtersBar}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={20} color={Colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar máquina ou fabricante..."
            value={busca}
            onChangeText={setBusca}
          />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow}>
          {['todos', 'disponivel', 'reservado', 'vendido'].map((status) => (
            <TouchableOpacity
              key={status}
              style={[
                styles.filterChip,
                filtroStatus === status && styles.filterChipActive,
              ]}
              onPress={() => setFiltroStatus(status)}
            >
              <Text
                style={[
                  styles.filterChipText,
                  filtroStatus === status && styles.filterChipTextActive,
                ]}
              >
                {status === 'todos' ? 'Todos' : getStatusLabel(status)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Grid de máquinas */}
      <ScrollView style={styles.gridContainer}>
        <View style={[styles.grid, isTablet && styles.tabletGrid]}>
          {maquinasFiltradas.map((maquina) => (
            <TouchableOpacity
              key={maquina.id}
              style={[styles.card, isTablet && styles.tabletCard]}
            >
              <View style={styles.cardImage}>
                <Ionicons name="construct" size={48} color={Colors.secondary} />
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: getStatusColor(maquina.status) },
                  ]}
                >
                  <Text style={styles.statusText}>{getStatusLabel(maquina.status)}</Text>
                </View>
              </View>

              <View style={styles.cardContent}>
                <Text style={styles.machineName} numberOfLines={2}>
                  {maquina.nome}
                </Text>
                <Text style={styles.machineFab}>{maquina.fabricante}</Text>
                <Text style={styles.machineAno}>Ano: {maquina.ano}</Text>
                <Text style={styles.machinePreco}>{formatMoeda(maquina.preco)}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  filtersBar: { backgroundColor: Colors.surface, padding: 12, borderBottomWidth: 1, borderBottomColor: Colors.border },
  searchBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.background, borderRadius: 8, paddingHorizontal: 12, marginBottom: 10 },
  searchInput: { flex: 1, paddingVertical: 10, fontSize: 16, marginLeft: 8 },
  filterRow: { flexDirection: 'row' },
  filterChip: { paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20, backgroundColor: Colors.background, marginRight: 8 },
  filterChipActive: { backgroundColor: Colors.primary },
  filterChipText: { color: Colors.textSecondary, fontSize: 13 },
  filterChipTextActive: { color: Colors.white, fontWeight: 'bold' },
  gridContainer: { flex: 1 },
  grid: { padding: 10, flexDirection: 'row', flexWrap: 'wrap' },
  tabletGrid: { padding: 16 },
  card: { width: '48%', backgroundColor: Colors.surface, margin: '1%', borderRadius: 12, overflow: 'hidden', elevation: 2 },
  tabletCard: { width: '31%', margin: '1.16%' },
  cardImage: { height: 140, backgroundColor: '#FFF3E0', justifyContent: 'center', alignItems: 'center' },
  statusBadge: { position: 'absolute', top: 8, right: 8, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
  statusText: { color: Colors.white, fontSize: 10, fontWeight: 'bold' },
  cardContent: { padding: 12 },
  machineName: { fontSize: 14, fontWeight: 'bold', color: Colors.text, marginBottom: 4 },
  machineFab: { fontSize: 12, color: Colors.textSecondary },
  machineAno: { fontSize: 12, color: Colors.textSecondary, marginTop: 2 },
  machinePreco: { fontSize: 16, fontWeight: 'bold', color: Colors.secondary, marginTop: 6 },
});