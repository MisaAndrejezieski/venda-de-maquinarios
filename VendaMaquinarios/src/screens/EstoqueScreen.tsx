import React, { useState, useCallback } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
  TextInput, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { useFocusEffect } from '@react-navigation/native';
import { listarEstoque, excluirEstoque, listarEstoqueBaixo } from '../services/database';

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
            <Text style={styles