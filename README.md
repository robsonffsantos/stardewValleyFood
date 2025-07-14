# 🍽️ Stardew Valley Food - Delivery App

Um aplicativo de delivery de comida inspirado no universo de Stardew Valley, desenvolvido com React, Tailwind CSS e JavaScript. Oferece uma experiência completa de pedidos online com restaurantes temáticos, sistema de carrinho, histórico de compras e muito mais.

## ✨ Características Principais

### 🏪 **Sistema de Restaurantes**
- **6 restaurantes temáticos** inspirados em Stardew Valley
- **Horários de funcionamento** realistas com verificação em tempo real
- **Taxas de entrega** personalizadas por restaurante
- **Tempos de preparo** variados (30-70 minutos)
- **Categorias de comida** (Café da manhã, Almoço, Jantar, 24h, Bar)

### 🛒 **Sistema de Carrinho Avançado**
- **Carrinho persistente** com múltiplos restaurantes
- **Quantidade personalizável** por item
- **Remoção individual** de itens
- **Modal de confirmação** para remoção
- **Cálculo automático** de subtotal, taxas e total
- **Verificação de saldo** do usuário

### ⏰ **Tempo de Entrega Inteligente**
- **Cálculo dinâmico** baseado no tempo de preparo dos restaurantes
- **Tempo aleatório** adicional (20-40 minutos)
- **Múltiplos restaurantes**: usa o maior tempo de preparo
- **Range de tempo** realista (ex: "75-85 minutos")

### 🔒 **Sistema de Autenticação**
- **Login/Registro** de usuários
- **Saldo virtual** em "ouros" (moeda do jogo)
- **Perfil personalizado** com histórico de compras
- **Favoritos** automáticos baseados no histórico

### 📊 **Histórico de Compras**
- **Paginação** com 3 pedidos por página
- **Navegação completa** (primeira, última, anterior, próxima)
- **Detalhes completos** de cada pedido
- **Comida e restaurante favoritos** calculados automaticamente
- **Filtros por data** e informações detalhadas

### 🎨 **Interface Responsiva**
- **Design mobile-first** com Tailwind CSS
- **Tema âmbar** consistente em todo o app
- **Animações suaves** e transições
- **Loading states** para melhor UX
- **Modais interativos** com feedback visual

### 🕐 **Verificação de Horários**
- **Status em tempo real** (Aberto/Fechado)
- **Modal de alerta** para restaurantes fechados
- **Indicadores visuais** (🟢 Aberto / 🔴 Fechado)
- **Horários visíveis** em cada restaurante

## 🚀 Tecnologias Utilizadas

- **React 18** - Framework principal
- **React Router** - Navegação entre páginas
- **Tailwind CSS** - Estilização e responsividade
- **Context API** - Gerenciamento de estado global
- **LocalStorage** - Persistência de dados
- **Vite** - Build tool e desenvolvimento

## 📁 Estrutura do Projeto

```
stardewValleyFood/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── Banner.jsx       # Banner principal
│   │   ├── Card.jsx         # Cards de navegação
│   │   ├── Cart.jsx         # Sistema de carrinho
│   │   ├── Header.jsx       # Cabeçalho
│   │   ├── Footer.jsx       # Rodapé
│   │   ├── Loading.jsx      # Componente de loading
│   │   ├── Modal.jsx        # Modais
│   │   └── ...
│   ├── pages/               # Páginas principais
│   │   ├── HomePage.jsx     # Página inicial
│   │   ├── Restaurants.jsx  # Lista de restaurantes
│   │   ├── Profile.jsx      # Perfil do usuário
│   │   ├── Cart.jsx         # Página do carrinho
│   │   └── ...
│   ├── context/             # Contextos React
│   │   ├── GlobalContext.jsx # Estado global
│   │   └── LoginContext.jsx  # Autenticação
│   ├── utils/               # Dados estáticos
│   │   ├── restaurants.json # Dados dos restaurantes
│   │   └── recipes.json     # Dados das receitas
│   └── assets/              # Imagens e ícones
├── public/                  # Arquivos públicos
└── package.json            # Dependências
```

## 🏪 Restaurantes Disponíveis

| Restaurante | Horário | Taxa | Tempo | Tipo |
|-------------|---------|------|-------|------|
| **Restaurante do Willy** | 13:00-23:00 | 140 ouros | 55 min | Almoço/Janta |
| **Sallon Fruta Estelar** | 08:00-00:00 | 180 ouros | 40 min | Café/Almoço/Janta |
| **Armazém do Pierre** | 07:00-18:00 | 250 ouros | 30 min | Café/Almoço |
| **Restaurante Joja** | 00:00-23:59 | 100 ouros | 60 min | 24h |
| **Resort Gengibre** | 13:00-19:00 | 400 ouros | 70 min | Bar |
| **Cálico** | 00:00-23:59 | 300 ouros | 40 min | 24h |

## 🎮 Funcionalidades do Jogo

### 💰 Sistema Monetário
- **Moeda**: Ouros (moeda oficial de Stardew Valley)
- **Saldo inicial**: 1000 ouros para novos usuários
- **Gastos**: Comidas, taxas de entrega
- **Histórico**: Todas as transações registradas

### 🏆 Sistema de Favoritos
- **Comida favorita**: Calculada automaticamente baseada no histórico
- **Restaurante favorito**: Baseado na frequência de pedidos
- **Exibição**: Cards especiais no perfil do usuário

### 📱 Experiência Mobile
- **Design responsivo** para todos os dispositivos
- **Touch-friendly** com botões adequados
- **Navegação intuitiva** com gestos
- **Performance otimizada** para mobile

## 🚀 Como Executar

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone https://github.com/seu-usuario/stardewValleyFood.git

# Entre no diretório
cd stardewValleyFood

# Instale as dependências
npm install

# Execute o projeto
npm run dev
```

### Scripts Disponíveis
```bash
npm run dev          # Inicia o servidor de desenvolvimento
npm run build        # Gera build de produção
npm run preview      # Visualiza o build de produção
```

## 🎯 Funcionalidades Principais

### 🏠 Página Inicial
- Banner animado com tema Stardew Valley
- Cards de navegação para restaurantes e sugestões
- Filtros por tipo de restaurante
- Promoção especial com modal interativo

### 🏪 Lista de Restaurantes
- Grid responsivo com cards dos restaurantes
- Filtros por categoria (Café, Almoço, Jantar, etc.)
- Informações completas: horário, taxa, tempo de preparo
- Navegação para detalhes de cada restaurante

### 🍽️ Detalhes do Restaurante
- Informações completas do restaurante
- Menu com todas as receitas disponíveis
- Filtros por categoria de comida
- Modal para adicionar ao carrinho
- Status de funcionamento em tempo real

### 🛒 Carrinho de Compras
- Lista de itens com quantidades
- Cálculo automático de valores
- Taxas de entrega por restaurante
- Verificação de horários de funcionamento
- Processamento de pedido com loading

### 👤 Perfil do Usuário
- Informações pessoais
- Saldo atual em ouros
- Histórico de compras com paginação
- Comida e restaurante favoritos
- Navegação para outras seções

## 🎨 Design System

### Cores Principais
- **Âmbar**: `#d97706` (cor principal)
- **Âmbar Escuro**: `#92400e` (hover states)
- **Branco**: `#ffffff` (fundo)
- **Cinza**: `#6b7280` (texto secundário)

### Tipografia
- **Títulos**: Font-semibold, tamanhos responsivos
- **Texto**: Font-normal, legível em mobile
- **Botões**: Font-medium, com hover effects

### Componentes
- **Cards**: Sombras suaves, bordas arredondadas
- **Botões**: Gradientes âmbar, transições suaves
- **Modais**: Overlay com blur, animações
- **Loading**: Spinner animado com tema consistente

## 🔧 Funcionalidades Técnicas

### Estado Global
- **Context API** para gerenciamento de estado
- **LocalStorage** para persistência
- **Hooks customizados** para lógica reutilizável

### Performance
- **Lazy loading** de componentes
- **Memoização** de cálculos pesados
- **Otimização** de re-renders
- **Loading states** para melhor UX

### Responsividade
- **Mobile-first** approach
- **Breakpoints** consistentes
- **Flexbox/Grid** para layouts
- **Touch targets** adequados

## 🎮 Inspiração Stardew Valley

O projeto é inspirado no jogo Stardew Valley, incorporando:
- **Estética visual** do jogo
- **Sistema monetário** (ouros)
- **Personagens** como Willy, Pierre, Morris
- **Locais** como Saloon, Joja Mart, Desert
- **Receitas** do jogo (Stardrop, Coffee, etc.)

## 👨‍💻 Autor

- GitHub: [@robsonffsantos](https://github.com/robsonffsantos)
- LinkedIn: [Robson Fernando](https://www.linkedin.com/in/robsonffdossantos/)

## 🙏 Agradecimentos

- **ConcernedApe** - Criador de Stardew Valley
- **Comunidade React** - Recursos e documentação
- **Tailwind CSS** - Framework de estilização
