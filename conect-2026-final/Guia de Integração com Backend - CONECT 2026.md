# Guia de Integração com Backend - CONECT 2026

## Índice
1. [Visão Geral](#visão-geral)
2. [Arquitetura Cliente-Servidor](#arquitetura-cliente-servidor)
3. [Setup do Backend](#setup-do-backend)
4. [Endpoints da API](#endpoints-da-api)
5. [Integração no Frontend](#integração-no-frontend)
6. [Autenticação JWT](#autenticação-jwt)
7. [Tratamento de Erros](#tratamento-de-erros)
8. [Deployment](#deployment)

## Visão Geral

Atualmente, o projeto CONECT 2026 usa **localStorage** para armazenar dados localmente. Para um ambiente de produção, você precisa de um backend para:

- Persistir dados em banco de dados real
- Gerenciar autenticação segura
- Enviar emails de confirmação
- Gerar relatórios
- Escalar para múltiplos usuários

## Arquitetura Cliente-Servidor

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND (React)                     │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Páginas, Componentes, Contextos                 │  │
│  │  - Valida dados localmente                       │  │
│  │  - Exibe UI                                      │  │
│  │  - Faz requisições HTTP                          │  │
│  └──────────────────────────────────────────────────┘  │
└──────────────────┬───────────────────────────────────────┘
                   │ HTTP/REST
                   │ JSON
                   ↓
┌──────────────────────────────────────────────────────────┐
│                    BACKEND (Node.js)                     │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Express.js                                      │  │
│  │  - Recebe requisições                            │  │
│  │  - Valida dados                                  │  │
│  │  - Processa lógica de negócio                    │  │
│  │  - Retorna JSON                                  │  │
│  └──────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Banco de Dados (PostgreSQL/MongoDB)             │  │
│  │  - Armazena usuários                             │  │
│  │  - Armazena inscrições                           │  │
│  │  - Armazena artigos                              │  │
│  │  - Armazena eventos                              │  │
│  └──────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
```

## Setup do Backend

### Opção 1: Node.js + Express + PostgreSQL

#### 1.1 Criar novo projeto Node.js

```bash
# Criar diretório
mkdir conect-backend
cd conect-backend

# Inicializar projeto
npm init -y

# Instalar dependências
npm install express cors dotenv pg bcryptjs jsonwebtoken nodemailer
npm install -D typescript ts-node @types/node @types/express
```

#### 1.2 Estrutura de diretórios

```
conect-backend/
├── src/
│   ├── controllers/
│   │   ├── authController.ts
│   │   ├── registrationController.ts
│   │   ├── submissionController.ts
│   │   └── eventController.ts
│   ├── routes/
│   │   ├── auth.ts
│   │   ├── registrations.ts
│   │   ├── submissions.ts
│   │   └── events.ts
│   ├── middleware/
│   │   ├── auth.ts
│   │   └── errorHandler.ts
│   ├── models/
│   │   ├── User.ts
│   │   ├── Registration.ts
│   │   ├── Submission.ts
│   │   └── Event.ts
│   ├── database/
│   │   ├── connection.ts
│   │   └── migrations.ts
│   ├── utils/
│   │   ├── email.ts
│   │   └── validators.ts
│   └── server.ts
├── .env
├── .env.example
├── package.json
└── tsconfig.json
```

#### 1.3 Arquivo .env

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/conect_2026

# JWT
JWT_SECRET=sua_chave_secreta_muito_segura_aqui
JWT_EXPIRY=7d

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu_email@gmail.com
SMTP_PASS=sua_senha_app

# CORS
FRONTEND_URL=http://localhost:5173

# Server
PORT=3000
NODE_ENV=development
```

#### 1.4 Arquivo server.ts

```typescript
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import registrationRoutes from './routes/registrations';
import submissionRoutes from './routes/submissions';
import eventRoutes from './routes/events';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/registrations', registrationRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/events', eventRoutes);

// Error handling
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
```

### Opção 2: Usar Serviço Cloud

Alternativas sem gerenciar servidor:
- **Firebase** - Backend as a Service
- **Supabase** - PostgreSQL gerenciado
- **MongoDB Atlas** - MongoDB na nuvem
- **Railway** - Deploy fácil
- **Render** - Hospedagem gratuita

## Endpoints da API

### Autenticação

#### POST /api/auth/register
Registrar novo usuário

**Request:**
```json
{
  "email": "usuario@example.com",
  "password": "senha123",
  "firstName": "João",
  "lastName": "Silva"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Usuário criado com sucesso",
  "user": {
    "id": "uuid",
    "email": "usuario@example.com",
    "firstName": "João",
    "lastName": "Silva"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

#### POST /api/auth/login
Fazer login

**Request:**
```json
{
  "email": "usuario@example.com",
  "password": "senha123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login realizado com sucesso",
  "user": {
    "id": "uuid",
    "email": "usuario@example.com",
    "firstName": "João"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

#### POST /api/auth/admin-login
Login de administrador

**Request:**
```json
{
  "email": "admin@conect.com",
  "password": "admin123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Admin login realizado",
  "user": {
    "id": "uuid",
    "email": "admin@conect.com",
    "isAdmin": true
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

### Inscrições

#### POST /api/registrations
Criar nova inscrição

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
Content-Type: application/json
```

**Request:**
```json
{
  "firstName": "João",
  "lastName": "Silva",
  "email": "joao@example.com",
  "cpf": "123.456.789-00",
  "phone": "(98) 99999-9999",
  "institution": "IFMA",
  "category": "Estudante",
  "area": "Inteligência Artificial"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Inscrição realizada com sucesso",
  "registration": {
    "id": "uuid",
    "userId": "uuid",
    "firstName": "João",
    "lastName": "Silva",
    "email": "joao@example.com",
    "cpf": "123.456.789-00",
    "phone": "(98) 99999-9999",
    "institution": "IFMA",
    "category": "Estudante",
    "area": "Inteligência Artificial",
    "createdAt": "2026-05-01T10:30:00Z",
    "qrCode": "data:image/png;base64,..."
  }
}
```

#### GET /api/registrations/:id
Recuperar inscrição

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

**Response (200):**
```json
{
  "success": true,
  "registration": { ... }
}
```

#### GET /api/registrations
Listar todas as inscrições (admin)

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

**Query Parameters:**
```
?page=1&limit=10&status=confirmed
```

**Response (200):**
```json
{
  "success": true,
  "registrations": [ ... ],
  "total": 150,
  "page": 1,
  "limit": 10
}
```

### Submissões de Artigos

#### POST /api/submissions
Submeter novo artigo

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
Content-Type: multipart/form-data
```

**Request:**
```
title: "Aplicação de IA em Educação"
authors: "João Silva, Maria Santos"
email: "joao@example.com"
institution: "IFMA"
area: "Inteligência Artificial"
abstract: "Este trabalho apresenta..."
file: <arquivo PDF>
```

**Response (201):**
```json
{
  "success": true,
  "message": "Artigo submetido com sucesso",
  "submission": {
    "id": "uuid",
    "userId": "uuid",
    "title": "Aplicação de IA em Educação",
    "authors": "João Silva, Maria Santos",
    "email": "joao@example.com",
    "institution": "IFMA",
    "area": "Inteligência Artificial",
    "abstract": "Este trabalho apresenta...",
    "fileName": "artigo_123.pdf",
    "status": "pending",
    "createdAt": "2026-05-01T10:30:00Z"
  }
}
```

#### GET /api/submissions/:id
Recuperar submissão

**Response (200):**
```json
{
  "success": true,
  "submission": { ... }
}
```

#### PATCH /api/submissions/:id/status
Atualizar status da submissão (admin)

**Request:**
```json
{
  "status": "approved",
  "feedback": "Artigo aprovado com sucesso"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Status atualizado",
  "submission": { ... }
}
```

### Eventos

#### POST /api/events
Criar novo evento (admin)

**Request:**
```json
{
  "title": "Abertura do Congresso",
  "date": "2026-06-02",
  "time": "08:00",
  "location": "Auditório Principal",
  "capacity": 500,
  "description": "Cerimônia de abertura do CONECT 2026"
}
```

**Response (201):**
```json
{
  "success": true,
  "event": {
    "id": "uuid",
    "title": "Abertura do Congresso",
    "date": "2026-06-02",
    "time": "08:00",
    "location": "Auditório Principal",
    "capacity": 500,
    "description": "Cerimônia de abertura do CONECT 2026",
    "createdAt": "2026-05-01T10:30:00Z"
  }
}
```

#### GET /api/events
Listar todos os eventos

**Response (200):**
```json
{
  "success": true,
  "events": [ ... ]
}
```

#### PATCH /api/events/:id
Atualizar evento (admin)

**Request:**
```json
{
  "title": "Abertura do Congresso - Atualizado",
  "capacity": 600
}
```

**Response (200):**
```json
{
  "success": true,
  "event": { ... }
}
```

#### DELETE /api/events/:id
Deletar evento (admin)

**Response (200):**
```json
{
  "success": true,
  "message": "Evento deletado com sucesso"
}
```

## Integração no Frontend

### 1. Criar API Client

**Arquivo: `client/src/lib/api.ts`**

```typescript
import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

class APIClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Interceptor para adicionar token
    this.client.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Interceptor para tratar erros
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Autenticação
  async register(email: string, password: string, firstName: string, lastName: string) {
    return this.client.post('/auth/register', {
      email,
      password,
      firstName,
      lastName,
    });
  }

  async login(email: string, password: string) {
    return this.client.post('/auth/login', { email, password });
  }

  async adminLogin(email: string, password: string) {
    return this.client.post('/auth/admin-login', { email, password });
  }

  // Inscrições
  async createRegistration(data: any) {
    return this.client.post('/registrations', data);
  }

  async getRegistration(id: string) {
    return this.client.get(`/registrations/${id}`);
  }

  async getAllRegistrations(page = 1, limit = 10) {
    return this.client.get('/registrations', {
      params: { page, limit },
    });
  }

  // Submissões
  async submitArticle(formData: FormData) {
    return this.client.post('/submissions', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }

  async getSubmission(id: string) {
    return this.client.get(`/submissions/${id}`);
  }

  async updateSubmissionStatus(id: string, status: string, feedback?: string) {
    return this.client.patch(`/submissions/${id}/status`, {
      status,
      feedback,
    });
  }

  // Eventos
  async createEvent(data: any) {
    return this.client.post('/events', data);
  }

  async getEvents() {
    return this.client.get('/events');
  }

  async updateEvent(id: string, data: any) {
    return this.client.patch(`/events/${id}`, data);
  }

  async deleteEvent(id: string) {
    return this.client.delete(`/events/${id}`);
  }
}

export const apiClient = new APIClient();
```

### 2. Atualizar AuthContext

**Arquivo: `client/src/contexts/AuthContext.tsx`**

```typescript
import { createContext, useContext, useState, useEffect } from 'react';
import { apiClient } from '@/lib/api';

interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  currentUser: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  loginAdmin: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  isAdmin?: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Verificar se há token ao carregar
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('currentUser');
    if (token && user) {
      setIsAuthenticated(true);
      const userData = JSON.parse(user);
      setCurrentUser(userData);
      setIsAdmin(userData.isAdmin || false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await apiClient.login(email, password);
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('currentUser', JSON.stringify(user));
      
      setIsAuthenticated(true);
      setCurrentUser(user);
      setIsAdmin(user.isAdmin || false);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const register = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      const response = await apiClient.register(email, password, firstName, lastName);
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('currentUser', JSON.stringify(user));
      
      setIsAuthenticated(true);
      setCurrentUser(user);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const loginAdmin = async (email: string, password: string) => {
    try {
      const response = await apiClient.adminLogin(email, password);
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('currentUser', JSON.stringify(user));
      
      setIsAuthenticated(true);
      setCurrentUser(user);
      setIsAdmin(true);
    } catch (error) {
      console.error('Admin login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    setIsAuthenticated(false);
    setCurrentUser(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isAdmin,
        currentUser,
        login,
        register,
        loginAdmin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
}
```

### 3. Atualizar Registration.tsx

```typescript
import { apiClient } from '@/lib/api';

// Dentro do handleSubmit
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!isAuthenticated) {
    setShowAuthModal(true);
    return;
  }

  setIsLoading(true);
  try {
    const response = await apiClient.createRegistration({
      ...formData,
      category: selectedCategory,
    });

    // Salvar também em localStorage para fallback
    localStorage.setItem('currentRegistration', JSON.stringify(response.data.registration));

    navigate('/confirmacao');
  } catch (error) {
    setError('Erro ao salvar inscrição. Tente novamente.');
    console.error(error);
  } finally {
    setIsLoading(false);
  }
};
```

## Autenticação JWT

### Como funciona JWT

```
1. Usuário faz login
   ↓
2. Backend valida credenciais
   ↓
3. Backend gera JWT (token)
   ↓
4. Frontend armazena token no localStorage
   ↓
5. Frontend envia token em cada requisição (header Authorization)
   ↓
6. Backend valida token
   ↓
7. Backend retorna dados se token válido
```

### Estrutura do JWT

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ikpvw6NvIFNpbHZhIiwiaWF0IjoxNTE2MjM5MDIyfQ.
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

Header (algoritmo)
↓
Payload (dados do usuário)
↓
Signature (assinatura)
```

### Middleware de Autenticação (Backend)

```typescript
import jwt from 'jsonwebtoken';

export function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }
}
```

## Tratamento de Erros

### Frontend

```typescript
import { apiClient } from '@/lib/api';

try {
  await apiClient.createRegistration(data);
} catch (error) {
  if (error.response?.status === 400) {
    // Erro de validação
    setError(error.response.data.message);
  } else if (error.response?.status === 401) {
    // Não autenticado
    navigate('/login');
  } else if (error.response?.status === 403) {
    // Não autorizado
    setError('Você não tem permissão para fazer isso');
  } else if (error.response?.status === 500) {
    // Erro do servidor
    setError('Erro no servidor. Tente novamente mais tarde.');
  } else {
    // Erro de rede
    setError('Erro de conexão. Verifique sua internet.');
  }
}
```

### Backend

```typescript
app.use((err, req, res, next) => {
  console.error(err);

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Dados inválidos',
      errors: err.errors,
    });
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      success: false,
      message: 'Não autorizado',
    });
  }

  res.status(500).json({
    success: false,
    message: 'Erro interno do servidor',
  });
});
```

## Deployment

### Deploy Frontend (Vercel)

```bash
# Instalar Vercel CLI
npm install -g vercel

# Deploy
vercel

# Com variáveis de ambiente
vercel env add VITE_API_URL https://seu-backend.com/api
```

### Deploy Backend (Railway)

```bash
# Instalar Railway CLI
npm install -g @railway/cli

# Login
railway login

# Deploy
railway up
```

### Variáveis de Ambiente

**Frontend (.env.production):**
```
VITE_API_URL=https://seu-backend.com/api
```

**Backend (.env.production):**
```
DATABASE_URL=postgresql://user:pass@host:5432/db
JWT_SECRET=sua_chave_secreta_super_segura
FRONTEND_URL=https://seu-frontend.com
PORT=3000
NODE_ENV=production
```

## Checklist de Integração

- [ ] Backend criado e rodando localmente
- [ ] Banco de dados configurado
- [ ] Endpoints de autenticação testados
- [ ] Endpoints de inscrição testados
- [ ] Endpoints de submissão testados
- [ ] Endpoints de eventos testados
- [ ] Frontend conectado ao backend
- [ ] JWT funcionando corretamente
- [ ] Tratamento de erros implementado
- [ ] CORS configurado
- [ ] Variáveis de ambiente configuradas
- [ ] Testes de integração passando
- [ ] Backend deployado
- [ ] Frontend deployado
- [ ] Testes em produção passando

---

**Próxima seção:** Veja `RECOMENDACOES_MELHORIAS.md` para adicionar mais funcionalidades.
