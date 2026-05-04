# Guia de Teste - CONECT 2026

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:
- **Node.js** (versão 18 ou superior) - [Download](https://nodejs.org/)
- **pnpm** (gerenciador de pacotes) - Execute: `npm install -g pnpm`
- **Git** (opcional, para controle de versão)

## Passo 1: Extrair o ZIP

```bash
# Descompacte o arquivo
unzip conect-2026-source.zip

# Entre no diretório do projeto
cd conect-2025
```

## Passo 2: Instalar Dependências

```bash
# Instale todas as dependências do projeto
pnpm install

# Isso pode levar alguns minutos na primeira vez
```

## Passo 3: Iniciar o Servidor de Desenvolvimento

```bash
# Inicie o servidor Vite
pnpm dev

# Você verá uma mensagem como:
# ➜  Local:   http://localhost:5173/
# ➜  Network: http://192.168.x.x:5173/
```

## Passo 4: Acessar o Projeto

Abra seu navegador e acesse:
- **URL Local:** `http://localhost:5173/`
- **URL de Rede:** Use o IP mostrado no terminal para acessar de outro dispositivo

## Cenários de Teste

### 1. Testar Inscrição
1. Clique em "Inscrever-se" na página inicial
2. Preencha o formulário com dados de teste
3. Clique em "Garantir Inscrição"
4. Será solicitado login/registro
5. Faça login com: `teste@conect.com` / `123456`
6. Após autenticação, você será redirecionado para a página de confirmação
7. Verifique se seus dados aparecem corretamente

**Dados de teste para inscrição:**
```
Nome: João Silva
Email: joao@example.com
CPF: 123.456.789-00
Telefone: (98) 99999-9999
Instituição: IFMA
Categoria: Estudante
Área: Inteligência Artificial
```

### 2. Testar Submissão de Artigos
1. Clique em "SUBMISSÃO" na navbar
2. Preencha o formulário com dados do artigo
3. Clique em "Enviar Artigo"
4. Será solicitado login/registro
5. Faça login com: `teste@conect.com` / `123456`
6. Após autenticação, o artigo será salvo localmente

**Dados de teste para submissão:**
```
Título: Aplicação de IA em Educação
Autores: João Silva, Maria Santos
Email: joao@example.com
Instituição: IFMA
Área: Inteligência Artificial
Resumo: Este trabalho apresenta uma aplicação de inteligência artificial...
```

### 3. Testar Autenticação
1. Clique em "Login" na navbar
2. Teste com credenciais de teste:
   - Email: `teste@conect.com`
   - Senha: `123456`
3. Após login, você verá seu perfil
4. Clique em "Meu Perfil" para acessar a página de perfil

### 4. Testar Registro
1. Clique em "Login" na navbar
2. Clique em "Criar uma conta"
3. Preencha os dados:
   - Email: `novo@example.com`
   - Senha: `senha123`
   - Confirmação: `senha123`
4. Clique em "Registrar"
5. Você será redirecionado para a página de login

### 5. Testar Upload de Foto de Perfil
1. Faça login com: `teste@conect.com` / `123456`
2. Clique em "Meu Perfil"
3. Na aba "PERFIL", clique em "Alterar Foto"
4. Selecione uma imagem do seu computador
5. Clique em "Salvar Foto"
6. A foto será salva localmente no navegador

### 6. Testar Página de Confirmação
1. Complete uma inscrição
2. Você será redirecionado para `/confirmacao`
3. Verifique se seus dados aparecem
4. Clique em "Adicionar à Agenda" para salvar o evento
5. Escolha entre Google Calendar ou baixar arquivo .ics

### 7. Testar Dashboard de Admin (Escondido)
1. Acesse diretamente: `http://localhost:5173/admin-login`
2. Faça login com:
   - Email: `admin@conect.com`
   - Senha: `admin123`
3. Você terá acesso ao dashboard com:
   - Gerenciamento de usuários
   - Gerenciamento de inscrições
   - Gerenciamento de eventos
   - Relatórios e estatísticas

### 8. Testar Navegação
- Clique em "SOBRE" → Deve rolar para seção de sobre
- Clique em "CRONOGRAMA" → Deve rolar para cronograma
- Clique em "GUIA" → Deve ir para página de guia
- Clique em "FAQ" → Deve rolar para FAQ
- Clique em "LOCAL" → Deve mostrar mapa

### 9. Testar Responsividade
1. Abra as ferramentas do desenvolvedor (F12)
2. Clique no ícone de dispositivo móvel
3. Teste em diferentes tamanhos:
   - Mobile (375px)
   - Tablet (768px)
   - Desktop (1920px)
4. Verifique se a navbar se adapta corretamente

### 10. Testar Dados Locais
1. Abra o console do navegador (F12)
2. Vá para "Application" → "Local Storage"
3. Você verá os dados salvos:
   - `currentUser` - Dados do usuário autenticado
   - `registrations` - Inscrições salvas
   - `submissions` - Artigos submetidos
   - `events` - Eventos criados
   - `notifications` - Notificações

## Dados de Teste Pré-configurados

### Usuários de Teste
```
# Usuário Regular
Email: teste@conect.com
Senha: 123456

# Administrador
Email: admin@conect.com
Senha: admin123
```

### Eventos Pré-criados
```
1. Abertura do Congresso
   Data: 2026-06-02
   Hora: 08:00
   Local: Auditório Principal
   Capacidade: 500

2. Palestra de Inteligência Artificial
   Data: 2026-06-02
   Hora: 09:00
   Local: Sala 101
   Capacidade: 100
```

## Verificações Importantes

- [ ] Página inicial carrega corretamente
- [ ] Navbar funciona em desktop e mobile
- [ ] Inscrição salva dados no localStorage
- [ ] Login/Registro funciona
- [ ] Página de confirmação exibe dados corretos
- [ ] QR Code é gerado
- [ ] Botão "Adicionar à Agenda" funciona
- [ ] Upload de foto funciona
- [ ] Dashboard admin é acessível apenas por URL
- [ ] Dados persistem após recarregar a página
- [ ] Responsividade funciona em todos os tamanhos

## Troubleshooting

### Erro: "pnpm: comando não encontrado"
```bash
# Instale pnpm globalmente
npm install -g pnpm

# Ou use npm diretamente
npm install
npm run dev
```

### Erro: "Porta 5173 já está em uso"
```bash
# Use uma porta diferente
pnpm dev -- --port 3000
```

### Dados não aparecem após recarregar
- Verifique se o localStorage está habilitado no navegador
- Abra F12 → Application → Local Storage
- Verifique se os dados estão lá

### Página em branco
- Abra o console (F12) e procure por erros
- Verifique se todas as dependências foram instaladas: `pnpm install`
- Limpe o cache: `pnpm install --force`

## Comandos Úteis

```bash
# Instalar dependências
pnpm install

# Iniciar servidor de desenvolvimento
pnpm dev

# Compilar para produção
pnpm build

# Visualizar build de produção
pnpm preview

# Verificar erros de TypeScript
pnpm check

# Formatar código
pnpm format
```

## Estrutura de Pastas

```
conect-2025/
├── client/
│   ├── src/
│   │   ├── components/       # Componentes React
│   │   ├── pages/            # Páginas da aplicação
│   │   ├── contexts/         # Contextos (Auth, Theme)
│   │   ├── lib/              # Utilitários (storage, notifications)
│   │   ├── hooks/            # Hooks customizados
│   │   ├── App.tsx           # Arquivo principal
│   │   └── index.css         # Estilos globais
│   ├── public/               # Arquivos estáticos
│   └── index.html            # HTML principal
├── server/
│   └── index.ts              # Servidor Express
├── package.json              # Dependências
└── pnpm-lock.yaml            # Lock file
```

## Próximos Passos

Após testar com sucesso, você pode:

1. **Customizar Dados**: Edite os dados de teste em `client/src/lib/storage.ts`
2. **Adicionar Backend**: Conecte a um servidor real (Node.js, Python, etc.)
3. **Integrar Banco de Dados**: Use PostgreSQL, MongoDB, etc.
4. **Implementar Email**: Adicione notificações por email
5. **Deploy**: Publique em Vercel, Netlify, ou seu servidor

## Suporte

Se encontrar problemas:
1. Verifique se todas as dependências estão instaladas
2. Limpe o cache do navegador (Ctrl+Shift+Delete)
3. Verifique o console do navegador (F12)
4. Reinicie o servidor (`pnpm dev`)

---

**Versão:** 1.0
**Data:** Maio de 2026
**Projeto:** CONECT 2026 - Congresso de Engenharia de Computação
