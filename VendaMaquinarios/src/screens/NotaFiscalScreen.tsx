import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../constants/colors';
import { emitirNotaFiscal, listarNotasFiscais, listarVendas } from '../services/database';

export default function NotaFiscalScreen() {
  const [vendas, setVendas] = useState<any[]>([]);
  const [notas, setNotas] = useState<any[]>([]);
  const [aba, setAba] = useState<'vendas' | 'notas'>('vendas');

  const carregar = async () => {
    setVendas(await listarVendas());
    setNotas(await listarNotasFiscais());
  };

  useFocusEffect(useCallback(() => { carregar(); }, []));

  const handleEmitirNF = (venda: any) => {
    Alert.alert('Emitir Nota Fiscal', `Deseja emitir NF para venda ${venda.numero}?`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Emitir', onPress: async () => {
        const nota = await emitirNotaFiscal(venda.id);
        Alert.alert('NF Emitida! 🧾', `Nota Fiscal ${nota.numero} emitida com sucesso!`);
        carregar();
      }},
    ]);
  };

  const renderVenda = ({ item }: any) => (
    <View style={styles.card}>
      <View style={styles.cardRow}>
        <Text style={styles.numero}>{item.numero}</Text>
        <Text style={styles.valor}>R$ {item.valor_final?.toFixed(2)}</Text>
      </View>
      <Text style={styles.cliente}>{item.cliente_nome}</Text>
      <Text style={styles.data}>📅 {item.data_venda}</Text>
      {item.nota_fiscal ? (
        <View style={styles.nfEmitida}>
          <Ionicons name="checkmark-circle" size={18} color={Colors.success} />
          <Text style={styles.nfText}>NF: {item.nota_fiscal}</Text>
        </View>
      ) : (
        <TouchableOpacity style={styles.emitirBtn} onPress={() => handleEmitirNF(item)}>
          <Ionicons name="document-text" size={16} color={Colors.white} />
          <Text style={styles.emitirText}>Emitir NF</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderNota = ({ item }: any) => (
    <View style={styles.card}>
      <Text style={styles.numero}>{item.numero}</Text>
      <Text style={styles.valor}>R$ {item.valor_total?.toFixed(2)}</Text>
      <Text style={styles.data}>📅 {item.data_emissao} | Série: {item.serie}</Text>
      <Text style={styles.chave}>Chave: {item.chave_acesso?.substring(0, 20)}...</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, aba === 'vendas' && styles.tabActive]}
          onPress={() => setAba('vendas')}
        >
          <Text style={[styles.tabText, aba === 'vendas' && styles.tabTextActive]}>Vendas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, aba === 'notas' && styles.tabActive]}
          onPress={() => setAba('notas')}
        >
          <Text style={[styles.tabText, aba === 'notas' && styles.tabTextActive]}>Notas Emitidas</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={aba === 'vendas' ? vendas : notas}
        renderItem={aba === 'vendas' ? renderVenda : renderNota}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="document-text" size={64} color={Colors.gray} />
            <Text style={styles.emptyText}>Nenhum registro encontrado</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  tabs: { flexDirection: 'row', backgroundColor: Colors.surface, padding: 8 },
  tab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 8 },
  tabActive: { backgroundColor: Colors.primary },
  tabText: { fontSize: 14, color: Colors.text, fontWeight: '500' },
  tabTextActive: { color: Colors.white },
  list: { padding: 10 },
  card: { backgroundColor: Colors.surface, borderRadius: 12, padding: 16, marginBottom: 10, elevation: 2 },
  cardRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  numero: { fontSize: 16, fontWeight: 'bold', color: Colors.primary },
  valor: { fontSize: 18, fontWeight: 'bold', color: Colors.success },
  cliente: { fontSize: 14, color: Colors.textSecondary, marginTop: 4 },
  data: { fontSize: 12, color: Colors.textSecondary, marginTop: 4 },
  nfEmitida: { flexDirection: 'row', alignItems: 'center', marginTop: 8, gap: 6 },
  nfText: { color: Colors.success, fontWeight: 'bold' },
  emitirBtn: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.secondary,
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: 8, marginTop: 8,
    alignSelf: 'flex-start', gap: 6,
  },
  emitirText: { color: Colors.white, fontWeight: 'bold' },
  chave: { fontSize: 10, color: Colors.gray, marginTop: 4 },
  empty: { alignItems: 'center', marginTop: 80 },
  emptyText: { fontSize: 16, color: Colors.gray, marginTop: 12 },
});