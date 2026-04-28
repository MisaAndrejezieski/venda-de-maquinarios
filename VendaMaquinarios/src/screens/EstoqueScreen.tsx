import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import {
    Alert,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { Colors } from '../constants/colors';
import { excluirEstoque, listarEstoque, listarEstoqueBaixo } from '../services/database';

export default function EstoqueScreen({ navigation }: any) {
  const [estoque, setEstoque] = useState<any[]>([]);
  const [busca, setBusca] = useState('');
  const [mostrarBaixo, setMostrarBaixo] = useState(false);

  const carregar = async () => {
    const dados = mostrarBaixo ? await listarEstoqueBaixo() : await listarEstoque();
    setEstoque(dados);
  };

  useFocusEffect(useCallback(() => { carregar(); }, [mostrarBaixo]));

  const handleExcluir = (item: any) => {
    Alert.alert('Excluir Item', `Deseja excluir este item do estoque?`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: async () => {
        await excluirEstoque(item.id);
        carregar();
      }},
    ]);
  };

  const filtrados = estoque.filter((e: any) =>
    (e.nome || '').toLowerCase().includes(busca.toLowerCase())
  );

  const renderItem = ({ item }: any) => {
    const baixo = item.quantidade <= item.quantidade_minima;
    return (
      <View style={[styles.card, baixo && styles.cardBaixo]}>
        <View style={styles.cardHeader}>
          <Ionicons name="cube" size={24} color={baixo ? Colors.danger : Colors.primary} />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.itemNome}>{item.nome || 'Item sem nome'}</Text>
            <Text style={styles.itemLocal}>{item.localizacao || 'Sem localização'}</Text>
          </View>
          <View style={[styles.qtdBadge, { backgroundColor: baixo ? Colors.danger : Colors.success }]}>
            <Text style={styles.qtdText}>{item.quantidade || 0}</Text>
          </View>
        </View>
        <View style={styles.cardFooter}>
          <Text style={styles.minText}>Mín: {item.quantidade_minima || 1}</Text>
          {baixo && <Text style={styles.alertaText}>⚠️ Estoque Baixo!</Text>}
          <TouchableOpacity onPress={() => handleExcluir(item)}>
            <Ionicons name="trash" size={20} color={Colors.danger} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerBar}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={20} color={Colors.textSecondary} />
          <TextInput style={styles.searchInput} placeholder="Buscar item..." value={busca} onChangeText={setBusca} />
        </View>
      </View>

      <View style={styles.filterRow}>
        <TouchableOpacity
          style={[styles.filterBtn, mostrarBaixo && styles.filterBtnActive]}
          onPress={() => setMostrarBaixo(!mostrarBaixo)}
        >
          <Text style={[styles.filterText, mostrarBaixo && styles.filterTextActive]}>
            ⚠️ Estoque Baixo
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => navigation.navigate('CadastroEstoque', { onSave: carregar })}
        >
          <Ionicons name="add" size={20} color={Colors.white} />
          <Text style={styles.addBtnText}>Novo Item</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filtrados}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="cube" size={64} color={Colors.gray} />
            <Text style={styles.emptyText}>Nenhum item em estoque</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  headerBar: { padding: 12, backgroundColor: Colors.surface },
  searchBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.background, borderRadius: 8, paddingHorizontal: 12 },
  searchInput: { flex: 1, paddingVertical: 10, fontSize: 16, marginLeft: 8 },
  filterRow: { flexDirection: 'row', padding: 10, gap: 8, alignItems: 'center' },
  filterBtn: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, backgroundColor: Colors.surface },
  filterBtnActive: { backgroundColor: Colors.danger },
  filterText: { fontSize: 13, color: Colors.text },
  filterTextActive: { color: Colors.white, fontWeight: 'bold' },
  addBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.primary, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, gap: 6 },
  addBtnText: { color: Colors.white, fontWeight: 'bold', fontSize: 13 },
  list: { padding: 10 },
  card: { backgroundColor: Colors.surface, borderRadius: 12, padding: 14, marginBottom: 8, elevation: 2 },
  cardBaixo: { borderLeftWidth: 4, borderLeftColor: Colors.danger },
  cardHeader: { flexDirection: 'row', alignItems: 'center' },
  itemNome: { fontSize: 15, fontWeight: 'bold', color: Colors.text },
  itemLocal: { fontSize: 12, color: Colors.textSecondary },
  qtdBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16 },
  qtdText: { color: Colors.white, fontWeight: 'bold', fontSize: 16 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  minText: { fontSize: 12, color: Colors.textSecondary },
  alertaText: { fontSize: 12, color: Colors.danger, fontWeight: 'bold' },
  empty: { alignItems: 'center', marginTop: 80 },
  emptyText: { fontSize: 16, color: Colors.gray, marginTop: 12 },
});