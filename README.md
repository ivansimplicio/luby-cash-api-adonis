# luby-cash-api-adonis
## step by step to run the project

1) To install all dependencies, run: `npm install`
2) Before running the project you will need to create two networks in Docker: `docker network create luby-cash` & `docker network create luby-cash-api`
3) And also set the environment variables in the `.env` file
4) To upload and run the MySQL application and database on Docker: `docker-compose up`
5) After running the previous command, it will also be necessary to run the migrations and seeders: `npm run startdb`
6) Finally, to have access to all the endpoints available in the API, just download the file located at `_data/workspace-luby-cash-api.json` and import it into Insomnia.
