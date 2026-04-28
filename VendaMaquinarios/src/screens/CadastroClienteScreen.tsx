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
import { inserirCliente } from '../services/database';

export default function CadastroClienteScreen({ navigation, route }: any) {
  const [razao_social, setRazaoSocial] = useState('');
  const [nome_fantasia, setNomeFantasia] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [segmento, setSegmento] = useState('');

  const handleSalvar = async () => {
    if (!razao_social) {
      Alert.alert('Atenção', 'Razão Social é obrigatória!');
      return;
    }

    await inserirCliente({
      razao_social,
      nome_fantasia,
      cnpj,
      telefone,
      email,
      cidade,
      estado,
      segmento,
    });

    Alert.alert('Sucesso!', 'Cliente cadastrado!', [
      { text: 'OK', onPress: () => {
        if (route.params?.onSave) route.params.onSave();
        navigation.goBack();
      }}
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.sectionTitle}>Dados do Cliente</Text>

        <Text style={styles.label}>Razão Social *</Text>
        <TextInput style={styles.input} value={razao_social} onChangeText={setRazaoSocial} placeholder="Ex: Indústria ABC Ltda" placeholderTextColor={Colors.textSecondary} />

        <Text style={styles.label}>Nome Fantasia</Text>
        <TextInput style={styles.input} value={nome_fantasia} onChangeText={setNomeFantasia} placeholder="Ex: ABC Industrial" placeholderTextColor={Colors.textSecondary} />

        <Text style={styles.label}>CNPJ</Text>
        <TextInput style={styles.input} value={cnpj} onChangeText={setCnpj} placeholder="00.000.000/0000-00" placeholderTextColor={Colors.textSecondary} keyboardType="numeric" />

        <Text style={styles.label}>Telefone</Text>
        <TextInput style={styles.input} value={telefone} onChangeText={setTelefone} placeholder="(00) 00000-0000" placeholderTextColor={Colors.textSecondary} keyboardType="phone-pad" />

        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="contato@empresa.com.br" placeholderTextColor={Colors.textSecondary} keyboardType="email-address" />

        <Text style={styles.sectionTitle}>Localização</Text>

        <Text style={styles.label}>Cidade</Text>
        <TextInput style={styles.input} value={cidade} onChangeText={setCidade} placeholder="Ex: São Paulo" placeholderTextColor={Colors.textSecondary} />

        <Text style={styles.label}>Estado</Text>
        <TextInput style={styles.input} value={estado} onChangeText={setEstado} placeholder="Ex: SP" placeholderTextColor={Colors.textSecondary} maxLength={2} />

        <Text style={styles.label}>Segmento</Text>
        <TextInput style={styles.input} value={segmento} onChangeText={setSegmento} placeholder="Ex: Metalurgia" placeholderTextColor={Colors.textSecondary} />

        <TouchableOpacity style={styles.saveButton} onPress={handleSalvar}>
          <Ionicons name="save" size={20} color={Colors.white} />
          <Text style={styles.saveButtonText}>Salvar Cliente</Text>
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
  saveButton: {
    backgroundColor: Colors.success, flexDirection: 'row',
    justifyContent: 'center', alignItems: 'center', paddingVertical: 16,
    borderRadius: 12, marginTop: 24, marginBottom: 40, gap: 10, elevation: 4,
  },
  saveButtonText: { color: Colors.white, fontSize: 18, fontWeight: 'bold' },
});