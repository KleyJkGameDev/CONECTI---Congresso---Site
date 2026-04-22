# Documentação de Bibliotecas Utilizadas — CONECT 2025

**Versão:** 1.0  
**Data:** Abril de 2026

---

## Índice

1. [Dependências Principais](#dependências-principais)
2. [Dependências de Desenvolvimento](#dependências-de-desenvolvimento)
3. [Como Adicionar Novas Dependências](#como-adicionar-novas-dependências)
4. [Troubleshooting de Dependências](#troubleshooting-de-dependências)

---

## Dependências Principais

As dependências principais são bibliotecas necessárias para o funcionamento do aplicativo em produção.

### React e React DOM

**Versão:** 19.2.1

**O que é:** Framework JavaScript para construir interfaces de usuário com componentes reutilizáveis.

**Como usar:**

```tsx
import React, { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}
```

**Documentação:** [https://react.dev](https://react.dev)

---

### Vite

**Versão:** 7.1.7

**O que é:** Build tool moderno que oferece desenvolvimento rápido com Hot Module Replacement (HMR).

**Como usar:**

```bash
npm run dev      # Inicia servidor de desenvolvimento
npm run build    # Cria build otimizado para produção
npm run preview  # Visualiza build de produção localmente
```

**Documentação:** [https://vitejs.dev](https://vitejs.dev)

---

### Tailwind CSS

**Versão:** 4.1.14

**O que é:** Framework CSS utility-first para estilizar componentes rapidamente.

**Como usar:**

```tsx
export default function Button() {
  return (
    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
      Clique aqui
    </button>
  );
}
```

**Classes Úteis:**

| Classe | Efeito |
|--------|--------|
| `flex` | Display flex |
| `grid` | Display grid |
| `gap-4` | Espaçamento entre itens |
| `px-4 py-2` | Padding horizontal e vertical |
| `bg-blue-500` | Cor de fundo azul |
| `text-white` | Cor de texto branca |
| `rounded-lg` | Bordas arredondadas |
| `hover:bg-blue-600` | Cor ao passar mouse |
| `transition-all` | Transição suave |

**Documentação:** [https://tailwindcss.com](https://tailwindcss.com)

---

### shadcn/ui

**Versão:** Integrado

**O que é:** Coleção de componentes React construídos com Radix UI e Tailwind CSS.

**Componentes Disponíveis:**

- `Button` — Botões estilizados
- `Card` — Cards com borda e sombra
- `Dialog` — Diálogos modais
- `Tabs` — Abas/tabs
- `Input` — Campos de entrada
- `Select` — Dropdowns
- `Checkbox` — Checkboxes
- `Toast` — Notificações

**Como usar:**

```tsx
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function Example() {
  return (
    <Card className="p-6">
      <Button>Clique aqui</Button>
    </Card>
  );
}
```

**Documentação:** [https://ui.shadcn.com](https://ui.shadcn.com)

---

### Lucide React

**Versão:** 0.453.0

**O que é:** Biblioteca de ícones SVG para React.

**Como usar:**

```tsx
import { Menu, X, ChevronDown, Heart } from 'lucide-react';

export default function Icons() {
  return (
    <div className="flex gap-4">
      <Menu size={24} />
      <X size={24} />
      <ChevronDown size={24} />
      <Heart size={24} />
    </div>
  );
}
```

**Ícones Populares:**

| Ícone | Uso |
|-------|-----|
| `Menu` | Menu hamburger |
| `X` | Fechar |
| `ChevronDown` | Seta para baixo |
| `Heart` | Coração |
| `Search` | Lupa |
| `User` | Usuário |
| `Settings` | Configurações |
| `Bell` | Notificação |

**Documentação:** [https://lucide.dev](https://lucide.dev)

---

### Wouter

**Versão:** 3.3.5

**O que é:** Router leve para React com suporte a client-side routing.

**Como usar:**

```tsx
import { Route, Switch } from 'wouter';

export default function App() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/404" component={NotFound} />
    </Switch>
  );
}
```

**Documentação:** [https://github.com/molefrog/wouter](https://github.com/molefrog/wouter)

---

### Framer Motion

**Versão:** 12.23.22

**O que é:** Biblioteca para criar animações e transições suaves.

**Como usar:**

```tsx
import { motion } from 'framer-motion';

export default function AnimatedBox() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 bg-blue-500 text-white rounded-lg"
    >
      Conteúdo animado
    </motion.div>
  );
}
```

**Documentação:** [https://www.framer.com/motion](https://www.framer.com/motion)

---

### Sonner

**Versão:** 2.0.7

**O que é:** Biblioteca para exibir notificações (toasts) elegantes.

**Como usar:**

```tsx
import { toast } from 'sonner';

export default function Example() {
  return (
    <button onClick={() => toast.success('Sucesso!')}>
      Mostrar Toast
    </button>
  );
}
```

**Tipos de Toast:**

```tsx
toast.success('Sucesso!');
toast.error('Erro!');
toast.loading('Carregando...');
toast.custom((t) => <div>Custom toast</div>);
```

**Documentação:** [https://sonner.emilkowal.ski](https://sonner.emilkowal.ski)

---

### Zod

**Versão:** 4.1.12

**O que é:** Biblioteca TypeScript-first para validação de schemas.

**Como usar:**

```tsx
import { z } from 'zod';

const UserSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('E-mail inválido'),
  age: z.number().min(18, 'Deve ter 18 anos ou mais'),
});

const result = UserSchema.parse({
  name: 'João',
  email: 'joao@email.com',
  age: 25,
});
```

**Documentação:** [https://zod.dev](https://zod.dev)

---

### React Hook Form

**Versão:** 7.64.0

**O que é:** Biblioteca para gerenciar formulários com validação eficiente.

**Como usar:**

```tsx
import { useForm } from 'react-hook-form';

export default function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email', { required: true })} />
      {errors.email && <span>E-mail é obrigatório</span>}
      <button type="submit">Enviar</button>
    </form>
  );
}
```

**Documentação:** [https://react-hook-form.com](https://react-hook-form.com)

---

### Axios

**Versão:** 1.12.0

**O que é:** Cliente HTTP para fazer requisições a APIs.

**Como usar:**

```tsx
import axios from 'axios';

async function fetchData() {
  try {
    const response = await axios.get('/api/inscricoes');
    console.log(response.data);
  } catch (error) {
    console.error('Erro:', error);
  }
}

// POST
axios.post('/api/inscricoes', {
  nome: 'João',
  email: 'joao@email.com',
});
```

**Documentação:** [https://axios-http.com](https://axios-http.com)

---

### Class Variance Authority

**Versão:** 0.7.1

**O que é:** Utilitário para criar componentes com variantes de estilo.

**Como usar:**

```tsx
import { cva } from 'class-variance-authority';

const buttonVariants = cva('px-4 py-2 rounded-lg font-bold', {
  variants: {
    intent: {
      primary: 'bg-blue-500 text-white',
      secondary: 'bg-gray-200 text-black',
    },
  },
});

export default function Button({ intent = 'primary' }) {
  return <button className={buttonVariants({ intent })}>Clique</button>;
}
```

**Documentação:** [https://cva.style](https://cva.style)

---

### Clsx

**Versão:** 2.1.1

**O que é:** Utilitário para combinar classes CSS condicionalmente.

**Como usar:**

```tsx
import clsx from 'clsx';

export default function Button({ disabled, primary }) {
  return (
    <button
      className={clsx(
        'px-4 py-2 rounded-lg',
        primary ? 'bg-blue-500 text-white' : 'bg-gray-200',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
    >
      Clique
    </button>
  );
}
```

**Documentação:** [https://github.com/lukeed/clsx](https://github.com/lukeed/clsx)

---

## Dependências de Desenvolvimento

Dependências usadas apenas durante o desenvolvimento (não incluídas no build final).

### TypeScript

**Versão:** 5.6.3

**O que é:** Superset de JavaScript que adiciona tipagem estática.

**Como usar:**

```tsx
interface User {
  name: string;
  email: string;
  age: number;
}

function createUser(user: User): void {
  console.log(`Usuário ${user.name} criado`);
}
```

**Documentação:** [https://www.typescriptlang.org](https://www.typescriptlang.org)

---

### Prettier

**Versão:** 3.6.2

**O que é:** Formatador de código automático.

**Como usar:**

```bash
npm run format
```

Isso formata todos os arquivos do projeto automaticamente.

**Documentação:** [https://prettier.io](https://prettier.io)

---

### ESLint

**Versão:** Integrado

**O que é:** Ferramenta de linting para encontrar e corrigir problemas no código.

**Como usar:**

```bash
npm run lint
```

**Documentação:** [https://eslint.org](https://eslint.org)

---

## Como Adicionar Novas Dependências

### Instalar Dependência de Produção

```bash
npm install nome-da-biblioteca
```

**Exemplo:**

```bash
npm install react-query
```

### Instalar Dependência de Desenvolvimento

```bash
npm install --save-dev nome-da-biblioteca
```

**Exemplo:**

```bash
npm install --save-dev vitest
```

### Atualizar Todas as Dependências

```bash
npm update
```

### Verificar Versões Instaladas

```bash
npm list
```

---

## Troubleshooting de Dependências

### Problema: "Module not found"

**Causa:** Dependência não está instalada.

**Solução:**

```bash
npm install
```

---

### Problema: Conflito de versões

**Causa:** Duas dependências precisam de versões diferentes da mesma biblioteca.

**Solução:**

```bash
npm install
```

O npm tentará resolver automaticamente. Se não conseguir, você verá uma mensagem de erro.

---

### Problema: Dependência desatualizada

**Causa:** Uma biblioteca tem uma versão mais recente disponível.

**Solução:**

```bash
npm update nome-da-biblioteca
```

---

### Problema: Remover dependência

**Solução:**

```bash
npm uninstall nome-da-biblioteca
```

---

## Resumo das Dependências

| Biblioteca | Versão | Propósito |
|------------|--------|----------|
| React | 19.2.1 | Framework principal |
| Vite | 7.1.7 | Build tool |
| Tailwind CSS | 4.1.14 | Styling |
| shadcn/ui | Latest | Componentes UI |
| Lucide React | 0.453.0 | Ícones |
| Wouter | 3.3.5 | Routing |
| Framer Motion | 12.23.22 | Animações |
| Sonner | 2.0.7 | Notificações |
| Zod | 4.1.12 | Validação |
| React Hook Form | 7.64.0 | Gerenciamento de formulários |
| Axios | 1.12.0 | HTTP client |
| TypeScript | 5.6.3 | Tipagem estática |
| Prettier | 3.6.2 | Formatação de código |

---

**Última atualização:** Abril de 2026  
**Desenvolvido por:** Manus AI
