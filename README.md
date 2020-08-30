# OnCar - Full Stack Node.js Challenge

### Requisitos para acesso local:
Node.js, Yarn, Live Server e Docker

### Siga os passos abaixo:

* #### Crie uma pasta para armazenamento do banco de dados:
  
    ```
    $ sudo mkdir -p /storage/docker/oncar/mysql-data
    ```

* #### Clone o projeto:
    ```
    $ git clone https://github.com/GabrielCC163/oncar-challenge.git
    ```
* #### Instale as dependências da API e inicialize o banco de dados (MySQL):
    ```
    $ cd oncar-challenge/api && yarn install

    $ mv .env_sample .env

    $ yarn mysql
    ```
* #### Crie a base de dados 'oncar' e execute a migration:
    ```
    $ docker exec -it docker-oncar bash

    $ mysql -p

    digite password (especificamente)

    $ create database oncar;

    encerre o acesso do mysql e do container (exit; + Enter)

    $ cd oncar-challenge/api && npx knex migrate:latest
    ```

* #### Inicialize a API:
    ```
    $ cd oncar-challenge/api && yarn start
    ```

* #### Acesse a aplicação web:
    ```
    $ cd oncar-challenge/frontend && live-server .
    ```

### Importe as requisições e as execute via Insomnia:

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=OnCar%20Challenge%20API&uri=https%3A%2F%2Fgist.githubusercontent.com%2FGabrielCC163%2Fc4c94fbef5fb0d3637fb3483345493f9%2Fraw%2F93fa1c0bb5a2a23cf1fc9bca47c212bfb0fe1752%2Foncar_requests.json)
