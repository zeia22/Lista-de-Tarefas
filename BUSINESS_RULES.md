# BUSINESS_RULES.md - Regras de Negócio

## Visão Geral do Produto

O **Todo App** é uma aplicação web para gerenciamento de tarefas pessoais. Permite aos usuários criar, visualizar, atualizar e deletar tarefas, com suporte a priorização e categorização.

## Regras de Negócio

### 1. **Tarefa (Todo)**

#### Estrutura
Uma tarefa deve conter os seguintes atributos:

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `id` | UUID/Integer | Sim | Identificador único |
| `title` | String (1-255 chars) | Sim | Título da tarefa |
| `description` | String (0-1000 chars) | Não | Descrição detalhada |
| `status` | Enum (pending, in_progress, completed) | Sim | Estado atual da tarefa |
| `priority` | Enum (low, medium, high) | Sim | Nível de prioridade |
| `dueDate` | Date | Não | Data de vencimento |
| `category` | String (1-50 chars) | Não | Categoria da tarefa |
| `createdAt` | DateTime | Sim | Data de criação (server-side) |
| `updatedAt` | DateTime | Sim | Data de última atualização (server-side) |

### 2. **Criação de Tarefa**

**Regra BR-001**: Uma tarefa deve ter pelo menos um título não vazio.
- Validação: Mínimo 1 caractere, máximo 255 caracteres.
- Trimmed: Espaços em branco no início e fim serão removidos.
- **Rejeição**: Se título vazio ou > 255 chars → HTTP 400 Bad Request

**Regra BR-002**: Uma tarefa sem prioridade explícita recebe prioridade padrão `medium`.
- Default: `priority = "medium"`

**Regra BR-003**: Uma tarefa sem status explícito recebe status `pending`.
- Default: `status = "pending"`

**Regra BR-004**: Data de vencimento é opcional, mas se informada deve ser maior ou igual à data atual.
- Validação: `dueDate >= today()`
- **Rejeição**: Se `dueDate < today()` → HTTP 400 Bad Request

**Regra BR-005**: Descrição é opcional, máximo 1000 caracteres.
- Validação: 0 a 1000 caracteres
- Trimmed: Espaços no início/fim removidos

**Regra BR-006**: Categoria é opcional, máximo 50 caracteres.
- Validação: 0 a 50 caracteres
- Valores pré-definidos sugeridos: "Work", "Personal", "Shopping", "Health", "Other"

### 3. **Leitura de Tarefas**

**Regra BR-007**: Listar todas as tarefas sem filtro retorna todas criadas.
- Ordenação padrão: Por `createdAt` (descendente - mais recentes primeiro)

**Regra BR-008**: Filtros opcionais podem ser aplicados:
- Por `status` (pending, in_progress, completed)
- Por `priority` (low, medium, high)
- Por `category`
- Combinações de filtros são permitidas (AND logic)

**Regra BR-009**: Resultados podem ser ordenados por:
- `createdAt` (padrão)
- `updatedAt`
- `dueDate`
- `priority` (high > medium > low)

### 4. **Atualização de Tarefa**

**Regra BR-010**: Uma tarefa pode ser atualizada em seus campos permitidos.
- Campos atualizáveis: `title`, `description`, `status`, `priority`, `dueDate`, `category`
- Campo imutável: `id`, `createdAt`

**Regra BR-011**: Ao atualizar o status para `completed`, o campo `updatedAt` é automaticamente atualizado para o timestamp do servidor.

**Regra BR-012**: Título não pode ser deixado vazio durante atualização.
- Validação: Mesmo padrão de BR-001

**Regra BR-013**: Se `dueDate` for modificada, deve seguir a validação de BR-004.

### 5. **Exclusão de Tarefa**

**Regra BR-014**: Uma tarefa pode ser deletada permanentemente.
- Sem soft-delete (exclusão lógica) - exclusão física imediata.
- Uma vez deletada, não pode ser recuperada.

**Regra BR-015**: Ao deletar uma tarefa, não há cascata (não há relacionamentos).

### 6. **Priorização e Urgência**

**Regra BR-016**: Tarefas com prioridade `high` e `dueDate` próxima (< 3 dias) são consideradas urgentes.
- Sugestão: Destaque visual no frontend

### 7. **Restrições Gerais**

**Regra BR-017**: Não há autenticação nesta versão (v1).
- Todas as tarefas são públicas/compartilhadas (single-user mockup)
- Implementação de autenticação é roadmap futuro

**Regra BR-018**: Não há exclusão em lote nesta versão.
- Apenas exclusão individual por `id`

**Regra BR-019**: Não há recuperação de tarefas deletadas.
- Sugestão de UI: Confirmação antes de deletar

### 8. **Respostas da API**

**Regra BR-020**: Toda resposta de sucesso retorna:
```json
{
  "success": true,
  "data": { /* dados */ },
  "message": "Descrição da operação"
}
```

**Regra BR-021**: Toda resposta de erro retorna:
```json
{
  "success": false,
  "error": "Código de erro",
  "message": "Descrição do erro",
  "details": { /* campos com erro */ }
}
```

**Regra BR-022**: Códigos HTTP esperados:
- `200 OK` - Operação bem-sucedida
- `201 Created` - Recurso criado
- `400 Bad Request` - Validação falhou
- `404 Not Found` - Recurso não encontrado
- `500 Internal Server Error` - Erro do servidor

---

## Roadmap Futuro (Fora do Escopo v1)

- Autenticação e autorização (JWT)
- Importação/exportação de tarefas (CSV, JSON)
- Anexos em tarefas
- Histórico de mudanças
- Tags customizadas (além de categoria)
- Lembretes por email
- API GraphQL
- Mobile app (React Native)

---

**Última atualização**: 2024
**Versão**: 1.0 (MVP)
