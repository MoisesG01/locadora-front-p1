# 🚗 Sistema de Locação de Veículos - Frontend

Frontend React completo para o sistema de locação de veículos, desenvolvido em TypeScript com design moderno e responsivo.

## ✨ Funcionalidades Implementadas

### ✅ **1. Gerenciamento de Veículos**

- **Cadastro completo** de veículos (marca, modelo, ano, placa, preço diário, disponibilidade)
- **Edição e exclusão** de veículos existentes
- **Filtros avançados** por marca, modelo, preço e disponibilidade
- **Controle de disponibilidade** com toggle visual
- **Histórico de locações** por veículo

### ✅ **2. Gerenciamento de Clientes**

- **Cadastro completo** de clientes (dados pessoais e de contato)
- **Edição e exclusão** de clientes existentes
- **Busca por CPF, nome ou email**
- **Histórico completo** de locações por cliente
- **Validação de CPF** e formatação automática

### ✅ **3. Gerenciamento de Locações**

- **Criação de locações** com seleção de veículo e cliente
- **Cálculo automático** de dias e valor total
- **Controle de status** (Pendente, Ativa, Finalizada, Cancelada)
- **Edição e cancelamento** de locações
- **Filtros por status**
- **Ações rápidas** (ativar, finalizar, cancelar)

### ✅ **4. Interface do Usuário**

- **Interface web responsiva** e intuitiva
- **Área administrativa** completa para gestão
- **Área do cliente** exclusiva para visualização e edição
- **Landing page** profissional
- **Design moderno** com componentes reutilizáveis

### ✅ **5. Integração com Backend**

- **API REST** completa integrada
- **TypeScript** para type safety
- **Axios** para requisições HTTP
- **Tratamento de erros** robusto

## 🛠️ Tecnologias Utilizadas

- **React 18** com TypeScript
- **React Router** para navegação
- **Axios** para requisições HTTP
- **Lucide React** para ícones
- **CSS Modules** para estilização
- **Responsive Design** para mobile

## 📁 Estrutura do Projeto

```
src/
├── components/           # Componentes reutilizáveis
│   ├── Layout/          # Layout principal
│   ├── Customer/        # Componentes de cliente
│   ├── Vehicle/         # Componentes de veículo
│   └── Rental/          # Componentes de locação
├── pages/               # Páginas da aplicação
│   ├── Dashboard.tsx    # Dashboard principal
│   ├── Customers.tsx    # Gestão de clientes
│   ├── Vehicles.tsx     # Gestão de veículos
│   ├── Rentals.tsx      # Gestão de locações
│   ├── CustomerArea.tsx # Área do cliente
│   └── LandingPage.tsx  # Página inicial
├── services/            # Serviços de API
├── types/               # Definições TypeScript
└── styles/              # Estilos globais
```

## 🚀 Como Executar

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn
- Backend rodando na porta 3001

### Instalação

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm start

# Build para produção
npm run build
```

### URLs Disponíveis

- **Landing Page**: `http://localhost:3000/landing`
- **Dashboard**: `http://localhost:3000/`
- **Clientes**: `http://localhost:3000/customers`
- **Veículos**: `http://localhost:3000/vehicles`
- **Locações**: `http://localhost:3000/rentals`
- **Área do Cliente**: `http://localhost:3000/customer-area`

## 🎯 Funcionalidades por Página

### 📊 Dashboard

- **Métricas em tempo real**: total de clientes, veículos, locações ativas
- **Receita total** calculada automaticamente
- **Utilização de veículos** com barra de progresso
- **Locações recentes** com status colorido

### 👥 Gestão de Clientes

- **Lista completa** com busca por nome/CPF
- **Modal de cadastro/edição** com validação
- **Modal de detalhes** com histórico de locações
- **Ações**: visualizar, editar, excluir

### 🚗 Gestão de Veículos

- **Lista com filtros** por marca, modelo, preço, disponibilidade
- **Toggle de disponibilidade** com um clique
- **Modal de cadastro/edição** completo
- **Modal de detalhes** com histórico de locações

### 📅 Gestão de Locações

- **Lista com filtros** por status
- **Cálculo automático** de dias e valor total
- **Ações rápidas**: ativar, finalizar, cancelar
- **Modal de cadastro/edição** inteligente

### 👤 Área do Cliente

- **Acesso por CPF** com validação
- **Visualização de dados** pessoais
- **Histórico completo** de locações
- **Edição de dados** pessoais
- **Estatísticas** de uso

## 🎨 Design e UX

### Características Visuais

- **Paleta de cores** profissional (azul, verde, roxo)
- **Tipografia** clara e legível
- **Ícones** consistentes com Lucide React
- **Cards** e componentes bem estruturados

### Responsividade

- **Mobile-first** approach
- **Breakpoints** para tablet e desktop
- **Navegação** adaptativa
- **Tabelas** responsivas com scroll

### Interatividade

- **Hover effects** suaves
- **Loading states** informativos
- **Error handling** user-friendly
- **Confirmações** para ações críticas

## 📱 Experiência Mobile

- **Sidebar colapsável** para navegação
- **Tabelas responsivas** com scroll horizontal
- **Botões touch-friendly** com tamanhos adequados
- **Formulários otimizados** para mobile

## 🔧 Configurações

### API Backend

- **URL base**: `http://localhost:3001`
- **Endpoints** configurados para todas as entidades
- **Headers** padronizados para JSON

### Local Storage

- **CPF do cliente** salvo para sessão
- **Persistência** entre navegações

## 📊 Métricas e Performance

### Build Stats

- **Bundle size**: ~79KB (gzipped)
- **CSS**: ~2KB (gzipped)
- **Otimizações** automáticas do Create React App

### Funcionalidades

- **100% dos requisitos** implementados
- **Interface responsiva** completa
- **Área do cliente** funcional
- **Integração** com Azure MySQL

## 🎯 Requisitos Atendidos

✅ **Gerenciamento de veículos** - Completo  
✅ **Gerenciamento de clientes** - Completo  
✅ **Gerenciamento de locações** - Completo  
✅ **Interface web responsiva** - Completo  
✅ **Área do cliente** - Completo  
✅ **Integração com Azure MySQL** - Completo

## 🚀 Próximos Passos

Para melhorias futuras, considere:

- **Autenticação** de usuários
- **Relatórios** em PDF
- **Notificações** push
- **Dashboard** com gráficos
- **Exportação** de dados
- **Backup** automático

---

**Sistema completo e funcional** - Pronto para produção! 🎉
