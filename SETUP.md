# SETUP.md - Guia de Instalação e Configuração

## 📋 Pré-requisitos

Certifique-se de ter instalado:

- **Node.js** 18.17+ ([Download](https://nodejs.org/))
- **npm** 9.0+ (incluído com Node.js)
- **Git** 2.40+ ([Download](https://git-scm.com/))
- **Visual Studio Code** ([Download](https://code.visualstudio.com/))
- **GitHub Copilot** (Extensão no VS Code)

### Verificar Instalação

```bash
node --version    # Deve ser v18.17 ou superior
npm --version     # Deve ser 9.0 ou superior
git --version     # Deve ser 2.40 ou superior
```

---

## 🚀 Instalação Rápida

### 1️⃣ Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/todo-app.git
cd todo-app
```

### 2️⃣ Instalar Dependências do Backend

```bash
cd backend
npm install
```

**Output esperado:**
```
added XXX packages in X.XXs
```

### 3️⃣ Instalar Dependências do Frontend

```bash
cd ../frontend
npm install
```

---

## ▶️ Executar a Aplicação

### Terminal 1 - Backend (API)

```bash
cd backend
npm run dev
```

**Output esperado:**
```
✅ Todo App Backend running on http://localhost:3000
📡 API available at http://localhost:3000/api
🏥 Health check at http://localhost:3000/health
```

### Terminal 2 - Frontend (Interface Web)

```bash
cd frontend
npm run dev
```

**Output esperado:**
```
  VITE v4.3.0  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

### Acessar a Aplicação

Abra seu navegador e acesse:
```
http://localhost:5173
```

---

## 🔧 Verificação de Saúde (Health Check)

Para verificar se a API está rodando:

```bash
curl http://localhost:3000/health
```

**Resposta esperada:**
```json
{
  "status": "OK",
  "message": "Todo App is running"
}
```

---

## 📂 Estrutura de Pastas (Pós-Instalação)

```
todo-app/
├── backend/
│   ├── node_modules/        ← Criado por npm install
│   ├── src/
│   ├── dist/                ← Criado por npm run build
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── node_modules/        ← Criado por npm install
│   ├── src/
│   ├── dist/                ← Criado por npm run build
│   ├── package.json
│   └── tsconfig.json
│
├── database/
│   └── todos.db             ← Criado na primeira execução
│
├── ARCHITECTURE.md
├── BUSINESS_RULES.md
├── STACK.md
├── SPEC.md
└── README.md
```

---

## 🌐 URLs e Portas

| Serviço | URL | Porta |
|---------|-----|-------|
| **Frontend** | http://localhost:5173 | 5173 |
| **Backend** | http://localhost:3000 | 3000 |
| **API** | http://localhost:3000/api | 3000 |
| **Health Check** | http://localhost:3000/health | 3000 |

---

## 🧪 Testar a API Sem Frontend

### Usando cURL

```bash
# Listar tarefas
curl http://localhost:3000/api/todos

# Criar tarefa
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{
	"title": "Tarefa de Teste",
	"priority": "high",
	"dueDate": "2024-12-31"
  }'

# Obter tarefa
curl http://localhost:3000/api/todos/1

# Atualizar tarefa
curl -X PUT http://localhost:3000/api/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"status": "in_progress"}'

# Deletar tarefa
curl -X DELETE http://localhost:3000/api/todos/1
```

### Usando Postman

1. Abra [Postman](https://www.postman.com/)
2. Crie uma nova collection
3. Importe as requisições abaixo

**Importar Requisições:**
- POST `http://localhost:3000/api/todos` - Create
- GET `http://localhost:3000/api/todos` - List
- GET `http://localhost:3000/api/todos/1` - Get by ID
- PUT `http://localhost:3000/api/todos/1` - Update
- DELETE `http://localhost:3000/api/todos/1` - Delete

---

## 🛑 Parar os Servidores

Para parar os servidores, pressione:

```
Ctrl + C
```

Em cada terminal.

---

## 🔄 Reiniciar/Recarregar

### Frontend (Vite)
- Vite detecta mudanças automaticamente
- Pressione `r` no terminal para recarregar
- O navegador atualizará automaticamente (Hot Reload)

### Backend
- Nodemon detecta mudanças automaticamente
- Reinicia o servidor quando arquivos mudam
- Verifique o terminal para ver logs

---

## 🐛 Troubleshooting

### Erro: "Port 3000 is already in use"

```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :3000
kill -9 <PID>
```

### Erro: "Port 5173 is already in use"

```bash
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :5173
kill -9 <PID>
```

### Erro: "Module not found"

```bash
# Limpar e reinstalar dependências
rm -rf node_modules package-lock.json
npm install
```

### Erro: "Database locked"

```bash
# Remover arquivo de banco de dados corrompido
rm database/todos.db

# Executar backend novamente para recriar o banco
npm run dev
```

### Erro: "CORS error"

- Certifique-se de que o backend está rodando em `http://localhost:3000`
- Verifique se a URL no `todoService.ts` aponta para `http://localhost:3000/api`

---

## 📝 Variáveis de Ambiente (Opcional)

Crie um arquivo `.env` na pasta `backend`:

```bash
PORT=3000
NODE_ENV=development
```

---

## 🔧 Scripts Disponíveis

### Backend

```bash
npm run dev       # Iniciar com nodemon (reload automático)
npm run build     # Compilar TypeScript
npm run start     # Executar versão compilada
npm run lint      # Verificar código (ESLint)
```

### Frontend

```bash
npm run dev       # Iniciar servidor Vite
npm run build     # Compilar para produção
npm run preview   # Visualizar build de produção
npm run lint      # Verificar código (ESLint)
```

---

## 🎓 Usando GitHub Copilot

### Instalação

1. Abra VS Code
2. Vá a **Extensions** (Ctrl+Shift+X)
3. Procure por "GitHub Copilot"
4. Clique em "Install"
5. Faça login com sua conta GitHub

### Usar Copilot

- Comece a digitar um comentário ou código
- Copilot sugerirá completações
- Pressione **Tab** para aceitar
- Pressione **Esc** para rejeitar
- Pressione **Ctrl+Enter** para ver alternativas

---

## ✅ Checklist de Configuração

- [ ] Node.js e npm instalados
- [ ] Git instalado
- [ ] Repositório clonado
- [ ] `npm install` executado no backend
- [ ] `npm install` executado no frontend
- [ ] Backend rodando em `http://localhost:3000`
- [ ] Frontend rodando em `http://localhost:5173`
- [ ] Banco de dados `database/todos.db` criado
- [ ] GitHub Copilot instalado no VS Code
- [ ] Consegue acessar a aplicação no navegador

---

## 🚀 Próximos Passos

1. ✅ Leia [ARCHITECTURE.md](./ARCHITECTURE.md) - Entenda a estrutura
2. ✅ Leia [BUSINESS_RULES.md](./BUSINESS_RULES.md) - Conheça as regras
3. ✅ Leia [SPEC.md](./SPEC.md) - Veja a especificação técnica
4. ✅ Explore o código-fonte
5. ✅ Faça alterações usando GitHub Copilot
6. ✅ Teste novas features

---

**Última atualização**: Janeiro de 2024
**Versão**: 1.0.0
