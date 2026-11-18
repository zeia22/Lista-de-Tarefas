# STACK.md - Stack Tecnológico

## Linguagens e Versões

### Frontend

| Componente | Versão | Propósito |
|-----------|--------|----------|
| **Node.js** | 18.17+ | Runtime JavaScript |
| **React** | 18.2+ | Framework UI |
| **TypeScript** | 5.0+ | Tipagem estática |
| **Vite** | 4.3+ | Build tool moderno |
| **Tailwind CSS** | 3.3+ | Estilização utilitária |
| **Zustand** | 4.3+ | Gestão de estado (opcional) |
| **axios** | 1.4+ | Cliente HTTP |

### Backend

| Componente | Versão | Propósito |
|-----------|--------|----------|
| **Node.js** | 18.17+ | Runtime JavaScript |
| **Express** | 4.18+ | Framework web |
| **TypeScript** | 5.0+ | Tipagem estática |
| **SQLite3** | 5.1+ | Banco de dados |
| **cors** | 2.8+ | Controle de CORS |
| **dotenv** | 16.0+ | Variáveis de ambiente |

### Database

| Componente | Versão | Propósito |
|-----------|--------|----------|
| **SQLite** | 3.42+ | Banco de dados relacional leve |

## Ambiente de Desenvolvimento

```bash
# Sistema Operacional
OS: Windows 10/11, macOS 12+, Ubuntu 20.04+

# Ferramentas
- Visual Studio Code (Latest)
- Git 2.40+
- npm 9.0+
- Postman ou Insomnia (para testes de API)

# GitHub Copilot
- Extensão GitHub Copilot instalada no VS Code
- Autenticação com GitHub
```

## Estrutura de Dependências

### Frontend (package.json)

```json
{
  "dependencies": {
	"react": "^18.2.0",
	"react-dom": "^18.2.0",
	"axios": "^1.4.0",
	"zustand": "^4.3.0"
  },
  "devDependencies": {
	"typescript": "^5.0.0",
	"@vitejs/plugin-react": "^4.0.0",
	"vite": "^4.3.0",
	"tailwindcss": "^3.3.0",
	"autoprefixer": "^10.4.0",
	"postcss": "^8.4.0"
  }
}
```

### Backend (package.json)

```json
{
  "dependencies": {
	"express": "^4.18.0",
	"sqlite3": "^5.1.0",
	"cors": "^2.8.0",
	"dotenv": "^16.0.0"
  },
  "devDependencies": {
	"typescript": "^5.0.0",
	"ts-node": "^10.9.0",
	"@types/express": "^4.17.0",
	"@types/node": "^20.0.0",
	"nodemon": "^2.0.0"
  }
}
```

## Scripts de Execução

### Frontend

```bash
npm run dev       # Iniciar servidor de desenvolvimento (Vite)
npm run build     # Compilar para produção
npm run preview   # Visualizar build de produção
npm run lint      # Verificar código
```

### Backend

```bash
npm run dev       # Iniciar com nodemon (reload automático)
npm run build     # Compilar TypeScript
npm run start     # Executar versão compilada
npm run lint      # Verificar código
```

## Configuração de Ports

- **Frontend**: `http://localhost:5173` (Vite default)
- **Backend API**: `http://localhost:3000`
- **Database**: SQLite (arquivo local)

## Integração com GitHub Copilot

- **VS Code Extension**: GitHub Copilot
- **Uso**: Autocomplete de código, geração de testes, sugestões de refatoração
- **Atalhos**: 
  - `Ctrl+Enter` (Windows) / `Cmd+Enter` (Mac): Abrir painel de sugestões
  - `Tab`: Aceitar sugestão

---

**Última atualização**: 2024
