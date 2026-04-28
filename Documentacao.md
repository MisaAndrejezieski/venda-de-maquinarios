📝 1. DOCUMENTAÇÃO DO PROJETO
Crie o arquivo DOCUMENTACAO.md na raiz do projeto:

markdown
# 📚 Documentação - Sistema de Venda de Maquinários

## Sumário
1. [Visão Geral](#visão-geral)
2. [Arquitetura](#arquitetura)
3. [Tecnologias](#tecnologias)
4. [Estrutura do Projeto](#estrutura-do-projeto)
5. [Funcionalidades](#funcionalidades)
6. [Banco de Dados](#banco-de-dados)
7. [Fluxos do Sistema](#fluxos-do-sistema)
8. [Instalação](#instalação)
9. [Guia de Uso](#guia-de-uso)

---

## Visão Geral

O **Sistema de Venda de Maquinários** é um aplicativo multiplataforma (Web, Android, iOS) desenvolvido para empresas que revendem máquinas e equipamentos industriais. O sistema oferece controle completo do ciclo de vendas, desde o cadastro de produtos até a emissão de notas fiscais.

### Público-Alvo
- Empresas de revenda de maquinários industriais
- Vendedores externos (uso em tablets)
- Gestores comerciais

---

## Arquitetura
┌─────────────────────────────────────────────────────────┐
│ CAMADA DE APRESENTAÇÃO │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ │
│ │ Web │ │ Tablet │ │ Mobile │ │
│ │ (React) │ │ (Android)│ │ (iOS) │ │
│ └────┬─────┘ └────┬─────┘ └────┬─────┘ │
│ └──────────────┼─────────────┘ │
│ ▼ │
│ React Native / Expo │
├─────────────────────────────────────────────────────────┤
│ CAMADA DE NEGÓCIO │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ │
│ │ Vendas │ │ Estoque │ │ NFe │ │
│ └────┬─────┘ └────┬─────┘ └────┬─────┘ │
│ └──────────────┼─────────────┘ │
│ ▼ │
│ Regras de Negócio │
├─────────────────────────────────────────────────────────┤
│ CAMADA DE DADOS │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ │
│ │ SQLite │ │ Mock │ │ Cache │ │
│ │ (Mobile) │ │ (Web) │ │ │ │
│ └──────────┘ └──────────┘ └──────────┘ │
└─────────────────────────────────────────────────────────┘

text

---

## Tecnologias

| Tecnologia | Versão | Finalidade |
|-----------|--------|------------|
| React Native | 0.76+ | Framework mobile |
| Expo | SDK 54 | Plataforma de desenvolvimento |
| TypeScript | 5.x | Linguagem tipada |
| React Navigation | 7.x | Navegação entre telas |
| expo-sqlite | - | Banco de dados local |
| expo-camera | - | Captura de fotos |
| react-native-chart-kit | - | Gráficos |
| date-fns | - | Manipulação de datas |

---

## Estrutura do Projeto
VendaMaquinarios/
├── src/
│ ├── screens/ # Telas do aplicativo
│ │ ├── LoginScreen.tsx
│ │ ├── DashboardScreen.tsx
│ │ ├── CatalogoScreen.tsx
│ │ ├── ClientesScreen.tsx
│ │ ├── CadastroClienteScreen.tsx
│ │ ├── PropostasScreen.tsx
│ │ ├── NovaPropostaScreen.tsx
│ │ ├── NovaVendaScreen.tsx
│ │ ├── VendasScreen.tsx
│ │ ├── EstoqueScreen.tsx
│ │ └── NotaFiscalScreen.tsx
│ ├── components/ # Componentes reutilizáveis
│ │ └── CameraButton.tsx
│ ├── services/ # Serviços e APIs
│ │ └── database.ts # Banco de dados
│ ├── constants/ # Constantes e temas
│ │ └── colors.ts
│ ├── hooks/ # Custom hooks
│ └── utils/ # Funções utilitárias
│ └── formatters.ts
├── assets/ # Imagens e fontes
├── App.tsx # Componente principal
├── app.json # Configuração Expo
├── package.json # Dependências
└── tsconfig.json # Config TypeScript

text

---

## Funcionalidades

### 🔐 Autenticação
- Tela de login
- Validação de campos
- Controle de sessão

### 🏠 Dashboard
- Métricas de vendas (total, propostas, clientes, comissões)
- Gráfico de vendas mensais (linha)
- Gráfico de máquinas por categoria (barras)

### 🏗️ Catálogo de Máquinas
- Listagem em grid responsivo
- Busca por nome/fabricante
- Filtro por status (disponível, reservado, vendido)
- Visualização de detalhes

### 👥 Gestão de Clientes
- Cadastro completo (razão social, CNPJ, contato, endereço)
- Listagem com busca
- Visualização de detalhes
- Exclusão (long press)

### 📄 Propostas Comerciais
- Criação de propostas
- Seleção de cliente e máquina
- Definição de valores e condições
- Filtro por status (pendente, aprovado, recusado)

### 💰 Vendas
- Fechamento de venda
- Múltiplas formas de pagamento:
  - 💵 À Vista
  - 💳 Cartão de Crédito
  - 💳 Cartão de Débito
  - 📱 PIX
  - 🧾 Boleto
  - 📅 Parcelado (com entrada)
- Cálculo automático de parcelas
- Desconto automático do estoque
- Vinculação com proposta (opcional)

### 📦 Controle de Estoque
- Cadastro de itens
- Quantidade atual e mínima
- Alerta de estoque baixo (destacado em vermelho)
- Busca por item
- Exclusão de itens
- Atualização automática ao vender

### 🧾 Notas Fiscais
- Emissão de NF para vendas realizadas
- Número sequencial automático
- Chave de acesso
- Histórico de notas emitidas

### 📷 Câmera
- Captura de fotos das máquinas
- Seleção da galeria
- Preview da imagem

---

## Banco de Dados

### Diagrama Entidade-Relacionamento
┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│ CLIENTES │ │ MÁQUINAS │ │ ESTOQUE │
├─────────────┤ ├─────────────┤ ├─────────────┤
│ id (PK) │ │ id (PK) │ │ id (PK) │
│ razao_social│ │ codigo │ │ maquina_id │───┐
│ cnpj │ │ nome │ │ quantidade │ │
│ telefone │ │ fabricante │ │ qtd_minima │ │
│ email │ │ preco_venda │ │ localizacao │ │
│ cidade │ │ status │ └─────────────┘ │
└──────┬──────┘ └──────┬──────┘ │
│ │ │
│ ┌─────────────┴─────────────┐ │
│ │ │ │
▼ ▼ ▼ │
┌─────────────┐ ┌─────────────┐ │
│ PROPOSTAS │ │ VENDAS │ │
├─────────────┤ ├─────────────┤ │
│ id (PK) │ │ id (PK) │ │
│ cliente_id │────▶│ cliente_id │ │
│ maquina_id │────▶│ maquina_id │───────────────────────┘
│ valor │ │ proposta_id │
│ status │ │ valor_final │
└─────────────┘ │ forma_pag │
│ parcelas │
│ comissao │
└──────┬──────┘
│
▼
┌─────────────┐
│ NOTAS FISCAIS│
├─────────────┤
│ id (PK) │
│ venda_id │
│ numero │
│ serie │
│ chave_acesso│
│ valor_total │
└─────────────┘

text

### Tabelas

1. **clientes** - Dados cadastrais dos clientes
2. **maquinas** - Catálogo de máquinas
3. **estoque** - Controle de estoque vinculado às máquinas
4. **propostas** - Propostas comerciais
5. **vendas** - Vendas realizadas
6. **notas_fiscais** - Notas fiscais emitidas

---

## Fluxos do Sistema

### Fluxo de Venda Completa
INÍCIO
↓

Cadastrar Máquina no Estoque
↓

Cadastrar Cliente
↓

[OPCIONAL] Criar Proposta
↓

Abrir Nova Venda
├── Selecionar Cliente
├── Selecionar Máquina
├── Definir Valor
├── Escolher Pagamento
│ ├── À Vista
│ ├── Cartão (Crédito/Débito)
│ ├── PIX
│ ├── Boleto
│ └── Parcelado
│ ├── Nº Parcelas
│ └── Entrada
└── Fechar Venda
↓

Sistema automaticamente:
├── Desconta 1 do estoque
├── Atualiza status da máquina
└── Atualiza proposta (se houver)
↓

Emitir Nota Fiscal
↓

FIM

text

---

## Instalação

### Pré-requisitos
- Node.js 18+
- npm ou yarn
- Expo Go (para testar no tablet/celular)

### Passos

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/venda-maquinarios.git

# 2. Entre na pasta
cd venda-maquinarios/VendaMaquinarios

# 3. Instale as dependências
npm install

# 4. Inicie o projeto
npx expo start

# 5. Para web
npx expo start --web

# 6. Para tablet/celular
# Escaneie o QR code com o app Expo Go
Guia de Uso
Primeiro Acesso
Faça login com qualquer email/senha

O Dashboard será exibido com dados de exemplo

Cadastrar Produto no Estoque
Menu → 📦 Estoque → Novo Item

Preencha nome, quantidade, quantidade mínima

Salvar

Cadastrar Cliente
Menu → 👥 Clientes → Botão (+)

Preencha razão social e demais dados

Salvar

Realizar uma Venda
Menu → 💰 Nova Venda

Digite nome do cliente e máquina

Informe o valor total

Selecione a forma de pagamento

Se parcelado, defina nº de parcelas e entrada

Clique em FECHAR VENDA

Emitir Nota Fiscal
Menu → 🧾 Notas Fiscais

Na aba "Vendas", localize a venda

Clique em "Emitir NF"

Confirme

Verificar Estoque Baixo
Menu → 📦 Estoque

Clique em "⚠️ Estoque Baixo"

Itens em vermelho precisam de reposição

Manutenção e Suporte
Atualização de dependências
bash
npm update
npx expo upgrade
Problemas comuns
Problema	Solução
App não carrega no navegador	Execute npx expo start --clear
Erro de SQLite na web	Normal - usa armazenamento mock
Câmera não funciona na web	Funciona apenas no dispositivo físico
Expo Go não conecta	Verifique se está na mesma rede WiFi
Licença
Este projeto é de uso livre para fins comerciais e educacionais.

Contato
Desenvolvido para gestão de vendas de maquinários industriais.

Versão: 1.0.0
Última atualização: Abril/2026

text

---

## 📖 2. README PARA GITHUB

Crie o arquivo `README.md` na raiz do projeto (`D:\Projetos\venda de maquinarios\`):

```markdown
# 🏗️ Sistema de Venda de Maquinários

![React Native](https://img.shields.io/badge/React_Native-0.76-61DAFB?logo=react)
![Expo](https://img.shields.io/badge/Expo-SDK_54-000020?logo=expo)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green)

Aplicativo multiplataforma para gestão completa de vendas de máquinas e equipamentos industriais. Desenvolvido para tablets e web.

<p align="center">
  <img src="https://img.icons8.com/color/96/gears.png" alt="Logo" width="120"/>
</p>

---

## ✨ Funcionalidades

- 🔐 **Autenticação** - Login seguro
- 🏠 **Dashboard** - Métricas e gráficos de desempenho
- 🏗️ **Catálogo** - Grid de máquinas com busca e filtros
- 👥 **Clientes** - Cadastro completo (CNPJ, contatos, endereço)
- 📄 **Propostas** - Criação e acompanhamento
- 💰 **Vendas** - Fechamento com múltiplos pagamentos
- 📦 **Estoque** - Controle com alertas de estoque baixo
- 🧾 **Notas Fiscais** - Emissão automática
- 📷 **Câmera** - Fotos das máquinas

### 💳 Formas de Pagamento
| Tipo | Suporte |
|------|---------|
| 💵 À Vista | ✅ |
| 💳 Cartão de Crédito | ✅ |
| 💳 Cartão de Débito | ✅ |
| 📱 PIX | ✅ |
| 🧾 Boleto | ✅ |
| 📅 Parcelado (c/ entrada) | ✅ |

---

## 📸 Screenshots

### Login
┌──────────────────────────────┐
│ 🔧 │
│ Venda de Maquinários │
│ Sistema de Gestão │
│ │
│ ┌──────────────────────┐ │
│ │ 📧 Email │ │
│ │ 🔒 Senha │ │
│ │ [ ENTRAR ] │ │
│ │ Esqueci minha senha │ │
│ └──────────────────────┘ │
└──────────────────────────────┘

text

### Dashboard
┌──────────────────────────────────────────┐
│ 🏠 Painel de Vendas │
│ Bom dia, Vendedor! │
│ │
│ ┌────────┐ ┌────────┐ ┌────────┐ ┌─────┐
│ │ R$3.2M │ │ 12 │ │ 48 │ │64K │
│ │ Vendas │ │Propost.│ │Clientes│ │Com. │
│ └────────┘ └────────┘ └────────┘ └─────┘
│ │
│ 📈 Vendas Mensais │
│ [GRÁFICO DE LINHA] │
│ │
│ 📊 Máquinas por Categoria │
│ [GRÁFICO DE BARRAS] │
└──────────────────────────────────────────┘

text

---

## 🚀 Instalação Rápida

```bash
# Clone o projeto
git clone https://github.com/seu-usuario/venda-maquinarios.git

# Entre na pasta do app
cd venda-maquinarios/VendaMaquinarios

# Instale as dependências
npm install

# Execute
npx expo start
Pressione w para web ou escaneie o QR code com Expo Go no tablet.

🛠️ Tecnologias
Tech	Uso
React Native	Framework mobile
Expo	Build e deploy
TypeScript	Tipagem estática
React Navigation	Navegação drawer
expo-sqlite	Banco de dados local
react-native-chart-kit	Gráficos
expo-camera	Captura de fotos
📁 Estrutura
text
VendaMaquinarios/
├── src/
│   ├── screens/        # 11 telas
│   ├── components/     # Componentes reutilizáveis
│   ├── services/       # Banco de dados e APIs
│   ├── constants/      # Cores e temas
│   └── utils/          # Formatadores
├── assets/             # Imagens
├── App.tsx             # Entry point
└── package.json
📖 Documentação Completa
Veja DOCUMENTACAO.md para:

Arquitetura detalhada

Diagrama do banco de dados

Fluxos do sistema

Guia de uso completo

🎯 Fluxo Principal
text
📦 Estoque → 👥 Cliente → 💰 Venda → 🧾 Nota Fiscal
                    ↓
              🏠 Dashboard (métricas atualizadas)
🔄 Integrações
Estoque → Venda: Desconta automaticamente ao vender

Proposta → Venda: Vincula e atualiza status

Venda → NF: Emissão com um clique

Tudo → Dashboard: Métricas em tempo real

📱 Plataformas
Plataforma	Status
🌐 Web	✅ Funcional
📱 Android	✅ Funcional (via Expo Go)
🍎 iOS	✅ Funcional (via Expo Go)
📟 Tablet	✅ Layout adaptativo
⚙️ Configuração
Banco de Dados
Mobile: SQLite nativo

Web: Armazenamento mock (dados em memória)

Cores Personalizadas
Edite src/constants/colors.ts:

typescript
export const Colors = {
  primary: '#1a237e',    // Azul escuro
  secondary: '#ff6f00',  // Laranja
  success: '#2e7d32',    // Verde
  // ...
};
🐛 Problemas Conhecidos
Problema	Solução
SQLite não funciona na web	Comportamento esperado
Câmera não abre na web	Use dispositivo físico
Expo Go não conecta	Mesma rede WiFi necessária
🤝 Contribuição
Contribuições são bem-vindas! Abra uma issue ou envie um PR.

📄 Licença
MIT - Livre para uso comercial e pessoal.

👨‍💻 Autor
Desenvolvido Misael Andrejezieski.

