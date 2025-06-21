# Como clonar o repositório

1. Clone o repositório para sua máquina local:
    ```bash
    git clone https://github.com/Jasr4075/projetoweb.git
    ```
2. Acesse a pasta do projeto:
    ```bash
    cd seu-repositorio
    ```

# Como rodar o projeto

## Backend (`projetoweb-back`)

1. Instale as dependências:
    ```bash
    cd projetoweb-back
    npm install
    ```

2. Crie o banco de dados **leads_db** no PostgreSQL.

3. Execute as queries abaixo para criar as tabelas:
    ```sql
    CREATE TABLE leads (
         id SERIAL PRIMARY KEY,
         name VARCHAR(255) NOT NULL,
         email VARCHAR(255) UNIQUE NOT NULL,
         created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE users (
         id SERIAL PRIMARY KEY,
         username VARCHAR(255) UNIQUE NOT NULL,
         password VARCHAR(255) NOT NULL
    );
    ```

4. Crie um arquivo `.env` na raiz do backend com o seguinte conteúdo (ajuste conforme necessário):
    ```
    DB_USER=postgres
    DB_HOST=localhost
    DB_NAME=leads_db
    DB_PASSWORD=senha do postgres
    DB_PORT=5432
    PORT=3000

    JWT_SECRET=sua_chave_secreta_super_segura_aqui
    ADMIN_USERNAME=admin
    ADMIN_PASSWORD=admin123
    ```

5. Inicie o servidor backend:
    ```bash
    npm run dev
    ```

---

## Frontend (`projetoweb-front`)

1. Crie um arquivo `.env` na raiz do frontend com o conteúdo:
    ```
    REACT_APP_API_URL_ADMIN=http://localhost:3000/api
    ```

2. Instale as dependências e inicie o frontend:
    ```bash
    cd projetoweb-front
    npm install
    npm run dev
    ```



    > **Para fazer login, utilize:**  
    > **Usuário:** `admin`  
    > **Senha:** `admin123`