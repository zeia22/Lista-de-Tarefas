# Instruções para Envio no GitHub

## 📤 Passo a Passo para Fazer Upload

### 1. Inicializar Git (Se não estiver inicializado)

```bash
git init
git config user.name "Seu Nome"
git config user.email "seu.email@example.com"
```

### 2. Adicionar Arquivos

```bash
git add .
```

### 3. Fazer Commit Inicial

```bash
git commit -m "Inicial: Todo App - Arquitetura 3 camadas com React, Express e SQLite"
```

### 4. Criar Repositório no GitHub

1. Acesse https://github.com/new
2. Nome do repositório: `todo-app`
3. Descrição: "Aplicação web para gerenciamento de tarefas - React + Express + TypeScript"
4. Selecione "Public"
5. Clique em "Create repository"

### 5. Conectar ao GitHub

```bash
# Adicionar remote (substitua USERNAME)
git remote add origin https://github.com/USERNAME/todo-app.git

# Fazer push (primeira vez)
git branch -M main
git push -u origin main
```

### 6. Verificar no GitHub

Acesse: `https://github.com/USERNAME/todo-app`

---

## 📋 Verificação Final - Arquivos Obrigatórios

Certifique-se de que todos estes arquivos estão no repositório:

```
✅ ARCHITECTURE.md        - Arquitetura em 3 camadas
✅ STACK.md               - Stack tecnológico
✅ BUSINESS_RULES.md      - Regras de negócio
✅ SPEC.md                - Especificação técnica
✅ SETUP.md               - Guia de instalação
✅ README.md              - Documentação completa
✅ backend/               - Código-fonte Express + TypeScript
✅ frontend/              - Código-fonte React + TypeScript
✅ docs/                  - Documentação adicional
```

---

## 📊 Estrutura Esperada no GitHub

```
seu-repo/
├── ARCHITECTURE.md
├── BUSINESS_RULES.md
├── STACK.md
├── SPEC.md
├── SETUP.md
├── README.md
├── .gitignore
├── backend/
│   ├── src/
│   ├── package.json
│   ├── tsconfig.json
│   └── .gitignore
├── frontend/
│   ├── src/
│   ├── package.json
│   ├── tsconfig.json
│   └── .gitignore
└── docs/
	└── PRESENTATION.pptx (opcional)
```

---

## 🔄 Atualizações Futuras

Para fazer updates depois:

```bash
# Fazer mudanças nos arquivos...

# Adicionar mudanças
git add .

# Commit com mensagem descritiva
git commit -m "Melhoria: Adicionar feature X"

# Push para GitHub
git push origin main
```

---

## ✨ Dicas de Commit

Use mensagens descritivas:

```bash
# ✅ Bom
git commit -m "Feat: Adicionar filtro por categoria"
git commit -m "Fix: Corrigir validação de data"
git commit -m "Docs: Atualizar README com exemplos"

# ❌ Evitar
git commit -m "ajustes"
git commit -m "correção"
git commit -m "update"
```

---

## 🎯 Checklist Final

Antes de submeter no GitHub, verifique:

- [ ] Todos os 4 arquivos .md estão no root
- [ ] Código frontend está em `frontend/src/`
- [ ] Código backend está em `backend/src/`
- [ ] Arquivo `database/` existe (criado automaticamente)
- [ ] Arquivos `.gitignore` em backend e frontend
- [ ] README.md com instruções de instalação
- [ ] SETUP.md com guia de configuração
- [ ] Nenhum arquivo `node_modules/` commitado
- [ ] Nenhum arquivo `.env` commitado (secrets)
- [ ] Nenhum arquivo `.db` commitado (dados locais)

---

## 📞 Link Final

Após terminar, copie este link e envie como resposta:

```
https://github.com/USERNAME/todo-app
```

Exemplo:
```
https://github.com/joaosilva/todo-app
```

---

**Pronto!** 🎉 Seu repositório está pronto para ser enviado como solução da atividade.
