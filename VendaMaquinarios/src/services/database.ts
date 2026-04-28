import { Platform } from 'react-native';

let db: any = null;
let mockData: any = {
  maquinas: [],
  clientes: [],
  propostas: [],
  vendas: [],
  estoque: [],
  notasFiscais: [],
};

let nextId = 1;
const getNextId = () => nextId++;

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
        tx.executeSql(`CREATE TABLE IF NOT EXISTS maquinas (
          id INTEGER PRIMARY KEY AUTOINCREMENT, codigo TEXT UNIQUE, nome TEXT NOT NULL,
          fabricante TEXT, modelo TEXT, ano INTEGER, preco_compra REAL, preco_venda REAL,
          categoria TEXT, status TEXT DEFAULT 'disponivel', imagem TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );`);

        tx.executeSql(`CREATE TABLE IF NOT EXISTS clientes (
          id INTEGER PRIMARY KEY AUTOINCREMENT, razao_social TEXT NOT NULL,
          nome_fantasia TEXT, cnpj TEXT UNIQUE, inscricao_estadual TEXT,
          telefone TEXT, email TEXT, endereco TEXT, cidade TEXT, estado TEXT,
          cep TEXT, segmento TEXT, status TEXT DEFAULT 'ativo',
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );`);

        tx.executeSql(`CREATE TABLE IF NOT EXISTS estoque (
          id INTEGER PRIMARY KEY AUTOINCREMENT, maquina_id INTEGER,
          quantidade INTEGER DEFAULT 0, quantidade_minima INTEGER DEFAULT 1,
          localizacao TEXT, fornecedor TEXT, ultima_compra DATE,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (maquina_id) REFERENCES maquinas(id)
        );`);

        tx.executeSql(`CREATE TABLE IF NOT EXISTS propostas (
          id INTEGER PRIMARY KEY AUTOINCREMENT, numero TEXT UNIQUE,
          cliente_id INTEGER, maquina_id INTEGER, vendedor_id INTEGER,
          valor_proposto REAL, desconto REAL, forma_pagamento TEXT,
          parcelas INTEGER, entrada REAL, prazo_entrega TEXT,
          validade_proposta DATE, status TEXT DEFAULT 'pendente',
          observacoes TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (cliente_id) REFERENCES clientes(id),
          FOREIGN KEY (maquina_id) REFERENCES maquinas(id)
        );`);

        tx.executeSql(`CREATE TABLE IF NOT EXISTS vendas (
          id INTEGER PRIMARY KEY AUTOINCREMENT, proposta_id INTEGER,
          cliente_id INTEGER, maquina_id INTEGER, vendedor_id INTEGER,
          valor_final REAL, desconto REAL, forma_pagamento TEXT,
          parcelas INTEGER, valor_entrada REAL, valor_parcela REAL,
          status_pagamento TEXT DEFAULT 'pendente', data_venda DATE,
          data_entrega DATE, comissao REAL, observacoes TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (proposta_id) REFERENCES propostas(id),
          FOREIGN KEY (cliente_id) REFERENCES clientes(id),
          FOREIGN KEY (maquina_id) REFERENCES maquinas(id)
        );`);

        tx.executeSql(`CREATE TABLE IF NOT EXISTS notas_fiscais (
          id INTEGER PRIMARY KEY AUTOINCREMENT, venda_id INTEGER,
          numero TEXT UNIQUE, serie TEXT, data_emissao DATE,
          valor_total REAL, chave_acesso TEXT, status TEXT DEFAULT 'emitida',
          pdf_url TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (venda_id) REFERENCES vendas(id)
        );`);
      }, () => {}, resolve);
    } catch (error) {
      console.log('SQLite não disponível, usando mock');
      resolve();
    }
  });
};

// ============ CLIENTES ============
export const inserirCliente = (cliente: any): Promise<any> => {
  return new Promise((resolve) => {
    const id = getNextId();
    const novoCliente = { id, ...cliente, status: 'ativo', created_at: new Date().toISOString() };
    mockData.clientes.push(novoCliente);
    resolve({ insertId: id });
  });
};

export const listarClientes = (): Promise<any[]> => {
  return new Promise((resolve) => resolve([...mockData.clientes]));
};

export const excluirCliente = (id: number): Promise<void> => {
  return new Promise((resolve) => {
    mockData.clientes = mockData.clientes.filter((c: any) => c.id !== id);
    resolve();
  });
};

export const atualizarCliente = (id: number, dados: any): Promise<void> => {
  return new Promise((resolve) => {
    const index = mockData.clientes.findIndex((c: any) => c.id === id);
    if (index >= 0) mockData.clientes[index] = { ...mockData.clientes[index], ...dados };
    resolve();
  });
};

// ============ ESTOQUE ============
export const inserirEstoque = (item: any): Promise<any> => {
  return new Promise((resolve) => {
    const id = getNextId();
    mockData.estoque.push({ id, ...item, created_at: new Date().toISOString() });
    resolve({ insertId: id });
  });
};

export const listarEstoque = (): Promise<any[]> => {
  return new Promise((resolve) => resolve([...mockData.estoque]));
};

export const atualizarQuantidadeEstoque = (id: number, quantidade: number): Promise<void> => {
  return new Promise((resolve) => {
    const index = mockData.estoque.findIndex((e: any) => e.id === id);
    if (index >= 0) mockData.estoque[index].quantidade = quantidade;
    resolve();
  });
};

export const excluirEstoque = (id: number): Promise<void> => {
  return new Promise((resolve) => {
    mockData.estoque = mockData.estoque.filter((e: any) => e.id !== id);
    resolve();
  });
};

export const listarEstoqueBaixo = (): Promise<any[]> => {
  return new Promise((resolve) => {
    resolve(mockData.estoque.filter((e: any) => e.quantidade <= e.quantidade_minima));
  });
};

// ============ VENDAS ============
export const inserirVenda = (venda: any): Promise<any> => {
  return new Promise((resolve) => {
    const id = getNextId();
    const numero = `VD-${String(id).padStart(4, '0')}`;
    const novaVenda = {
      id,
      numero,
      ...venda,
      data_venda: new Date().toISOString().split('T')[0],
      status_pagamento: venda.forma_pagamento === 'a_vista' ? 'pago' : 'pendente',
      created_at: new Date().toISOString(),
    };
    mockData.vendas.push(novaVenda);
    
    // Atualizar estoque
    const itemEstoque = mockData.estoque.find((e: any) => e.maquina_id === venda.maquina_id);
    if (itemEstoque && itemEstoque.quantidade > 0) {
      itemEstoque.quantidade -= 1;
    }

    // Atualizar status da máquina
    const maquina = mockData.maquinas.find((m: any) => m.id === venda.maquina_id);
    if (maquina) maquina.status = 'vendido';

    // Atualizar proposta se existir
    if (venda.proposta_id) {
      const proposta = mockData.propostas.find((p: any) => p.id === venda.proposta_id);
      if (proposta) proposta.status = 'aprovado';
    }

    resolve({ insertId: id, numero });
  });
};

export const listarVendas = (): Promise<any[]> => {
  return new Promise((resolve) => resolve([...mockData.vendas]));
};

// ============ NOTAS FISCAIS ============
export const emitirNotaFiscal = (vendaId: number): Promise<any> => {
  return new Promise((resolve) => {
    const venda = mockData.vendas.find((v: any) => v.id === vendaId);
    if (!venda) { resolve(null); return; }

    const id = getNextId();
    const numero = `NF-${String(id).padStart(6, '0')}`;
    const nota = {
      id,
      venda_id: vendaId,
      numero,
      serie: '1',
      data_emissao: new Date().toISOString().split('T')[0],
      valor_total: venda.valor_final,
      chave_acesso: `${Date.now()}${id}`.padEnd(44, '0'),
      status: 'emitida',
      created_at: new Date().toISOString(),
    };
    mockData.notasFiscais.push(nota);
    venda.nota_fiscal = numero;
    resolve(nota);
  });
};

export const listarNotasFiscais = (): Promise<any[]> => {
  return new Promise((resolve) => resolve([...mockData.notasFiscais]));
};