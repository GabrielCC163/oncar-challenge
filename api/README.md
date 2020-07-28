Run
sudo mkdir -p /storage/docker/mysql-data

Start DB:
 yarn mysql

Execute the above only once:
Access docker container
 docker exec -it docker-oncar bash

Access mysql bash
 mysql -p
then type password

show databases;
run create database oncar;

Run migrations:
 npx knex migrate:latest
----------------

start API:
yarn dev