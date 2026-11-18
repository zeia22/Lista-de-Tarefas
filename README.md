# Lista de Tarefas

Aplicação web full stack para gerenciamento de tarefas, desenvolvida com React, TypeScript, Express e SQLite.

## Funcionalidades

- Criar, listar, editar e excluir tarefas;
- Alterar status, prioridade e categoria;
- Filtrar tarefas por status, prioridade e categoria;
- Validar dados no frontend e no backend;
- Persistir dados localmente em SQLite.

## Documentação do contexto

- [ARCHITECTURE.md](ARCHITECTURE.md) — camadas e fluxo da aplicação;
- [STACK.md](STACK.md) — linguagens, frameworks e versões;
- [BUSINESS_RULES.md](BUSINESS_RULES.md) — regras do domínio;
- [SPEC.md](SPEC.md) — especificação da primeira feature;
- [Apresentação do produto](docs/APRESENTACAO.md);
- [SETUP.md](SETUP.md) — instalação e execução.

## Execução rápida

No primeiro terminal:

```powershell
cd backend
npm install
npm run dev
```

No segundo terminal:

```powershell
cd frontend
npm install
npm run dev
```

Depois, acesse `http://localhost:5173`.
