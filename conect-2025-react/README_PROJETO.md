# CONECT 2025 — Congresso de Engenharia de Computação

**Versão:** 1.0  
**Status:** ✅ Pronto para desenvolvimento  
**Última atualização:** Abril de 2026

---

## Visão Geral

O **CONECT 2025** é um site moderno e responsivo para o Congresso de Engenharia de Computação do Instituto Federal do Maranhão (IFMA). O projeto foi desenvolvido em **React 19** com **Vite** e **Tailwind CSS**, oferecendo uma experiência de usuário fluida e intuitiva.

### Principais Características

✅ **Totalmente Responsivo** — Funciona perfeitamente em desktop, tablet e mobile  
✅ **Dark Theme Moderno** — Paleta de cores azul-roxo com gradientes elegantes  
✅ **Componentes Modulares** — Código organizado e fácil de manter  
✅ **Formulários Validados** — Inscrição com validação em tempo real  
✅ **Contagem Regressiva** — Timer até o evento  
✅ **Cronograma Dinâmico** — Tabs para cada dia do evento  
✅ **FAQ Interativo** — Accordion com perguntas frequentes  
✅ **Pronto para Backend** — Pontos de integração claramente marcados  

---

## Tecnologias Utilizadas

| Tecnologia | Versão | Propósito |
|------------|--------|----------|
| React | 19.2.1 | Framework principal |
| Vite | 7.1.7 | Build tool |
| TypeScript | 5.6.3 | Tipagem estática |
| Tailwind CSS | 4.1.14 | Styling |
| shadcn/ui | Latest | Componentes UI |
| Lucide React | 0.453.0 | Ícones |
| Framer Motion | 12.23.22 | Animações |

---

## Estrutura do Projeto

```
conect-2025-react/
├── client/
│   ├── src/
│   │   ├── components/          # Componentes React
│   │   │   ├── Navbar.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Schedule.tsx
│   │   │   ├── Registration.tsx
│   │   │   ├── FAQ.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Toast.tsx
│   │   │   └── Modal.tsx
│   │   ├── pages/
│   │   │   └── Home.tsx
│   │   ├── contexts/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   └── index.html
├── GUIA_INSTALACAO.md           # Guia para iniciantes
├── BIBLIOTECAS.md               # Documentação de dependências
├── README_PROJETO.md            # Este arquivo
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.ts
```

---

## Começando Rápido

### 1. Instalar Dependências

```bash
npm install
```

### 2. Iniciar Servidor de Desenvolvimento

```bash
npm run dev
```

Acesse `http://localhost:3000` no navegador.

### 3. Build para Produção

```bash
npm run build
```

---

## Componentes Principais

### Navbar
- Navegação fixa no topo
- Menu responsivo para mobile
- Logo com gradiente
- Links para todas as seções

### Hero
- Título principal com gradiente
- Contagem regressiva até o evento
- Botões de CTA (Inscrição e Saiba Mais)
- Estatísticas do evento
- Background com grid e gradientes

### About
- Descrição do evento
- Cards de temas (IA, Segurança, Cloud, IoT, Mobile, Pesquisa)
- Botão de inscrição

### Schedule
- Cronograma com tabs para cada dia
- Itens com horário, título, descrição e palestrante
- Badges de tipo (Abertura, Palestra, Workshop, Pausa, Artigos)
- Animações ao mudar de dia

### Registration
- Seleção de categoria de ingresso
- Formulário com validação completa
- Máscaras para CPF e telefone
- Feedback visual de erros
- Modal de confirmação

### FAQ
- Accordion com perguntas frequentes
- Uma pergunta aberta por vez
- Ícones de chevron animados

### Footer
- Informações de contato
- Links rápidos
- Copyright

---

## Paleta de Cores

| Cor | Hex | Uso |
|-----|-----|-----|
| Primário | #4f8ef7 | Botões, links, destaques |
| Secundário | #7c55e8 | Gradientes, efeitos |
| Terciário | #33d9f0 | Acentos, animações |
| Fundo | #07090f | Background principal |
| Card | #131a2a | Cards e containers |
| Texto | #e4e8f5 | Texto principal |
| Texto Secundário | #8899bb | Texto secundário |
| Borda | rgba(79,142,247,0.14) | Bordas |

---

## Scripts Disponíveis

```bash
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Cria build otimizado para produção
npm run preview      # Visualiza build de produção localmente
npm run check        # Verifica erros de TypeScript
npm run format       # Formata código com Prettier
```

---

## Integração com Backend

O projeto está preparado para integração com um backend. Os pontos de integração estão marcados com comentários `TODO:` nos componentes:

- **Registration.tsx** — Enviar dados de inscrição para `/api/inscricoes`
- **Submission.tsx** — Enviar artigos para `/api/submissoes` (não implementado ainda)

### Exemplo de Integração

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
```

---

## Customização

### Alterar Datas do Evento

**Arquivo:** `client/src/components/Hero.tsx` (linha 30)

```tsx
const targetDate = new Date('2025-08-14T08:00:00').getTime();
```

### Alterar Cores

**Arquivo:** `client/src/index.css` (linhas 45-80)

```css
:root {
  --primary: #4f8ef7;
  --secondary: #7c55e8;
  /* ... */
}
```

### Alterar Conteúdo

Edite os textos diretamente nos componentes:

- **Sobre:** `client/src/components/About.tsx`
- **Cronograma:** `client/src/components/Schedule.tsx`
- **FAQ:** `client/src/components/FAQ.tsx`

---

## Documentação Adicional

- **[GUIA_INSTALACAO.md](./GUIA_INSTALACAO.md)** — Guia completo para iniciantes
- **[BIBLIOTECAS.md](./BIBLIOTECAS.md)** — Documentação de todas as dependências

---

## Roadmap

- [ ] Implementar componente Submission (submissão de artigos)
- [ ] Integrar com backend para inscrições
- [ ] Adicionar sistema de autenticação
- [ ] Implementar dashboard de admin
- [ ] Adicionar suporte a múltiplos idiomas
- [ ] Otimizar performance
- [ ] Adicionar testes unitários

---

## Troubleshooting

### Erro: "npm: command not found"
Instale Node.js de [https://nodejs.org/](https://nodejs.org/)

### Erro: "Port 3000 is already in use"
```bash
npm run dev -- --port 3001
```

### Estilos não aparecem
Limpe o cache do navegador e recarregue a página.

### Mais problemas?
Consulte o [GUIA_INSTALACAO.md](./GUIA_INSTALACAO.md) na seção Troubleshooting.

---

## Contribuindo

Para contribuir com o projeto:

1. Crie uma branch para sua feature: `git checkout -b feature/minha-feature`
2. Commit suas mudanças: `git commit -m 'Adiciona minha feature'`
3. Push para a branch: `git push origin feature/minha-feature`
4. Abra um Pull Request

---

## Licença

Este projeto é propriedade do Instituto Federal do Maranhão (IFMA).

---

## Contato

**E-mail:** conect@ifma.edu.br  
**Telefone:** (98) 3216-0000  
**Localização:** São Luís, Maranhão, Brasil

---

## Créditos

- **Desenvolvido por:** Manus AI
- **Baseado em:** Projeto HTML/CSS original do CONECT 2025
- **Tecnologias:** React, Vite, Tailwind CSS, TypeScript

---

**Última atualização:** Abril de 2026  
**Versão:** 1.0.0
