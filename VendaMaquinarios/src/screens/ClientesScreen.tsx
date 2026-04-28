import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';

const CLIENTES = [
  { id: 1, razao: 'Indústria Metalúrgica ABC Ltda', fantasia: 'Metal ABC', cnpj: '12.345.678/0001-90', cidade: 'São Paulo', estado: 'SP', segmento: 'Metalurgia', status: 'ativo' },
  { id: 2, razao: 'Fábrica de Plásticos XYZ S.A.', fantasia: 'PlastiXYZ', cnpj: '98.765.432/0001-10', cidade: 'Campinas', estado: 'SP', segmento: 'Plásticos', status: 'ativo' },
  { id: 3, razao: 'Construtora Nova Era Eireli', fantasia: 'Nova Era', cnpj: '45.678.901/0001-23', cidade: 'Rio de Janeiro', estado: 'RJ', segmento: 'Construção', status: 'ativo' },
  { id: 4, razao: 'Indústria Química Beta Ltda', fantasia: 'QuimBeta', cnpj: '67.890.123/0001-45', cidade: 'Curitiba', estado: 'PR', segmento: 'Químico', status: 'inativo' },
  { id: 5, razao: 'Montadora Gama S.A.', fantasia: 'Gama Motors', cnpj: '34.567.890/0001-67', cidade: 'Betim', estado: 'MG', segmento: 'Automotivo', status: 'ativo' },
];

const formatCNPJ = (cnpj: string) => cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');

export default function ClientesScreen() {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const [busca, setBusca] = useState('');

  const clientesFiltrados = CLIENTES.filter(
    (c) =>
      c.razao.toLowerCase().includes(busca.toLowerCase()) ||
      c.fantasia.toLowerCase().includes(busca.toLowerCase()) ||
      c.cnpj.includes(busca)
  );

  const renderCliente = ({ item }: any) => (
    <TouchableOpacity style={[styles.card, isTablet && styles.tabletCard]}>
      <View style={styles.cardHeader}>
        <View style={styles.avatar}>
          <Ionicons name="business" size={24} color={Colors.primary} />
        </View>
        <View style={styles.cardHeaderText}>
          <Text style={styles.razaoSocial} numberOfLines={1}>{item.razao}</Text>
          <Text style={styles.fantasia}>{item.fantasia}</Text>
        </View>
        <View style={[styles.statusDot, { backgroundColor: item.status === 'ativo' ? Colors.success : Colors.gray }]} />
      </View>
      <View style={styles.cardBody}>
        <View style={styles.infoRow}>
          <Ionicons name="document-text" size={14} color={Colors.textSecondary} />
          <Text style={styles.infoText}>{formatCNPJ(item.cnpj)}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="location" size={14} color={Colors.textSecondary} />
          <Text style={styles.infoText}>{item.cidade}/{item.estado}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="pricetag" size={14} color={Colors.textSecondary} />
          <Text style={styles.infoText}>{item.segmento}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={20} color={Colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar por razão social, fantasia ou CNPJ..."
            value={busca}
            onChangeText={setBusca}
          />
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color={Colors.white} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={clientesFiltrados}
        renderItem={renderCliente}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        numColumns={isTablet ? 2 : 1}
        key={isTablet ? 'tablet' : 'mobile'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  searchBar: { flexDirection: 'row', padding: 12, backgroundColor: Colors.surface, alignItems: 'center' },
  searchBox: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.background, borderRadius: 8, paddingHorizontal: 12 },
  searchInput: { flex: 1, paddingVertical: 10, fontSize: 16, marginLeft: 8 },
  addButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.primary, justifyContent: 'center', alignItems: 'center', marginLeft: 12 },
  list: { padding: 10 },
  card: { backgroundColor: Colors.surface, borderRadius: 12, padding: 16, marginBottom: 10, elevation: 2 },
  tabletCard: { flex: 1, margin: 6, maxWidth: '48%' },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#E8EAF6', justifyContent: 'center', alignItems: 'center' },
  cardHeaderText: { flex: 1, marginLeft: 12 },
  razaoSocial: { fontSize: 15, fontWeight: 'bold', color: Colors.text },
  fantasia: { fontSize: 13, color: Colors.textSecondary },
  statusDot: { width: 10, height: 10, borderRadius: 5 },
  cardBody: {},
  infoRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  infoText: { fontSize: 13, color: Colors.textSecondary, marginLeft: 6 },
});