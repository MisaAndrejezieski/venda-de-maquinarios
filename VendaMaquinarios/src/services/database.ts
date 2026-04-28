import { Platform } from 'react-native';

let db: any = null;

// Dados mock para web
let mockMaquinas: any[] = [];
let mockClientes: any[] = [];

export const initDatabase = (): Promise<void> => {
  return new Promise((resolve) => {
    if (Platform.OS === 'web') {
      console.log('Usando armazenamento mock para web');
      resolve();
      return;
    }

    try {
      const SQLite = require('expo-sqlite');
      db = SQLite.openDatabase('venda_maquinarios.db');

      db.transaction((tx: any) => {
        tx.executeSql(`
          CREATE TABLE IF NOT EXISTS maquinas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            codigo TEXT UNIQUE,
            nome TEXT NOT NULL,
            fabricante TEXT,
            modelo TEXT,
            ano INTEGER,
            preco REAL,
            status TEXT DEFAULT 'disponivel',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
          );
        `);

        tx.executeSql(`
          CREATE TABLE IF NOT EXISTS clientes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            razao_social TEXT NOT NULL,
            nome_fantasia TEXT,
            cnpj TEXT UNIQUE,
            telefone TEXT,
            email TEXT,
            cidade TEXT,
            estado TEXT,
            status TEXT DEFAULT 'ativo',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
          );
        `);

        tx.executeSql(`
          CREATE TABLE IF NOT EXISTS propostas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            numero TEXT UNIQUE,
            cliente_id INTEGER,
            maquina_id INTEGER,
            valor REAL,
            status TEXT DEFAULT 'pendente',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
          );
        `);

        tx.executeSql(`
          CREATE TABLE IF NOT EXISTS vendas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            proposta_id INTEGER,
            cliente_id INTEGER,
            maquina_id INTEGER,
            valor_final REAL,
            comissao REAL,
            data_venda DATE,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
          );
        `);
      }, () => {}, resolve);
    } catch (error) {
      console.log('SQLite não disponível, usando mock');
      resolve();
    }
  });
};

export const getDatabase = () => db;

export const inserirMaquina = (maquina: any) => {
  return new Promise((resolve) => {
    if (Platform.OS === 'web' || !db) {
      mockMaquinas.push({ id: mockMaquinas.length + 1, ...maquina });
      resolve({ insertId: mockMaquinas.length });
      return;
    }
    db.transaction((tx: any) => {
      tx.executeSql(
        'INSERT INTO maquinas (codigo, nome, fabricante, modelo, ano, preco) VALUES (?, ?, ?, ?, ?, ?)',
        [maquina.codigo, maquina.nome, maquina.fabricante, maquina.modelo, maquina.ano, maquina.preco],
        (_: any, result: any) => resolve(result)
      );
    });
  });
};

export const listarMaquinas = (): Promise<any[]> => {
  return new Promise((resolve) => {
    if (Platform.OS === 'web' || !db) {
      resolve(mockMaquinas);
      return;
    }
    db.transaction((tx: any) => {
      tx.executeSql(
        'SELECT * FROM maquinas ORDER BY created_at DESC',
        [],
        (_: any, { rows }: any) => resolve(rows._array)
      );
    });
  });
};

export const inserirCliente = (cliente: any) => {
  return new Promise((resolve) => {
    if (Platform.OS === 'web' || !db) {
      mockClientes.push({ id: mockClientes.length + 1, ...cliente });
      resolve({ insertId: mockClientes.length });
      return;
    }
    db.transaction((tx: any) => {
      tx.executeSql(
        'INSERT INTO clientes (razao_social, nome_fantasia, cnpj, telefone, email, cidade, estado) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [cliente.razao_social, cliente.nome_fantasia, cliente.cnpj, cliente.telefone, cliente.email, cliente.cidade, cliente.estado],
        (_: any, result: any) => resolve(result)
      );
    });
  });
};

export const listarClientes = (): Promise<any[]> => {
  return new Promise((resolve) => {
    if (Platform.OS === 'web' || !db) {
      resolve(mockClientes);
      return;
    }
    db.transaction((tx: any) => {
      tx.executeSql(
        'SELECT * FROM clientes ORDER BY created_at DESC',
        [],
        (_: any, { rows }: any) => resolve(rows._array)
      );
    });
  });
};