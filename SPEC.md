# SPEC.md - Especificação Técnica - Feature 1: CRUD de Tarefas

## 1. Escopo da Feature

Implementar as operações CRUD (Create, Read, Update, Delete) completas para tarefas (todos) na aplicação.

### Objetivos

- [x] Permitir criação de novas tarefas
- [x] Listar tarefas com filtros e ordenação
- [x] Atualizar tarefas existentes
- [x] Deletar tarefas
- [x] Validar dados em cliente e servidor

## 2. Histórias de Usuário (User Stories)

### US-001: Criar Tarefa
**Como** usuário  
**Quero** criar uma nova tarefa com título, descrição e prioridade  
**Para que** eu possa organizar minha lista de tarefas

**Critério de Aceitação:**
- [ ] Campo de título obrigatório e validado (1-255 chars)
- [ ] Prioridade com 3 opções: low, medium, high (default: medium)
- [ ] Descrição opcional (0-1000 chars)
- [ ] Botão "Criar" desabilitado enquanto título vazio
- [ ] Confirmação visual após criação
- [ ] Form resetado após envio bem-sucedido
- [ ] Mensagem de erro se envio falhar

### US-002: Listar Tarefas
**Como** usuário  
**Quero** visualizar todas as minhas tarefas em uma lista  
**Para que** eu possa acompanhar o que preciso fazer

**Critério de Aceitação:**
- [ ] Tarefas listadas em ordem de criação (mais recentes primeiro)
- [ ] Exibição de: título, status, prioridade, dueDate (se houver)
- [ ] Indicador visual de prioridade (cores diferentes)
- [ ] Indicador visual de status (ícones ou cores)
- [ ] Loading spinner enquanto carrega dados
- [ ] Mensagem "Nenhuma tarefa" se lista vazia
- [ ] Paginação (opcional v1) ou scroll infinito

### US-003: Filtrar Tarefas
**Como** usuário  
**Quero** filtrar tarefas por status, prioridade ou categoria  
**Para que** eu possa focar no que é importante

**Critério de Aceitação:**
- [ ] Filtro por status (Pending, In Progress, Completed)
- [ ] Filtro por prioridade (Low, Medium, High)
- [ ] Filtro por categoria (Work, Personal, Shopping, Health, Other)
- [ ] Múltiplos filtros podem ser aplicados simultaneamente
- [ ] Botão "Limpar Filtros" reseta seleção
- [ ] Contador de tarefas filtrando
- [ ] Resultados atualizam em tempo real

### US-004: Atualizar Tarefa
**Como** usuário  
**Quero** editar uma tarefa existente  
**Para que** eu possa corrigir informações ou marcar como completa

**Critério de Aceitação:**
- [ ] Clicar em tarefa abre modal/página de edição
- [ ] Campos pré-preenchidos com dados atuais
- [ ] Validações mesmas de criação (título obrigatório, etc.)
- [ ] Botão "Salvar" envia alterações ao servidor
- [ ] Status pode ser alterado (pending → in_progress → completed)
- [ ] Confirmação visual após atualização
- [ ] Mensagem de erro se falhar
- [ ] Botão "Cancelar" fecha editor sem salvar

### US-005: Deletar Tarefa
**Como** usuário  
**Quero** remover uma tarefa que não preciso mais  
**Para que** eu mantenha minha lista limpa

**Critério de Aceitação:**
- [ ] Ícone/botão de delete em cada tarefa
- [ ] Confirmação de diálogo antes de deletar
- [ ] Mensagem de alerta clara (ex: "Esta ação é irreversível")
- [ ] Tarefa removida da lista imediatamente após confirmação
- [ ] Mensagem de sucesso
- [ ] Mensagem de erro se operação falhar

## 3. Endpoints da API

### BASE_URL: `http://localhost:3000/api`

#### 3.1 POST /todos
**Descrição**: Criar uma nova tarefa

**Request**:
```json
{
  "title": "Estudar TypeScript",
  "description": "Revisar tipos avançados",
  "priority": "high",
  "dueDate": "2024-12-31",
  "category": "Work"
}
```

**Response** (201 Created):
```json
{
  "success": true,
  "data": {
	"id": 1,
	"title": "Estudar TypeScript",
	"description": "Revisar tipos avançados",
	"status": "pending",
	"priority": "high",
	"dueDate": "2024-12-31",
	"category": "Work",
	"createdAt": "2024-01-15T10:30:00Z",
	"updatedAt": "2024-01-15T10:30:00Z"
  },
  "message": "Tarefa criada com sucesso"
}
```

**Validações**:
- 400: title vazio ou > 255 chars
- 400: priority inválido
- 400: dueDate no passado

---

#### 3.2 GET /todos
**Descrição**: Listar todas as tarefas com filtros opcionais

**Query Parameters**:
```
?status=pending&priority=high&category=Work&sort=createdAt&order=desc
```

**Response** (200 OK):
```json
{
  "success": true,
  "data": [
	{
	  "id": 1,
	  "title": "Estudar TypeScript",
	  "description": "Revisar tipos avançados",
	  "status": "pending",
	  "priority": "high",
	  "dueDate": "2024-12-31",
	  "category": "Work",
	  "createdAt": "2024-01-15T10:30:00Z",
	  "updatedAt": "2024-01-15T10:30:00Z"
	}
  ],
  "message": "Tarefas recuperadas"
}
```

---

#### 3.3 GET /todos/:id
**Descrição**: Obter detalhes de uma tarefa específica

**Response** (200 OK):
```json
{
  "success": true,
  "data": { /* todo object */ },
  "message": "Tarefa encontrada"
}
```

**Validações**:
- 404: Tarefa não encontrada

---

#### 3.4 PUT /todos/:id
**Descrição**: Atualizar uma tarefa existente

**Request**:
```json
{
  "title": "Estudar TypeScript - Avançado",
  "status": "in_progress",
  "priority": "medium",
  "dueDate": "2024-12-25"
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "data": { /* todo object atualizado */ },
  "message": "Tarefa atualizada com sucesso"
}
```

**Validações**:
- 404: Tarefa não encontrada
- 400: Dados inválidos (mesmas validações de POST)

---

#### 3.5 DELETE /todos/:id
**Descrição**: Deletar uma tarefa permanentemente

**Response** (200 OK):
```json
{
  "success": true,
  "data": { "id": 1 },
  "message": "Tarefa deletada com sucesso"
}
```

**Validações**:
- 404: Tarefa não encontrada

---

## 4. Modelos de Dados

### Todo (Database Schema)

```sql
CREATE TABLE todos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status ENUM('pending', 'in_progress', 'completed') DEFAULT 'pending',
  priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
  due_date DATE,
  category VARCHAR(50),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### TypeScript Types

#### Backend (src/types/index.ts)
```typescript
export type TodoStatus = 'pending' | 'in_progress' | 'completed';
export type TodoPriority = 'low' | 'medium' | 'high';

export interface Todo {
  id: number;
  title: string;
  description?: string;
  status: TodoStatus;
  priority: TodoPriority;
  dueDate?: string; // ISO 8601 date
  category?: string;
  createdAt: string; // ISO 8601 datetime
  updatedAt: string; // ISO 8601 datetime
}

export interface CreateTodoDTO {
  title: string;
  description?: string;
  priority?: TodoPriority;
  dueDate?: string;
  category?: string;
}

export interface UpdateTodoDTO {
  title?: string;
  description?: string;
  status?: TodoStatus;
  priority?: TodoPriority;
  dueDate?: string;
  category?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message: string;
  details?: Record<string, any>;
}
```

#### Frontend (src/types/index.ts)
Mesmos tipos acima, compartilhados via tipo/interface.

---

## 5. Componentes Frontend

### Estrutura React

```
frontend/src/
├── components/
│   ├── TodoForm.tsx          # Form de criação/edição
│   ├── TodoList.tsx          # Lista de tarefas
│   ├── TodoItem.tsx          # Tarefa individual
│   ├── TodoFilters.tsx       # Filtros
│   ├── TodoModal.tsx         # Modal de edição
│   └── LoadingSpinner.tsx    # Loading indicator
├── pages/
│   ├── HomePage.tsx          # Página principal
│   └── NotFoundPage.tsx      # 404
├── services/
│   └── todoService.ts        # Chamadas HTTP
├── stores/
│   └── todoStore.ts          # Zustand store (opcional)
├── types/
│   └── index.ts              # TypeScript types
├── App.tsx                   # Componente raiz
└── main.tsx                  # Entry point
```

### Componentes Principais

#### 1. TodoForm
- Input para título (obrigatório)
- Textarea para descrição (opcional)
- Select para prioridade (low, medium, high)
- Select para categoria
- Input de data para dueDate
- Botão Submit
- Validação de formulário
- Exibição de erros

#### 2. TodoList
- Renderiza array de tarefas
- Loading state
- Empty state
- Integração com filters

#### 3. TodoItem
- Exibição de tarefa
- Cores por prioridade
- Status badge
- Botões: Edit, Delete
- Checkbox para marcar como completa (opcional)

#### 4. TodoFilters
- Checkboxes/Selects para:
  - Status (pending, in_progress, completed)
  - Priority (low, medium, high)
  - Category (Work, Personal, Shopping, Health, Other)
- Botão "Limpar Filtros"
- Visualização de filtros ativos

---

## 6. Fluxo de Interação (User Flow)

```
1. Usuário acessa a página
   ↓
2. Sistema carrega lista de tarefas (GET /todos)
   ↓
3. Usuário pode:
   a) Criar nova tarefa:
	  - Preenche form
	  - Clica "Criar"
	  - POST /todos
	  - Tarefa adicionada à lista

   b) Filtrar tarefas:
	  - Seleciona filtros
	  - GET /todos?filters
	  - Lista atualiza

   c) Editar tarefa:
	  - Clica em tarefa
	  - Form modal abre
	  - Altera dados
	  - Clica "Salvar"
	  - PUT /todos/:id
	  - Lista atualiza

   d) Deletar tarefa:
	  - Clica botão delete
	  - Confirmação modal
	  - DELETE /todos/:id
	  - Tarefa removida da lista
```

---

## 7. Critérios de Aceitação Técnicos

- [ ] API retorna HTTP 201 para criação bem-sucedida
- [ ] API retorna HTTP 400 para validação falha
- [ ] API retorna HTTP 404 para recurso não encontrado
- [ ] API valida título (1-255 chars)
- [ ] API valida prioridade (low, medium, high)
- [ ] API valida status (pending, in_progress, completed)
- [ ] API valida dueDate (não pode ser no passado)
- [ ] API retorna timestamps ISO 8601
- [ ] Frontend valida entrada antes de enviar
- [ ] Frontend exibe mensagens de erro amigáveis
- [ ] Frontend atualiza lista após operação bem-sucedida
- [ ] TypeScript sem erros de compilação
- [ ] Código segue padrão da arquitetura (3-tier)

---

## 8. Métricas de Sucesso

- Todas as operações CRUD funcionando
- 100% de cobertura de validações de BR
- Tempo de carregamento < 2s
- Sem erros 404 ou 500 inesperados
- UI responsiva em mobile e desktop

---

**Versão**: 1.0  
**Data**: 2024-01-15  
**Status**: Ready for Development
