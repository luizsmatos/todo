# Task

Task App - Um aplicativo para gerenciamento de tarefas.

## 🚀 Começando

Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e teste.

### 📋 Pré-requisitos

Antes de começar, certifique-se de ter os seguintes itens instalados:

- [Node.js](https://nodejs.org/) (versão recomendada: 22.13.1+)
- [NestJS CLI](https://docs.nestjs.com/)
- [Prisma](https://www.prisma.io/)
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)
- Banco de dados PostgreSQL

### 🔧 Instalação

Siga os passos abaixo para instalar e configurar o projeto:

1. Clone o repositório:
   ```sh
   git clone https://github.com/luizsmatos/todo.git
   cd todo
   ```

2. Instale as dependências:
   ```sh
   npm install
   ```

3. Configure suas variáveis de ambiente:
   ```sh
   # Certifique-se de ajustar as variáveis de ambiente conforme necessário.
   cp .env.example .env
   ```

4. Execute as migrações do banco de dados:
   ```sh
   # Edite o arquivo .env com suas configurações de banco de dados
   npm run db:migrate:dev
   ```

5. Gere os clientes Prisma:
   ```sh
   npm run db:generate
   ```

6. Inicie o servidor de desenvolvimento:
   ```sh
   npm run start:dev
   ```

## 🐳 Execução com Docker

Para rodar o projeto utilizando Docker e Docker Compose:

1. Construa e inicie os containers:
   ```sh
   docker-compose up --build
   ```

2. Para parar os containers:
   ```sh
   docker-compose down
   ```

## 📄 Documentação via Swagger

A documentação da API está disponível via Swagger. Para acessá-la, siga os passos:

1. Inicie o servidor de desenvolvimento:
   ```sh
   npm run start:dev
   ```

2. Acesse a documentação no navegador através da URL:
   ```
   http://localhost:3000/docs
   ```

Caso esteja rodando em um ambiente diferente, substitua `localhost:3000` pelo host correto.

## ⚙️ Executando os testes

Para rodar os testes automatizados, utilize os seguintes comandos:

### 🧪 Testes unitários

```sh
npm run test
```

### 🔩 Testes de ponta a ponta

```sh
npm run test:e2e
```

### ⌨️ Testes de estilo de codificação

```sh
npm run lint
npm run format
```

## 📦 Implantação

Para implantar o projeto em produção:

```sh
npm run build
npm run start:prod
```

## 🛠️ Construído com

* [NestJS](https://nestjs.com/) - Framework para Node.js
* [Prisma](https://www.prisma.io/) - ORM para banco de dados
* [Vitest](https://vitest.dev/) - Testes automatizados
* [ESLint](https://eslint.org/) - Linter para JavaScript/TypeScript
* [Prettier](https://prettier.io/) - Formatador de código
