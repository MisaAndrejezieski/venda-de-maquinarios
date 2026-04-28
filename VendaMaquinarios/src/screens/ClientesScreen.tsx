import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import {
  Alert,
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { Colors } from '../constants/colors';
import { excluirCliente, listarClientes } from '../services/database';

export default function ClientesScreen({ navigation }: any) {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const [busca, setBusca] = useState('');
  const [clientes, setClientes] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [clienteSelecionado, setClienteSelecionado] = useState<any>(null);

  const carregarClientes = () => {
    listarClientes().then(setClientes);
  };

  useFocusEffect(useCallback(() => { carregarClientes(); }, []));

  const handleExcluir = (cliente: any) => {
    Alert.alert('Excluir Cliente', `Deseja excluir ${cliente.nome_fantasia || cliente.razao_social}?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir', style: 'destructive',
        onPress: async () => {
          await excluirCliente(cliente.id);
          carregarClientes();
        },
      },
    ]);
  };

  const clientesFiltrados = clientes.filter((c: any) =>
    (c.razao_social || '').toLowerCase().includes(busca.toLowerCase()) ||
    (c.nome_fantasia || '').toLowerCase().includes(busca.toLowerCase()) ||
    (c.cnpj || '').includes(busca)
  );

  const formatCNPJ = (cnpj: string) => {
    if (!cnpj) return '';
    return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  };

  const renderCliente = ({ item }: any) => (
    <TouchableOpacity
      style={[styles.card, isTablet && styles.tabletCard]}
      onPress={() => { setClienteSelecionado(item); setModalVisible(true); }}
      onLongPress={() => handleExcluir(item)}
    >
      <View style={styles.cardHeader}>
        <View style={styles.avatar}>
          <Ionicons name="business" size={24} color={Colors.primary} />
        </View>
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.razaoSocial} numberOfLines={1}>{item.razao_social}</Text>
          <Text style={styles.fantasia}>{item.nome_fantasia || '---'}</Text>
        </View>
        <View style={[styles.statusDot, { backgroundColor: item.status === 'ativo' ? Colors.success : Colors.gray }]} />
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.infoText}>📋 {formatCNPJ(item.cnpj)}</Text>
        <Text style={styles.infoText}>📍 {item.cidade}/{item.estado}</Text>
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
            placeholder="Buscar cliente..."
            value={busca}
            onChangeText={setBusca}
          />
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('CadastroCliente', { onSave: carregarClientes })}
        >
          <Ionicons name="add" size={24} color={Colors.white} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={clientesFiltrados}
        renderItem={renderCliente}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="people" size={64} color={Colors.gray} />
            <Text style={styles.emptyText}>Nenhum cliente cadastrado</Text>
          </View>
        }
      />

      {/* Modal de detalhes */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Detalhes do Cliente</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color={Colors.text} />
              </TouchableOpacity>
            </View>
            {clienteSelecionado && (
              <ScrollView>
                <Text style={styles.detailLabel}>Razão Social</Text>
                <Text style={styles.detailValue}>{clienteSelecionado.razao_social}</Text>
                <Text style={styles.detailLabel}>Nome Fantasia</Text>
                <Text style={styles.detailValue}>{clienteSelecionado.nome_fantasia || '---'}</Text>
                <Text style={styles.detailLabel}>CNPJ</Text>
                <Text style={styles.detailValue}>{formatCNPJ(clienteSelecionado.cnpj)}</Text>
                <Text style={styles.detailLabel}>Telefone</Text>
                <Text style={styles.detailValue}>{clienteSelecionado.telefone || '---'}</Text>
                <Text style={styles.detailLabel}>Email</Text>
                <Text style={styles.detailValue}>{clienteSelecionado.email || '---'}</Text>
                <Text style={styles.detailLabel}>Endereço</Text>
                <Text style={styles.detailValue}>{clienteSelecionado.cidade}/{clienteSelecionado.estado}</Text>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
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
  tabletCard: { marginHorizontal: 20 },
  cardHeader: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#E8EAF6', justifyContent: 'center', alignItems: 'center' },
  razaoSocial: { fontSize: 15, fontWeight: 'bold', color: Colors.text },
  fantasia: { fontSize: 13, color: Colors.textSecondary },
  statusDot: { width: 10, height: 10, borderRadius: 5 },
  cardBody: { marginTop: 8 },
  infoText: { fontSize: 13, color: Colors.textSecondary, marginTop: 3 },
  empty: { alignItems: 'center', marginTop: 80 },
  emptyText: { fontSize: 16, color: Colors.gray, marginTop: 12 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 20 },
  modalContent: { backgroundColor: Colors.surface, borderRadius: 16, padding: 20, maxHeight: '80%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: Colors.text },
  detailLabel: { fontSize: 12, color: Colors.textSecondary, marginTop: 10 },
  detailValue: { fontSize: 16, color: Colors.text, fontWeight: '500' },
});