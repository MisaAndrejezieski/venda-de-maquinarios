import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { useWindowDimensions } from 'react-native';
import { Colors } from './src/constants/colors';
import CatalogoScreen from './src/screens/CatalogoScreen';
import ClientesScreen from './src/screens/ClientesScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import PropostasScreen from './src/screens/PropostasScreen';
import VendasScreen from './src/screens/VendasScreen';

const Drawer = createDrawerNavigator();

export default function App() {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

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