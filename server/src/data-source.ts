import { DataSource } from "typeorm";

import * as dotenv from 'dotenv';
dotenv.config();

//https://orkhan.gitbook.io/typeorm/docs/data-source-options
const AppDataSource = new DataSource({
    // database: 'wcecjyob', // se for SQLite, então use bdaula.db
    type: "postgres", // se for SQLite, então use sqlite
    url: process.env.DB_URL, // não use esta propriedade se for sqlite
    // port: 5432, // não use esta propriedade se for sqlite
    // username: 'wcecjyob', // não use esta propriedade se for sqlite
    // password:'A7t8z0ONiEDRVj34L0Sxf6IPApjugjWG', // não use esta propriedade se for sqlite
    // true indica que o schema do BD será criado a cada vez que a aplicação inicializar
    // deixe false ao usar migrations
    synchronize: false, 
    logging: false, // true indica que as consultas e erros serão exibidas no terminal
    entities: ["src/entities/*.ts"], // entidades que serão convertidas em tabelas
    migrations: ["src/migrations/*.ts"], // local onde estarão os arquivos de migração
    subscribers: [],
    maxQueryExecutionTime: 2000 // 2 seg.
});

// https://orkhan.gitbook.io/typeorm/docs/data-source
AppDataSource
    .initialize()
    .then(() => {
        console.log("Data Source inicializado!")
    })
    .catch((e) => {
        console.error("Erro na inicialização do Data Source:", e)
    });

export default AppDataSource;