# Lista de Tarefas

## 1. Visão do produto

O **Lista de Tarefas** é uma aplicação web para organizar atividades pessoais em um único lugar. O usuário pode criar, consultar, editar, concluir e remover tarefas.

## 2. Problema

Atividades anotadas em diferentes lugares podem ser esquecidas e dificultam a definição de prioridades. A aplicação centraliza essas informações e permite acompanhar o status de cada tarefa.

## 3. Público-alvo

- Estudantes;
- Profissionais;
- Pessoas que precisam organizar tarefas pessoais, acadêmicas ou de trabalho.

## 4. Funcionalidades do MVP

- Cadastro de tarefas com título, descrição, prioridade, categoria e data de vencimento;
- Listagem ordenada por data de criação;
- Filtros por status, prioridade e categoria;
- Alteração de status para pendente, em progresso ou concluída;
- Edição e exclusão com confirmação;
- Validação de dados no frontend e no backend.

## 5. Tecnologias

- React, TypeScript e Vite no frontend;
- Node.js, Express e TypeScript no backend;
- SQLite para persistência;
- Tailwind CSS para a interface;
- GitHub Copilot integrado ao Visual Studio como apoio ao desenvolvimento guiado pelos arquivos de especificação.

## 6. Arquitetura

A solução utiliza três camadas:

1. **Apresentação:** componentes React, formulários e filtros;
2. **Lógica de negócio:** serviços Express responsáveis por validações e regras do domínio;
3. **Acesso a dados:** repositório e banco SQLite.

## 7. Fluxo principal

1. O usuário abre a aplicação;
2. O frontend consulta a API;
3. O backend valida a solicitação;
4. O repositório grava ou consulta o SQLite;
5. A interface atualiza a lista e informa o resultado da operação.

## 8. Resultado esperado

Entregar uma aplicação simples, responsiva e funcional para demonstrar o uso de especificações em Markdown como contexto para geração de código por IA.

## 9. Execução

Consulte [`SETUP.md`](../SETUP.md) para instalar dependências e executar frontend e backend.
