# Guia Completo de Instalação e Uso — CONECT 2025 React App

**Versão:** 1.0  
**Data:** Abril de 2026  
**Público:** Iniciantes em React e desenvolvimento web

---

## Índice

1. [Visão Geral do Projeto](#visão-geral-do-projeto)
2. [Pré-requisitos](#pré-requisitos)
3. [Instalação Passo a Passo](#instalação-passo-a-passo)
4. [Iniciando o Servidor de Desenvolvimento](#iniciando-o-servidor-de-desenvolvimento)
5. [Estrutura do Projeto](#estrutura-do-projeto)
6. [Entendendo os Componentes](#entendendo-os-componentes)
7. [Integração com Backend](#integração-com-backend)
8. [Troubleshooting](#troubleshooting)
9. [Próximos Passos](#próximos-passos)

---

## Visão Geral do Projeto

O **CONECT 2025** é um site moderno para o Congresso de Engenharia de Computação do IFMA, desenvolvido em **React 19** com **Vite** e **Tailwind CSS**. O projeto foi convertido de HTML/CSS estático para uma aplicação React totalmente componentizada, facilitando manutenção, escalabilidade e integração com um backend.

### Principais Características

- **Framework:** React 19 com TypeScript
- **Build Tool:** Vite (desenvolvimento rápido)
- **Styling:** Tailwind CSS 4 + componentes shadcn/ui
- **Tema:** Dark mode com gradientes azul-roxo
- **Responsividade:** Mobile-first design
- **Formulários:** Validação completa com feedback visual
- **Animações:** Transições suaves com Framer Motion

---

## Pré-requisitos

Antes de começar, você precisa ter instalado em seu computador:

### 1. Node.js e npm

**O que é?** Node.js é um ambiente que permite executar JavaScript fora do navegador. npm é o gerenciador de pacotes do Node.js (como uma "loja de aplicativos" para bibliotecas JavaScript).

**Como instalar:**

- Acesse [https://nodejs.org/](https://nodejs.org/)
- Baixe a versão **LTS** (Long Term Support — a mais estável)
- Execute o instalador e siga as instruções padrão
- Deixe marcadas as opções padrão (npm será instalado automaticamente)

**Como verificar se está instalado:**

Abra o terminal/prompt de comando e digite:

```bash
node --version
npm --version
```

Você deve ver números de versão (ex: v20.10.0 e 10.2.3).

### 2. Git (Opcional, mas Recomendado)

**O que é?** Git é um sistema de controle de versão que rastreia mudanças no código.

**Como instalar:**

- Acesse [https://git-scm.com/](https://git-scm.com/)
- Baixe e instale seguindo as instruções padrão

**Como verificar:**

```bash
git --version
```

### 3. Editor de Código

Recomendamos o **Visual Studio Code (VS Code)**:

- Acesse [https://code.visualstudio.com/](https://code.visualstudio.com/)
- Baixe e instale
- Extensões recomendadas:
  - **ES7+ React/Redux/React-Native snippets** (dsznajder.es7-react-js-snippets)
  - **Tailwind CSS IntelliSense** (bradlc.vscode-tailwindcss)
  - **TypeScript Vue Plugin** (Vue.volar)

---

## Instalação Passo a Passo

### Passo 1: Clonar ou Baixar o Projeto

**Opção A — Com Git (Recomendado):**

```bash
git clone <URL-DO-REPOSITORIO>
cd conect-2025-react
```

**Opção B — Sem Git:**

- Baixe o arquivo ZIP do projeto
- Descompacte em uma pasta de sua escolha
- Abra o terminal/prompt e navegue até a pasta:

```bash
cd caminho/para/conect-2025-react
```

### Passo 2: Instalar Dependências

As "dependências" são bibliotecas externas que o projeto precisa para funcionar. Este comando baixa e instala todas elas:

```bash
npm install
```

**O que esperar:**

- Uma pasta `node_modules/` será criada (pode levar alguns minutos)
- Você verá mensagens de progresso no terminal
- Ao final, você verá "added XXX packages"

**Dica:** Este passo só precisa ser feito uma vez. Se você clonar o projeto em outro computador, repita este passo.

### Passo 3: Verificar a Instalação

Para garantir que tudo foi instalado corretamente:

```bash
npm run check
```

Este comando verifica se não há erros de TypeScript no código.

---

## Iniciando o Servidor de Desenvolvimento

### Comando Principal

Para iniciar o servidor de desenvolvimento e ver o site no navegador:

```bash
npm run dev
```

**O que esperar:**

```
➜  Local:   http://localhost:3000/
➜  Network: http://169.254.0.21:3000/
```

### Acessar o Site

1. Abra seu navegador (Chrome, Firefox, Safari, Edge)
2. Digite na barra de endereço: `http://localhost:3000`
3. Você verá o site do CONECT 2025 carregando

### Desenvolvimento em Tempo Real

**Uma das maiores vantagens do Vite:** Quando você salva um arquivo, o navegador atualiza automaticamente (sem precisar recarregar manualmente). Isso é chamado de **Hot Module Replacement (HMR)**.

**Como funciona:**

1. Faça uma mudança em um arquivo (ex: mude "Congresso" para "Conferência" em `Hero.tsx`)
2. Salve o arquivo (Ctrl+S ou Cmd+S)
3. O navegador atualiza automaticamente mostrando a mudança

### Parar o Servidor

Para parar o servidor de desenvolvimento, pressione `Ctrl+C` no terminal.

---

## Estrutura do Projeto

Entender a estrutura de pastas ajuda a navegar e encontrar arquivos:

```
conect-2025-react/
├── client/
│   ├── public/                 # Arquivos estáticos (favicon, robots.txt)
│   ├── src/
│   │   ├── components/         # Componentes React reutilizáveis
│   │   │   ├── Navbar.tsx      # Barra de navegação
│   │   │   ├── Hero.tsx        # Seção inicial com título
│   │   │   ├── About.tsx       # Sobre o evento
│   │   │   ├── Schedule.tsx    # Cronograma com tabs
│   │   │   ├── Registration.tsx # Formulário de inscrição
│   │   │   ├── FAQ.tsx         # Perguntas frequentes
│   │   │   ├── Footer.tsx      # Rodapé
│   │   │   ├── Toast.tsx       # Notificações temporárias
│   │   │   └── Modal.tsx       # Diálogos modais
│   │   ├── pages/              # Páginas principais
│   │   │   └── Home.tsx        # Página inicial
│   │   ├── contexts/           # Contextos React (tema, autenticação)
│   │   ├── hooks/              # Hooks customizados
│   │   ├── lib/                # Funções utilitárias
│   │   ├── App.tsx             # Componente raiz
│   │   ├── main.tsx            # Ponto de entrada
│   │   └── index.css           # Estilos globais + Tailwind
│   └── index.html              # HTML principal
├── server/                     # Backend (não usado em static)
├── package.json                # Dependências e scripts
├── tsconfig.json               # Configuração TypeScript
├── vite.config.ts              # Configuração Vite
└── tailwind.config.ts          # Configuração Tailwind CSS
```

### O que Cada Pasta Faz

| Pasta | Propósito |
|-------|-----------|
| `components/` | Componentes React reutilizáveis (Navbar, Hero, etc.) |
| `pages/` | Páginas completas (Home, About, etc.) |
| `contexts/` | Gerenciamento de estado global (tema, usuário) |
| `hooks/` | Funções React customizadas |
| `lib/` | Funções utilitárias (formatação, validação) |
| `public/` | Arquivos que não são processados (favicon, robots.txt) |

---

## Entendendo os Componentes

Um **componente** é um bloco reutilizável de interface. Pense como um "widget" ou "módulo" que pode ser usado em vários lugares.

### Exemplo: Componente Navbar

**Arquivo:** `client/src/components/Navbar.tsx`

```tsx
export default function Navbar() {
  // Estado do menu mobile
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 px-6">
      {/* Logo */}
      <div className="grad-text">CONECT'25</div>

      {/* Links de navegação */}
      <ul className="flex gap-8">
        <li><a href="#sobre">Sobre</a></li>
        <li><a href="#cronograma">Cronograma</a></li>
        {/* ... mais links ... */}
      </ul>

      {/* Botão hamburger para mobile */}
      <button onClick={() => setIsOpen(!isOpen)}>Menu</button>
    </nav>
  );
}
```

**Como usar em outro lugar:**

```tsx
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <div>
      <Navbar />
      {/* ... resto do conteúdo ... */}
    </div>
  );
}
```

### Componentes Principais

| Componente | Responsabilidade |
|------------|------------------|
| **Navbar** | Barra de navegação fixa no topo |
| **Hero** | Seção inicial com título e contagem regressiva |
| **About** | Descrição do evento e cards de temas |
| **Schedule** | Cronograma com tabs para cada dia |
| **Registration** | Formulário de inscrição com validação |
| **FAQ** | Perguntas frequentes com accordion |
| **Footer** | Rodapé com informações de contato |
| **Toast** | Notificações temporárias (sucesso/erro) |
| **Modal** | Diálogos modais (confirmações) |

---

## Integração com Backend

O projeto está preparado para integração com um backend. Os pontos de integração estão marcados com comentários `TODO:`.

### Exemplo: Formulário de Inscrição

**Arquivo:** `client/src/components/Registration.tsx`

**Código atual (simulado):**

```tsx
// Simulação local (remover quando conectar ao backend)
console.log('Dados de inscrição:', {
  nome: `${formData.firstName} ${formData.lastName}`,
  email: formData.email,
  cpf: formData.cpf,
  // ...
});
```

**Como integrar com backend:**

Substitua o código acima por:

```tsx
const response = await fetch('/api/inscricoes', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    nome: `${formData.firstName} ${formData.lastName}`,
    email: formData.email,
    cpf: formData.cpf,
    telefone: formData.phone,
    instituicao: formData.institution,
    categoria: formData.category,
    area: formData.area,
    timestamp: new Date().toISOString(),
  }),
});

const data = await response.json();
if (data.ok) {
  setShowModal(true);
} else {
  setToastMessage({
    type: 'error',
    title: 'Erro',
    message: data.message,
  });
}
```

### Endpoints Esperados

O backend deve fornecer os seguintes endpoints:

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/inscricoes` | Registrar inscrição |
| POST | `/api/submissoes` | Submeter artigo/TCC |
| GET | `/api/cronograma` | Obter cronograma |
| GET | `/api/palestrantes` | Obter lista de palestrantes |

---

## Troubleshooting

### Problema: "npm: command not found"

**Causa:** Node.js não está instalado ou não está no PATH.

**Solução:**

1. Instale Node.js de [https://nodejs.org/](https://nodejs.org/)
2. Reinicie seu terminal/prompt
3. Tente novamente: `npm --version`

### Problema: "Port 3000 is already in use"

**Causa:** Outro aplicativo está usando a porta 3000.

**Solução:**

**Opção 1 — Usar outra porta:**

```bash
npm run dev -- --port 3001
```

**Opção 2 — Encerrar o processo na porta 3000:**

**Windows:**

```bash
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Mac/Linux:**

```bash
lsof -i :3000
kill -9 <PID>
```

### Problema: "Module not found" ou erros de import

**Causa:** Dependências não foram instaladas.

**Solução:**

```bash
npm install
npm run dev
```

### Problema: Estilos não aparecem

**Causa:** Tailwind CSS não foi compilado.

**Solução:**

1. Verifique se o servidor está rodando: `npm run dev`
2. Limpe o cache do navegador: `Ctrl+Shift+Delete` (Chrome) ou `Cmd+Shift+Delete` (Firefox)
3. Recarregue a página: `Ctrl+R` ou `Cmd+R`

### Problema: TypeScript mostra erros

**Causa:** Erros de tipo no código.

**Solução:**

```bash
npm run check
```

Isso mostrará os erros de TypeScript. Corrija-os seguindo as mensagens de erro.

---

## Próximos Passos

### 1. Customizar o Conteúdo

Edite os textos, datas e informações nos componentes:

- **Datas:** `client/src/components/Hero.tsx` (linha 30)
- **Descrição:** `client/src/components/About.tsx`
- **Cronograma:** `client/src/components/Schedule.tsx`
- **FAQ:** `client/src/components/FAQ.tsx`

### 2. Adicionar Componente Submission

O componente de submissão de artigos foi deixado como TODO. Para implementá-lo:

1. Crie `client/src/components/Submission.tsx`
2. Importe em `client/src/pages/Home.tsx`
3. Adicione a seção no JSX

### 3. Integrar com Backend

Siga as instruções na seção [Integração com Backend](#integração-com-backend).

### 4. Deploy

Para colocar o site em produção:

```bash
npm run build
```

Isso cria uma pasta `dist/` com os arquivos otimizados prontos para deploy.

### 5. Aprender Mais

**Recursos recomendados:**

- [React Documentation](https://react.dev) — Documentação oficial do React
- [Tailwind CSS Docs](https://tailwindcss.com/docs) — Documentação do Tailwind
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) — Guia de TypeScript
- [Vite Guide](https://vitejs.dev/guide/) — Documentação do Vite

---

## Suporte e Dúvidas

Se encontrar problemas:

1. Verifique a seção [Troubleshooting](#troubleshooting)
2. Consulte a documentação oficial das ferramentas
3. Procure por erros similares em fóruns como Stack Overflow
4. Entre em contato com o time de desenvolvimento

---

**Última atualização:** Abril de 2026  
**Desenvolvido por:** Manus AI  
**Versão do React:** 19.2.1  
**Versão do Vite:** 7.1.7
