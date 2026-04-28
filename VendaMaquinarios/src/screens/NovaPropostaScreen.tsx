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

const CLIENTES_MOCK = ['Metal ABC', 'PlastiXYZ', 'Nova Era', 'Gama Motors', 'QuimBeta'];
const MAQUINAS_MOCK = ['Escavadeira CAT 320', 'Torno CNC Romi', 'Compressor Atlas', 'Fresadora Haas', 'Prensa 100 Ton'];

export default function NovaPropostaScreen() {
  const [cliente, setCliente] = useState('');
  const [maquina, setMaquina] = useState('');
  const [valor, setValor] = useState('');
  const [desconto, setDesconto] = useState('');
  const [formaPagamento, setFormaPagamento] = useState('');
  const [prazoEntrega, setPrazoEntrega] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [showClientes, setShowClientes] = useState(false);
  const [showMaquinas, setShowMaquinas] = useState(false);

  const handleSubmit = () => {
    if (!cliente || !maquina || !valor) {
      Alert.alert('Atenção', 'Preencha os campos obrigatórios!');
      return;
    }
    Alert.alert('Sucesso!', 'Proposta criada com sucesso!', [
      { text: 'OK', onPress: () => {
        setCliente('');
        setMaquina('');
        setValor('');
        setDesconto('');
        setFormaPagamento('');
        setPrazoEntrega('');
        setObservacoes('');
      }}
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.sectionTitle}>Dados do Cliente</Text>
        
        <Text style={styles.label}>Cliente *</Text>
        <TouchableOpacity
          style={styles.selectInput}
          onPress={() => setShowClientes(!showClientes)}
        >
          <Text style={cliente ? styles.selectText : styles.selectPlaceholder}>
            {cliente || 'Selecione o cliente...'}
          </Text>
          <Ionicons name="chevron-down" size={20} color={Colors.textSecondary} />
        </TouchableOpacity>
        {showClientes && (
          <View style={styles.dropdown}>
            {CLIENTES_MOCK.map((c) => (
              <TouchableOpacity
                key={c}
                style={styles.dropdownItem}
                onPress={() => { setCliente(c); setShowClientes(false); }}
              >
                <Text style={styles.dropdownText}>{c}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <Text style={[styles.label, { marginTop: 16 }]}>Máquina *</Text>
        <TouchableOpacity
          style={styles.selectInput}
          onPress={() => setShowMaquinas(!showMaquinas)}
        >
          <Text style={maquina ? styles.selectText : styles.selectPlaceholder}>
            {maquina || 'Selecione a máquina...'}
          </Text>
          <Ionicons name="chevron-down" size={20} color={Colors.textSecondary} />
        </TouchableOpacity>
        {showMaquinas && (
          <View style={styles.dropdown}>
            {MAQUINAS_MOCK.map((m) => (
              <TouchableOpacity
                key={m}
                style={styles.dropdownItem}
                onPress={() => { setMaquina(m); setShowMaquinas(false); }}
              >
                <Text style={styles.dropdownText}>{m}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <Text style={styles.sectionTitle}>Valores</Text>

        <Text style={styles.label}>Valor Proposto (R$) *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 850000"
          placeholderTextColor={Colors.textSecondary}
          value={valor}
          onChangeText={setValor}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Desconto (%)</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 5"
          placeholderTextColor={Colors.textSecondary}
          value={desconto}
          onChangeText={setDesconto}
          keyboardType="numeric"
        />

        <Text style={styles.sectionTitle}>Condições</Text>

        <Text style={styles.label}>Forma de Pagamento</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 30/60/90 dias"
          placeholderTextColor={Colors.textSecondary}
          value={formaPagamento}
          onChangeText={setFormaPagamento}
        />

        <Text style={styles.label}>Prazo de Entrega</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 45 dias"
          placeholderTextColor={Colors.textSecondary}
          value={prazoEntrega}
          onChangeText={setPrazoEntrega}
        />

        <Text style={styles.label}>Observações</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Observações adicionais..."
          placeholderTextColor={Colors.textSecondary}
          value={observacoes}
          onChangeText={setObservacoes}
          multiline
          numberOfLines={4}
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Ionicons name="send" size={20} color={Colors.white} />
          <Text style={styles.submitButtonText}>Enviar Proposta</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  form: { padding: 16 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
    marginTop: 20,
    marginBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: Colors.secondary,
    paddingBottom: 6,
  },
  label: { fontSize: 14, fontWeight: '600', color: Colors.text, marginBottom: 6, marginTop: 10 },
  input: {
    backgroundColor: Colors.surface,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    color: Colors.text,
  },
  textArea: { minHeight: 100, textAlignVertical: 'top' },
  selectInput: {
    backgroundColor: Colors.surface,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectText: { fontSize: 16, color: Colors.text },
  selectPlaceholder: { fontSize: 16, color: Colors.textSecondary },
  dropdown: {
    backgroundColor: Colors.surface,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    marginTop: 4,
    elevation: 4,
  },
  dropdownItem: { paddingVertical: 12, paddingHorizontal: 14, borderBottomWidth: 1, borderBottomColor: Colors.border },
  dropdownText: { fontSize: 15, color: Colors.text },
  submitButton: {
    backgroundColor: Colors.success,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 24,
    marginBottom: 40,
    gap: 10,
    elevation: 4,
  },
  submitButtonText: { color: Colors.white, fontSize: 18, fontWeight: 'bold' },
});