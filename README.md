# Frontend Desafio iCasei

Frontend para o desafio iCasei, feito sem frameworks JS como React, Vue ou Angular.

## Pré-requisitos

Antes de começar, certifique-se de ter instalado o seguinte:
- Docker: [Instalação do Docker](https://docs.docker.com/get-docker/)
- Node.js e npm: [Instalação do Node.js](https://nodejs.org/)
- TypeScript: [Instalação do TypeScript](https://www.typescriptlang.org/)

## Configuração do Ambiente

1. Clone o repositório:

    ```bash
    git clone https://github.com/seu-usuario/seu-projeto-frontend.git
    cd seu-projeto-frontend
    ```

2. Crie um arquivo .env na raiz do projeto com as variáveis de ambiente necessárias para o seu frontend, se houver.

## Instalação e Execução

1. Instale as dependências do projeto:

    ```bash
    npm install
    ```

2. Build do Docker:

    ```bash
    docker build -t frontend-icasei .
    ```

3. Execução do Container:

    ```bash
    docker run -p 9000:9000 frontend-icasei
    ```

## Testes e Comandos Úteis:

1. Executar os testes unitários:

    ```bash
    npm test
    ```

2. Outros comandos úteis:

    ```bash
    npm run build  # Para construir o projeto
    npm start      # Para iniciar o servidor de desenvolvimento
    npm run dev    # Para iniciar o servidor em modo de desenvolvimento
    ```

## Estrutura do Projeto

