import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { Colors } from '../constants/colors';
import { inserirVenda } from '../services/database';

const FORMAS_PAGAMENTO = [
  { id: 'a_vista', label: 'À Vista', icone: 'cash' },
  { id: 'cartao_credito', label: 'Cartão de Crédito', icone: 'card' },
  { id: 'cartao_debito', label: 'Cartão de Débito', icone: 'card' },
  { id: 'pix', label: 'PIX', icone: 'qr-code' },
  { id: 'boleto', label: 'Boleto', icone: 'barcode' },
  { id: 'parcelado', label: 'Parcelado', icone: 'calendar' },
];

export default function NovaVendaScreen({ navigation }: any) {
  const [clienteNome, setClienteNome] = useState('');
  const [maquinaNome, setMaquinaNome] = useState('');
  const [valorTotal, setValorTotal] = useState('');
  const [desconto, setDesconto] = useState('');
  const [formaPagamento, setFormaPagamento] = useState('');
  const [parcelas, setParcelas] = useState('1');
  const [entrada, setEntrada] = useState('');
  const [observacoes, setObservacoes] = useState('');

  const valorFinal = valorTotal ? Number(valorTotal) - Number(desconto || 0) : 0;
  const valorParcela = Number(parcelas) > 0 && valorFinal > 0
    ? (valorFinal - Number(entrada || 0)) / Number(parcelas)
    : 0;

  const handleFecharVenda = async () => {
    if (!clienteNome || !maquinaNome || !valorTotal) {
      Alert.alert('Atenção', 'Preencha cliente, máquina e valor!');
      return;
    }
    if (!formaPagamento) {
      Alert.alert('Atenção', 'Selecione a forma de pagamento!');
      return;
    }

    const resultado = await inserirVenda({
      cliente_nome: clienteNome,
      maquina_nome: maquinaNome,
      valor_final: valorFinal,
      desconto: Number(desconto || 0),
      forma_pagamento: formaPagamento,
      parcelas: Number(parcelas),
      valor_entrada: Number(entrada || 0),
      valor_parcela: valorParcela,
      observacoes,
    });

    Alert.alert('Venda Fechada! 🎉', `Venda ${resultado.numero} realizada com sucesso!\nValor: R$ ${valorFinal.toFixed(2)}`, [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.sectionTitle}>Dados da Venda</Text>

        <Text style={styles.label}>Cliente *</Text>
        <TextInput style={styles.input} value={clienteNome} onChangeText={setClienteNome} placeholder="Nome do cliente" placeholderTextColor={Colors.textSecondary} />

        <Text style={styles.label}>Máquina *</Text>
        <TextInput style={styles.input} value={maquinaNome} onChangeText={setMaquinaNome} placeholder="Nome da máquina" placeholderTextColor={Colors.textSecondary} />

        <Text style={styles.sectionTitle}>Valores</Text>

        <Text style={styles.label}>Valor Total (R$) *</Text>
        <TextInput style={styles.input} value={valorTotal} onChangeText={setValorTotal} placeholder="850000" placeholderTextColor={Colors.textSecondary} keyboardType="numeric" />

        <Text style={styles.label}>Desconto (R$)</Text>
        <TextInput style={styles.input} value={desconto} onChangeText={setDesconto} placeholder="0" placeholderTextColor={Colors.textSecondary} keyboardType="numeric" />

        <View style={styles.valorFinalBox}>
          <Text style={styles.valorFinalLabel}>Valor Final:</Text>
          <Text style={styles.valorFinalValue}>R$ {valorFinal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</Text>
        </View>

        <Text style={styles.sectionTitle}>Pagamento</Text>

        <Text style={styles.label}>Forma de Pagamento *</Text>
        <View style={styles.paymentGrid}>
          {FORMAS_PAGAMENTO.map((fp) => (
            <TouchableOpacity
              key={fp.id}
              style={[styles.paymentOption, formaPagamento === fp.id && styles.paymentOptionSelected]}
              onPress={() => setFormaPagamento(fp.id)}
            >
              <Ionicons
                name={fp.icone as any}
                size={24}
                color={formaPagamento === fp.id ? Colors.white : Colors.primary}
              />
              <Text style={[styles.paymentText, formaPagamento === fp.id && styles.paymentTextSelected]}>
                {fp.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {(formaPagamento === 'parcelado' || formaPagamento === 'cartao_credito') && (
          <>
            <Text style={styles.label}>Número de Parcelas</Text>
            <TextInput style={styles.input} value={parcelas} onChangeText={setParcelas} keyboardType="numeric" />
            <Text style={styles.label}>Entrada (R$)</Text>
            <TextInput style={styles.input} value={entrada} onChangeText={setEntrada} keyboardType="numeric" placeholder="0" placeholderTextColor={Colors.textSecondary} />
            {valorParcela > 0 && (
              <View style={styles.parcelaBox}>
                <Text style={styles.parcelaText}>
                  {parcelas}x de R$ {valorParcela.toFixed(2)}
                  {entrada ? ` + Entrada de R$ ${Number(entrada).toFixed(2)}` : ''}
                </Text>
              </View>
            )}
          </>
        )}

        <Text style={styles.label}>Observações</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={observacoes}
          onChangeText={setObservacoes}
          multiline
          numberOfLines={3}
          placeholder="Observações da venda..."
          placeholderTextColor={Colors.textSecondary}
        />

        <TouchableOpacity style={styles.fecharButton} onPress={handleFecharVenda}>
          <Ionicons name="checkmark-circle" size={24} color={Colors.white} />
          <Text style={styles.fecharButtonText}>FECHAR VENDA</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  form: { padding: 16 },
  sectionTitle: {
    fontSize: 18, fontWeight: 'bold', color: Colors.primary,
    marginTop: 20, marginBottom: 12, borderBottomWidth: 2,
    borderBottomColor: Colors.secondary, paddingBottom: 6,
  },
  label: { fontSize: 14, fontWeight: '600', color: Colors.text, marginBottom: 6, marginTop: 10 },
  input: {
    backgroundColor: Colors.surface, borderRadius: 10, paddingHorizontal: 14,
    paddingVertical: 12, fontSize: 16, borderWidth: 1,
    borderColor: Colors.border, color: Colors.text,
  },
  textArea: { minHeight: 80, textAlignVertical: 'top' },
  valorFinalBox: {
    backgroundColor: '#E8F5E9', padding: 16, borderRadius: 12,
    marginTop: 12, flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center',
  },
  valorFinalLabel: { fontSize: 16, color: Colors.text },
  valorFinalValue: { fontSize: 24, fontWeight: 'bold', color: Colors.success },
  paymentGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  paymentOption: {
    width: '30%', backgroundColor: Colors.surface, padding: 12,
    borderRadius: 10, alignItems: 'center', borderWidth: 2,
    borderColor: Colors.border,
  },
  paymentOptionSelected: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  paymentText: { fontSize: 11, color: Colors.text, marginTop: 6, textAlign: 'center' },
  paymentTextSelected: { color: Colors.white },
  parcelaBox: {
    backgroundColor: '#FFF3E0', padding: 12, borderRadius: 8, marginTop: 8,
  },
  parcelaText: { fontSize: 15, fontWeight: 'bold', color: Colors.secondary, textAlign: 'center' },
  fecharButton: {
    backgroundColor: Colors.success, flexDirection: 'row',
    justifyContent: 'center', alignItems: 'center', paddingVertical: 18,
    borderRadius: 12, marginTop: 24, marginBottom: 40, gap: 10, elevation: 6,
  },
  fecharButtonText: { color: Colors.white, fontSize: 20, fontWeight: 'bold' },
});