import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, ActivityIndicator, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from './src/constants/colors';
import { initDatabase } from './src/services/database';

import LoginScreen from './src/screens/LoginScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import CatalogoScreen from './src/screens/CatalogoScreen';
import ClientesScreen from './src/screens/ClientesScreen';
import CadastroClienteScreen from './src/screens/CadastroClienteScreen';
import PropostasScreen from './src/screens/PropostasScreen';
import NovaPropostaScreen from './src/screens/NovaPropostaScreen';
import NovaVendaScreen from './src/screens/NovaVendaScreen';
import VendasScreen from './src/screens/VendasScreen';
import EstoqueScreen from './src/screens/EstoqueScreen';
import NotaFiscalScreen from './src/screens/NotaFiscalScreen';

const Stack = createNativeStackNavigator();

const screenOptions = {
  headerStyle: { backgroundColor: Colors.primary },
  headerTintColor: Colors.white,
  headerTitleStyle: { fontWeight: 'bold' as const, fontSize: 18 },
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dbReady, setDbReady] = useState(false);

  useEffect(() => {
    initDatabase().then(() => setDbReady(true)).catch(() => setDbReady(true));
  }, []);

  if (!dbReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.primary }}>
        <ActivityIndicator size="large" color={Colors.white} />
      </View>
    );
  }

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={({ navigation }) => ({
            title: '🏠 Painel de Vendas',
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Menu')} style={{ marginLeft: 10 }}>
                <Ionicons name="menu" size={26} color={Colors.white} />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen name="Menu" component={MenuScreen} options={{ title: '📋 Menu' }} />
        <Stack.Screen name="Catalogo" component={CatalogoScreen} options={{ title: '🏗️ Catálogo' }} />
        <Stack.Screen name="Clientes" component={ClientesScreen} options={{ title: '👥 Clientes' }} />
        <Stack.Screen name="CadastroCliente" component={CadastroClienteScreen} options={{ title: '📝 Cadastrar Cliente' }} />
        <Stack.Screen name="Propostas" component={PropostasScreen} options={{ title: '📄 Propostas' }} />
        <Stack.Screen name="NovaProposta" component={NovaPropostaScreen} options={{ title: '📝 Nova Proposta' }} />
        <Stack.Screen name="NovaVenda" component={NovaVendaScreen} options={{ title: '💰 Nova Venda' }} />
        <Stack.Screen name="Vendas" component={VendasScreen} options={{ title: '📊 Vendas Realizadas' }} />
        <Stack.Screen name="Estoque" component={EstoqueScreen} options={{ title: '📦 Estoque' }} />
        <Stack.Screen name="NotaFiscal" component={NotaFiscalScreen} options={{ title: '🧾 Notas Fiscais' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function MenuScreen({ navigation }: any) {
  const menuItems = [
    { name: 'Dashboard', title: '🏠 Painel de Vendas', icon: 'grid' },
    { name: 'Catalogo', title: '🏗️ Catálogo de Máquinas', icon: 'construct' },
    { name: 'Clientes', title: '👥 Clientes', icon: 'people' },
    { name: 'Propostas', title: '📄 Propostas', icon: 'document-text' },
    { name: 'NovaVenda', title: '💰 Nova Venda', icon: 'cart' },
    { name: 'Vendas', title: '📊 Vendas Realizadas', icon: 'cash' },
    { name: 'Estoque', title: '📦 Estoque', icon: 'cube' },
    { name: 'NotaFiscal', title: '🧾 Notas Fiscais', icon: 'receipt' },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background, padding: 16 }}>
      {menuItems.map((item) => (
        <TouchableOpacity
          key={item.name}
          style={{
            backgroundColor: Colors.surface,
            padding: 16,
            borderRadius: 12,
            marginBottom: 8,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => navigation.navigate(item.name)}
        >
          <Ionicons name={item.icon as any} size={24} color={Colors.primary} />
          <Text style={{ fontSize: 16, marginLeft: 12, color: Colors.text }}>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}