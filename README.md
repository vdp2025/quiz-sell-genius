# Quiz Editor

Este é um projeto de editor de quiz que utiliza Vue.js para a interface do usuário.

## Estrutura do Projeto

```
quiz-editor/
├── src/
│   ├── components/
│   │   ├── quiz-vue/           # Componentes Vue.js
│   │   │   ├── QuizQuestion.vue
│   │   │   ├── QuizIntro.vue
│   │   │   ├── QuizResult.vue
│   │   │   └── index.ts
│   │   ├── shared/            # Componentes compartilhados
│   │   └── ui/               # Componentes de UI reutilizáveis
│   ├── assets/              # Recursos estáticos
│   ├── styles/             # Estilos globais
│   └── types/             # Definições de tipos TypeScript
```

## Componentes Principais

### QuizQuestion
- Componente para exibir perguntas do quiz
- Suporta opções com texto e imagem
- Inclui barra de progresso
- Animações e transições suaves

### QuizIntro
- Tela inicial do quiz
- Coleta informações do usuário
- Animações de entrada

### QuizResult
- Exibe resultados do quiz
- Suporta diferentes layouts
- Inclui opções de compartilhamento

## Tecnologias

- Vue.js 3
- TypeScript
- TailwindCSS
- Vite

## Como Usar

1. Instale as dependências:
```bash
npm install
```

2. Execute o projeto em desenvolvimento:
```bash
npm run dev
```

3. Para build de produção:
```bash
npm run build
```
