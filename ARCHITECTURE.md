# ARCHITECTURE.md - Arquitetura da Aplicação

## Visão Geral
O **Todo App** segue a arquitetura em **três camadas** (3-Tier Architecture) com separação clara entre apresentação, lógica de negócio e persistência de dados.

## Camadas da Aplicação

### 1. **Presentation Layer (Frontend)**
- **Tecnologia**: React + TypeScript + Vite
- **Responsabilidades**:
  - Interface de usuário para criação, leitura, atualização e exclusão de tarefas
  - Validação de entrada no cliente
  - Consumo da API REST do backend
  - Gestão de estado da aplicação (Zustand ou Context API)
- **Estrutura**:
  ```
  frontend/
  ├── src/
  │   ├── components/     # Componentes reutilizáveis
  │   ├── pages/          # Páginas principais
  │   ├── stores/         # Gestão de estado
  │   ├── services/       # Clientes HTTP
  │   ├── types/          # Tipos TypeScript
  │   └── App.tsx
  ├── index.html
  └── vite.config.ts
  ```

### 2. **Business Logic Layer (Backend)**
- **Tecnologia**: Node.js + Express + TypeScript
- **Responsabilidades**:
  - Implementação das regras de negócio
  - Validação de dados
  - Autenticação e autorização (opcional - futuro)
  - Orquestração entre requisições e banco de dados
- **Estrutura**:
  ```
  backend/
  ├── src/
  │   ├── controllers/    # Manipuladores de rotas
  │   ├── services/       # Lógica de negócio
  │   ├── middleware/     # Middlewares customizados
  │   ├── models/         # Modelos de dados
  │   ├── types/          # Tipos TypeScript
  │   ├── routes/         # Definição de rotas
  │   └── server.ts
  ├── package.json
  └── tsconfig.json
  ```

### 3. **Data Access Layer (Banco de Dados)**
- **Tecnologia**: SQLite com biblioteca nativa do Node.js
- **Responsabilidades**:
  - Persistência de dados
  - Consultas estruturadas (SQL)
  - Integridade referencial
- **Estrutura**:
  ```
  database/
  ├── todos.db            # Arquivo do banco de dados
  └── schema.sql          # Esquema inicial
  ```

## Fluxo de Dados

```
[Cliente HTTP] 
	↓
[Frontend - React]
	↓ (fetch/axios)
[Backend - Express API]
	↓ (routes → controllers)
[Services - Lógica de Negócio]
	↓ (read/write)
[SQLite Database]
```

## Padrões de Projeto Utilizados

1. **MVC** (Model-View-Controller): Controllers organizam lógica de rotas, Services contêm regras de negócio
2. **Repository Pattern**: Abstração para acesso ao banco de dados
3. **DTO** (Data Transfer Objects): Transferência estruturada de dados entre camadas
4. **Middleware Pattern**: Validação, logging e tratamento de erros centralizados

## Comunicação Entre Camadas

- **Frontend ↔ Backend**: HTTP REST com JSON
- **Backend ↔ Database**: Query builders e prepared statements

## Segurança

- Validação em duas camadas (cliente + servidor)
- Prepared statements contra SQL injection
- CORS configurado (opcional - futuro)
- Sanitização de entrada

---

**Última atualização**: 2024
