import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useWindowDimensions, View, ActivityIndicator } from 'react-native';
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

const Drawer = createDrawerNavigator();

export default function App() {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
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
      <Drawer.Navigator
        screenOptions={{
          drawerType: isTablet ? 'permanent' : 'front',
          drawerStyle: {
            width: isTablet ? 300 : 260,
            backgroundColor: Colors.surface,
          },
          headerStyle: { backgroundColor: Colors.primary },
          headerTintColor: Colors.white,
          headerTitleStyle: { fontWeight: 'bold', fontSize: 18 },
        }}
      >
        <Drawer.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{
            title: '🏠 Painel de Vendas',
            drawerIcon: ({ color, size }) => <Ionicons name="grid" size={size} color={color} />,
          }}
        />
        <Drawer.Screen
          name="Catalogo"
          component={CatalogoScreen}
          options={{
            title: '🏗️ Catálogo de Máquinas',
            drawerIcon: ({ color, size }) => <Ionicons name="construct" size={size} color={color} />,
          }}
        />
        <Drawer.Screen
          name="Clientes"
          component={ClientesScreen}
          options={{
            title: '👥 Clientes',
            drawerIcon: ({ color, size }) => <Ionicons name="people" size={size} color={color} />,
          }}
        />
        <Drawer.Screen
          name="CadastroCliente"
          component={CadastroClienteScreen}
          options={{
            title: '📝 Cadastrar Cliente',
            drawerItemStyle: { display: 'none' },
          }}
        />
        <Drawer.Screen
          name="Propostas"
          component={PropostasScreen}
          options={{
            title: '📄 Propostas',
            drawerIcon: ({ color, size }) => <Ionicons name="document-text" size={size} color={color} />,
          }}
        />
        <Drawer.Screen
          name="NovaProposta"
          component={NovaPropostaScreen}
          options={{
            title: '📝 Nova Proposta',
            drawerItemStyle: { display: 'none' },
          }}
        />
        <Drawer.Screen
          name="NovaVenda"
          component={NovaVendaScreen}
          options={{
            title: '💰 Nova Venda',
            drawerIcon: ({ color, size }) => <Ionicons name="cart" size={size} color={color} />,
          }}
        />
        <Drawer.Screen
          name="Vendas"
          component={VendasScreen}
          options={{
            title: '📊 Vendas Realizadas',
            drawerIcon: ({ color, size }) => <Ionicons name="cash" size={size} color={color} />,
          }}
        />
        <Drawer.Screen
          name="Estoque"
          component={EstoqueScreen}
          options={{
            title: '📦 Estoque',
            drawerIcon: ({ color, size }) => <Ionicons name="cube" size={size} color={color} />,
          }}
        />
        <Drawer.Screen
          name="NotaFiscal"
          component={NotaFiscalScreen}
          options={{
            title: '🧾 Notas Fiscais',
            drawerIcon: ({ color, size }) => <Ionicons name="receipt" size={size} color={color} />,
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}