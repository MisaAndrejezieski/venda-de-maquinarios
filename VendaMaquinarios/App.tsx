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
import PropostasScreen from './src/screens/PropostasScreen';
import NovaPropostaScreen from './src/screens/NovaPropostaScreen';
import VendasScreen from './src/screens/VendasScreen';

const Drawer = createDrawerNavigator();

export default function App() {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dbReady, setDbReady] = useState(false);

  useEffect(() => {
    initDatabase()
      .then(() => setDbReady(true))
      .catch((err) => console.error('Erro DB:', err));
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
            drawerIcon: ({ color, size }) => <Ionicons name="add-circle" size={size} color={color} />,
          }}
        />
        <Drawer.Screen
          name="Vendas"
          component={VendasScreen}
          options={{
            title: '💰 Vendas Realizadas',
            drawerIcon: ({ color, size }) => <Ionicons name="cash" size={size} color={color} />,
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}