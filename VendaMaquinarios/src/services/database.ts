import * as SQLite from 'expo-sqlite';

let db: SQLite.WebSQLDatabase;

export const initDatabase = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      db = SQLite.openDatabase('venda_maquinarios.db');
      
      db.transaction((tx) => {
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
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (cliente_id) REFERENCES clientes(id),
            FOREIGN KEY (maquina_id) REFERENCES maquinas(id)
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
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (proposta_id) REFERENCES propostas(id),
            FOREIGN KEY (cliente_id) REFERENCES clientes(id),
            FOREIGN KEY (maquina_id) REFERENCES maquinas(id)
          );
        `);
      }, reject, resolve);
    } catch (error) {
      reject(error);
    }
  });
};

export const getDatabase = () => db;

// CRUD - Máquinas
export const inserirMaquina = (maquina: any) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO maquinas (codigo, nome, fabricante, modelo, ano, preco) VALUES (?, ?, ?, ?, ?, ?)',
        [maquina.codigo, maquina.nome, maquina.fabricante, maquina.modelo, maquina.ano, maquina.preco],
        (_, result) => resolve(result),
        (_, error) => { reject(error); return false; }
      );
    });
  });
};

export const listarMaquinas = (): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM maquinas ORDER BY created_at DESC',
        [],
        (_, { rows }) => resolve(rows._array),
        (_, error) => { reject(error); return false; }
      );
    });
  });
};

// CRUD - Clientes
export const inserirCliente = (cliente: any) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO clientes (razao_social, nome_fantasia, cnpj, telefone, email, cidade, estado) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [cliente.razao_social, cliente.nome_fantasia, cliente.cnpj, cliente.telefone, cliente.email, cliente.cidade, cliente.estado],
        (_, result) => resolve(result),
        (_, error) => { reject(error); return false; }
      );
    });
  });
};

export const listarClientes = (): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM clientes ORDER BY created_at DESC',
        [],
        (_, { rows }) => resolve(rows._array),
        (_, error) => { reject(error); return false; }
      );
    });
  });
};