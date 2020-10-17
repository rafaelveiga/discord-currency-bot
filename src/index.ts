import { Bot } from "./bot";
import dotenv from "dotenv";
import "reflect-metadata";
import { createConnection } from "typeorm";

const result = dotenv.config();

if (result.error) {
  throw result.error;
}

createConnection({
  type: "mysql",
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: 3306,
  entities: [__dirname + "/entities/*.js"],
  synchronize: true,
}).catch((error) => {
  throw error;
});

new Bot().start();
