# SeriesHub

Uma aplicação web para explorar e favoritar séries de TV, construída com React, TypeScript e Tailwind CSS. O projeto utiliza a API do TMDB (The Movie Database) para obter informações sobre séries populares.

![Banner SeriesHub](/public/SeriesHub_banner.png)

## 🚀 Funcionalidades

- **Autenticação de Usuário**

  - Sistema de registro e login
  - Persistência de dados no localStorage
  - Gerenciamento de estado com Context API

- **Exploração de Séries**

  - Visualização de séries em tendência
  - Pesquisa por nome
  - Filtragem por gênero
  - Sistema de favoritos personalizado

- **Interface**
  - Design responsivo
  - Animações suaves
  - Feedback visual para interações
  - Modo escuro nativo

## 🛠️ Tecnologias Utilizadas

- **React** - Biblioteca JavaScript para construção de interfaces
- **TypeScript** - Superset JavaScript com tipagem estática
- **Tailwind CSS** - Framework CSS utility-first
- **Lucide React** - Biblioteca de ícones
- **Context API** - Gerenciamento de estado global
- **React Router** - Navegação entre páginas
- **Auto Animate** - Biblioteca para animações automáticas
- **Axios** - Cliente HTTP para requisições à API
- **TMDB API** - API de dados de filmes e séries

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/gafanhotoalexandre/serieshub.git

# Entre no diretório
cd serieshub

# Instale as dependências
npm install

# Configure as variáveis de ambiente
# Crie um arquivo .env na raiz do projeto com:
VITE_TMDB_API_KEY=sua_chave_api_aqui

# Inicie o servidor de desenvolvimento
npm run dev
```

## 🔧 Configuração

### Variáveis de Ambiente

O projeto requer uma chave de API do TMDB. Crie um arquivo `.env` na raiz do projeto:

```env
VITE_TMDB_API_KEY=sua_chave_api_aqui
```

### Autenticação

O sistema de autenticação utiliza localStorage para persistência de dados. As informações são armazenadas em dois formatos:

- `users`: Array de usuários registrados
- `currentUser`: Dados do usuário atual logado

## 📁 Estrutura do Projeto

```
src/
├── components/        # Componentes reutilizáveis
├── context/          # Contextos React (AuthContext)
├── pages/           # Páginas da aplicação
├── types/           # Definições de tipos TypeScript
├── utils/           # Funções utilitárias
└── App.tsx          # Componente raiz
```

## 🔒 Autenticação

O sistema de autenticação é gerenciado pelo `AuthContext` e oferece as seguintes funcionalidades:

- `login(email, password)`: Autentica um usuário existente
- `register(name, email, password)`: Registra um novo usuário
- `logout()`: Encerra a sessão do usuário atual
- `useAuth()`: Hook personalizado para acessar o contexto de autenticação

## 🎨 Componentes Principais

### HomePage

- Exibição de séries em tendência
- Sistema de busca e filtragem
- Gerenciamento de favoritos

### AuthPage

- Formulário de login/registro
- Alternância entre modos de autenticação
- Feedback de erros
- Animações de transição

## 🤝 Contribuindo

1. Faça o fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🙏 Agradecimentos

- [TMDB](https://www.themoviedb.org/) pela API de dados
- [Tailwind CSS](https://tailwindcss.com/) pelo framework de estilização
- [Lucide](https://lucide.dev/) pelos ícones
