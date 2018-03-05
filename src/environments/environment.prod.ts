import * as dotenv from 'dotenv';
dotenv.config();

export const environment = {
  production: true,
  sql       : {
    host    : process.env.SQL_HOST,
    port    : Number(process.env.SQL_PORT),
    username: process.env.SQL_USER,
    password: process.env.SQL_PASS,
    database: process.env.SQL_DATABASE,
    entities: ['dist/**/**.entity.js'],
  },
};
