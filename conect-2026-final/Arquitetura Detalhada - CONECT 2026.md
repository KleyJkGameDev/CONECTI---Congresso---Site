# Arquitetura Detalhada - CONECT 2026

## 1. Visão Geral da Arquitetura

O projeto CONECT 2026 é uma aplicação web **frontend-first** construída com React 19 e Tailwind CSS 4, com armazenamento local em localStorage e sem dependências de APIs externas.

```
┌─────────────────────────────────────────────────────────┐
│                    NAVEGADOR DO USUÁRIO                 │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │         APLICAÇÃO REACT (SPA)                    │  │
│  │                                                  │  │
│  │  ┌────────────────────────────────────────────┐ │  │
│  │  │  Páginas (Home, Login, Admin, etc)         │ │  │
│  │  └────────────────────────────────────────────┘ │  │
│  │                      ↓                          │  │
│  │  ┌────────────────────────────────────────────┐ │  │
│  │  │  Componentes (Registration, Navbar, etc)   │ │  │
│  │  └────────────────────────────────────────────┘ │  │
│  │                      ↓                          │  │
│  │  ┌────────────────────────────────────────────┐ │  │
│  │  │  Contextos (Auth, Theme)                   │ │  │
│  │  └────────────────────────────────────────────┘ │  │
│  │                      ↓                          │  │
│  │  ┌────────────────────────────────────────────┐ │  │
│  │  │  localStorage (Dados Persistidos)          │ │  │
│  │  │  - Users                                   │ │  │
│  │  │  - Registrations                           │ │  │
│  │  │  - Submissions                             │ │  │
│  │  │  - Events                                  │ │  │
│  │  └────────────────────────────────────────────┘ │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## 2. Stack Tecnológico

### Frontend
| Tecnologia | Versão | Propósito |
|-----------|--------|----------|
| **React** | 19.2.1 | Framework UI |
| **TypeScript** | 5.6.3 | Tipagem estática |
| **Vite** | 7.1.7 | Build tool e dev server |
| **Tailwind CSS** | 4.1.14 | Estilização |
| **Wouter** | 3.3.5 | Roteamento cliente |
| **Lucide React** | 0.453.0 | Ícones SVG |
| **shadcn/ui** | Integrado | Componentes UI |
| **Framer Motion** | 12.23.22 | Animações |
| **React Hook Form** | 7.64.0 | Gerenciamento de formulários |
| **Zod** | 4.1.12 | Validação de schemas |

### Backend (Opcional)
| Tecnologia | Propósito |
|-----------|----------|
| **Express.js** | Framework web |
| **Node.js** | Runtime |
| **PostgreSQL/MongoDB** | Banco de dados |
| **JWT** | Autenticação |
| **Nodemailer** | Envio de emails |

### DevTools
| Ferramenta | Propósito |
|-----------|----------|
| **pnpm** | Gerenciador de pacotes |
| **TypeScript** | Verificação de tipos |
| **Prettier** | Formatação de código |
| **ESLint** | Linting (opcional) |

## 3. Estrutura de Diretórios

```
conect-2025/
│
├── client/                          # Código frontend
│   ├── public/                      # Arquivos estáticos
│   │   ├── favicon.ico
│   │   └── robots.txt
│   │
│   ├── src/
│   │   ├── components/              # Componentes React
│   │   │   ├── ui/                  # shadcn/ui components
│   │   │   │   ├── button.tsx
│   │   │   │   ├── dialog.tsx
│   │   │   │   ├── input.tsx
│   │   │   │   └── ...
│   │   │   ├── Navbar.tsx           # Navegação principal
│   │   │   ├── Hero.tsx             # Seção hero
│   │   │   ├── About.tsx            # Sobre o evento
│   │   │   ├── Schedule.tsx         # Cronograma
│   │   │   ├── Registration.tsx     # Formulário de inscrição
│   │   │   ├── Submission.tsx       # Submissão de artigos
│   │   │   ├── FAQ.tsx              # Perguntas frequentes
│   │   │   ├── Footer.tsx           # Rodapé
│   │   │   ├── Toast.tsx            # Notificações
│   │   │   ├── Modal.tsx            # Modais
│   │   │   └── MapSection.tsx       # Seção de mapa
│   │   │
│   │   ├── pages/                   # Páginas da aplicação
│   │   │   ├── Home.tsx             # Página inicial
│   │   │   ├── Login.tsx            # Login de usuário
│   │   │   ├── Register.tsx         # Registro de usuário
│   │   │   ├── ConfirmationPage.tsx # Confirmação de inscrição
│   │   │   ├── ParticipantProfile.tsx # Perfil do participante
│   │   │   ├── Guide.tsx            # Guia da cidade
│   │   │   ├── Admin.tsx            # Dashboard admin
│   │   │   ├── AdminLogin.tsx       # Login de admin
│   │   │   └── NotFound.tsx         # Página 404
│   │   │
│   │   ├── contexts/                # React Contexts
│   │   │   ├── AuthContext.tsx      # Autenticação
│   │   │   └── ThemeContext.tsx     # Tema (light/dark)
│   │   │
│   │   ├── hooks/                   # Custom Hooks
│   │   │   ├── useComposition.ts
│   │   │   ├── useMobile.tsx
│   │   │   └── usePersistFn.ts
│   │   │
│   │   ├── lib/                     # Utilitários
│   │   │   ├── utils.ts             # Funções auxiliares
│   │   │   ├── cpfValidator.ts      # Validação de CPF
│   │   │   ├── storage.ts           # Gerenciamento de localStorage
│   │   │   └── notifications.ts     # Sistema de notificações
│   │   │
│   │   ├── App.tsx                  # Componente raiz
│   │   ├── main.tsx                 # Entry point
│   │   ├── index.css                # Estilos globais
│   │   └── const.ts                 # Constantes
│   │
│   ├── index.html                   # HTML principal
│   ├── tsconfig.json                # Configuração TypeScript
│   └── vite.config.ts               # Configuração Vite
│
├── server/                          # Código backend (opcional)
│   └── index.ts                     # Servidor Express
│
├── package.json                     # Dependências do projeto
├── pnpm-lock.yaml                   # Lock file
├── tsconfig.json                    # Configuração TypeScript global
├── tailwind.config.ts               # Configuração Tailwind
├── postcss.config.js                # Configuração PostCSS
└── vite.config.ts                   # Configuração Vite
```

## 4. Componentes Principais

### 4.1 Navbar.tsx
**Responsabilidade:** Navegação principal da aplicação

**Funcionalidades:**
- Menu responsivo (desktop e mobile)
- Links para seções principais
- Botão de login
- Dropdown de usuário autenticado

**Props:** Nenhuma (usa contexto de autenticação)

**Exemplo de uso:**
```tsx
import Navbar from '@/components/Navbar';

export default function App() {
  return <Navbar />;
}
```

### 4.2 Registration.tsx
**Responsabilidade:** Formulário de inscrição no congresso

**Funcionalidades:**
- Seleção de categoria de ingresso
- Validação de CPF
- Máscara de telefone
- Integração com autenticação
- Salvamento em localStorage

**Estados gerenciados:**
- `selectedCategory` - Categoria selecionada
- `formData` - Dados do formulário
- `isLoading` - Estado de carregamento
- `showAuthModal` - Modal de autenticação

**Fluxo:**
1. Usuário preenche formulário
2. Clica "Garantir Inscrição"
3. Se não autenticado, exibe modal
4. Após autenticação, dados são salvos
5. Redireciona para página de confirmação

### 4.3 AuthContext.tsx
**Responsabilidade:** Gerenciamento centralizado de autenticação

**Funcionalidades:**
- Login de usuário
- Registro de novo usuário
- Login de administrador
- Logout
- Persistência de sessão

**Métodos:**
```tsx
interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  currentUser: User | null;
  login: (email: string, password: string) => void;
  register: (email: string, password: string) => void;
  loginAdmin: (email: string, password: string) => void;
  logout: () => void;
}
```

**Exemplo de uso:**
```tsx
import { useAuth } from '@/contexts/AuthContext';

export default function MyComponent() {
  const { isAuthenticated, currentUser, logout } = useAuth();
  
  if (!isAuthenticated) return <div>Faça login</div>;
  
  return (
    <div>
      Bem-vindo, {currentUser?.email}
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### 4.4 storage.ts
**Responsabilidade:** Gerenciamento de dados locais com localStorage

**Funcionalidades:**
- Salvar/recuperar inscrições
- Salvar/recuperar submissões de artigos
- Salvar/recuperar eventos
- Exportar dados em JSON
- Limpar dados

**Exemplo de uso:**
```tsx
import { saveRegistration, getRegistrations } from '@/lib/storage';

// Salvar inscrição
const registration = saveRegistration({
  firstName: 'João',
  lastName: 'Silva',
  email: 'joao@example.com',
  cpf: '123.456.789-00',
  phone: '(98) 99999-9999',
  institution: 'IFMA',
  category: 'Estudante',
  area: 'IA',
  timestamp: new Date().toISOString(),
});

// Recuperar inscrições
const allRegistrations = getRegistrations();

// Recuperar por email
const userRegistration = getRegistrationByEmail('joao@example.com');
```

## 5. Fluxos de Dados

### 5.1 Fluxo de Inscrição
```
┌─────────────────────────────────────────────────────────┐
│ 1. Usuário acessa Home e clica "Inscrever-se"           │
└──────────────────┬──────────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────────────────────┐
│ 2. Componente Registration é renderizado                │
│    - Exibe categorias de ingresso                       │
│    - Exibe formulário                                   │
└──────────────────┬──────────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────────────────────┐
│ 3. Usuário preenche formulário                          │
│    - Nome, Email, CPF, Telefone, etc                   │
└──────────────────┬──────────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────────────────────┐
│ 4. Usuário clica "Garantir Inscrição"                   │
└──────────────────┬──────────────────────────────────────┘
                   ↓
        ┌──────────────────────┐
        │ Usuário autenticado? │
        └──────────┬───────────┘
                   │
        ┌──────────┴──────────┐
        ↓                     ↓
       SIM                   NÃO
        │                     │
        ↓                     ↓
┌──────────────────┐  ┌──────────────────────┐
│ Salvar dados em  │  │ Exibir modal de      │
│ localStorage     │  │ autenticação         │
└────────┬─────────┘  └──────────┬───────────┘
         │                       │
         │                       ↓
         │            ┌──────────────────────┐
         │            │ Usuário faz login/   │
         │            │ registro             │
         │            └──────────┬───────────┘
         │                       │
         └───────────┬───────────┘
                     ↓
        ┌──────────────────────┐
        │ Salvar dados em      │
        │ localStorage         │
        └──────────┬───────────┘
                   ↓
        ┌──────────────────────┐
        │ Redirecionar para    │
        │ /confirmacao         │
        └──────────────────────┘
```

### 5.2 Fluxo de Autenticação
```
┌─────────────────────────────────────────────────────────┐
│ Usuário acessa /login                                   │
└──────────────────┬──────────────────────────────────────┘
                   ↓
        ┌──────────────────────┐
        │ Exibir formulário    │
        │ de login             │
        └──────────┬───────────┘
                   ↓
        ┌──────────────────────┐
        │ Usuário digita       │
        │ email e senha        │
        └──────────┬───────────┘
                   ↓
        ┌──────────────────────┐
        │ Validar credenciais  │
        │ (localStorage)       │
        └──────────┬───────────┘
                   │
        ┌──────────┴──────────┐
        ↓                     ↓
    VÁLIDO                INVÁLIDO
        │                     │
        ↓                     ↓
┌──────────────────┐  ┌──────────────────┐
│ Salvar token em  │  │ Exibir erro      │
│ localStorage     │  │                  │
└────────┬─────────┘  └──────────────────┘
         │
         ↓
┌──────────────────┐
│ Atualizar        │
│ AuthContext      │
└────────┬─────────┘
         │
         ↓
┌──────────────────┐
│ Redirecionar     │
│ para Home        │
└──────────────────┘
```

## 6. Gerenciamento de Estado

### 6.1 React Context (AuthContext)
```tsx
// Estrutura do contexto
interface User {
  id: string;
  email: string;
  isAdmin: boolean;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  currentUser: User | null;
  login: (email: string, password: string) => void;
  register: (email: string, password: string) => void;
  loginAdmin: (email: string, password: string) => void;
  logout: () => void;
}
```

### 6.2 localStorage
```
Chaves armazenadas:
├── currentUser          # Usuário autenticado
├── registrations        # Inscrições salvas
├── submissions          # Artigos submetidos
├── events               # Eventos do congresso
└── notifications        # Histórico de notificações
```

### 6.3 Component State (useState)
Cada componente gerencia seu próprio estado local:
```tsx
const [formData, setFormData] = useState({});
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState(null);
```

## 7. Roteamento

O projeto usa **Wouter** para roteamento cliente:

```tsx
// App.tsx
<Switch>
  <Route path="/" component={Home} />
  <Route path="/login" component={Login} />
  <Route path="/registro" component={Register} />
  <Route path="/confirmacao" component={ConfirmationPage} />
  <Route path="/perfil" component={ParticipantProfile} />
  <Route path="/guia" component={Guide} />
  <Route path="/admin-login" component={AdminLogin} />
  <Route path="/admin" component={Admin} />
  <Route path="/404" component={NotFound} />
  <Route component={NotFound} />
</Switch>
```

## 8. Validações

### 8.1 Validação de CPF
```tsx
import { validateCPF } from '@/lib/cpfValidator';

const isValid = validateCPF('123.456.789-00');
```

### 8.2 Validação de Email
```tsx
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const isValid = emailRegex.test(email);
```

### 8.3 Validação com Zod
```tsx
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
});
```

## 9. Estilos e Temas

### 9.1 Tailwind CSS
O projeto usa Tailwind CSS 4 com configuração customizada:

```css
/* index.css */
@import "tailwindcss";

@theme inline {
  --color-primary: #4f8ef7;
  --color-secondary: #8899bb;
  --radius: 0.65rem;
}

:root {
  --primary: #4f8ef7;
  --secondary: #8899bb;
  --background: #0a0e27;
  --foreground: #ffffff;
}
```

### 9.2 Temas Dark/Light
```tsx
// ThemeContext.tsx
const { theme, toggleTheme } = useTheme();

// Aplicar tema
<ThemeProvider defaultTheme="dark">
  <App />
</ThemeProvider>
```

## 10. Performance

### 10.1 Code Splitting
Vite automaticamente faz code splitting por rota

### 10.2 Lazy Loading
```tsx
import { lazy, Suspense } from 'react';

const Admin = lazy(() => import('./pages/Admin'));

<Suspense fallback={<Loading />}>
  <Admin />
</Suspense>
```

### 10.3 Memoização
```tsx
import { useMemo, useCallback } from 'react';

const memoizedValue = useMemo(() => computeExpensive(), [deps]);
const memoizedCallback = useCallback(() => handleClick(), [deps]);
```

## 11. Segurança

### 11.1 Proteção de Rotas
```tsx
// Admin route é protegida por autenticação
if (!isAuthenticated || !isAdmin) {
  return <Navigate to="/admin-login" />;
}
```

### 11.2 Validação de Entrada
Todos os formulários validam entrada antes de salvar

### 11.3 localStorage Segurança
- Não armazena senhas em plain text
- Usa hash para comparação
- Dados são validados ao recuperar

## 12. Acessibilidade

### 12.1 ARIA Labels
```tsx
<button aria-label="Menu de navegação">
  <Menu />
</button>
```

### 12.2 Keyboard Navigation
Todos os componentes suportam navegação por teclado

### 12.3 Contraste de Cores
Texto tem contraste mínimo de 4.5:1 com background

## 13. Responsividade

### 13.1 Breakpoints Tailwind
```
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

### 13.2 Mobile First
Estilos são aplicados mobile-first e expandidos para telas maiores

```tsx
<div className="text-sm md:text-base lg:text-lg">
  Texto responsivo
</div>
```

---

**Próxima seção:** Veja `GUIA_INTEGRACAO_BACKEND.md` para integrar com um servidor real.
