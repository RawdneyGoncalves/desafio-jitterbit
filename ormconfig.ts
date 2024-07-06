import { DataSource } from "typeorm";
import Order from "./src/models/order";
import Item from "./src/models/item";
import User from "./src/models/user";
import dotenv from 'dotenv';

dotenv.config();

const portString = process.env.DB_PORT;
const port = portString ? parseInt(portString) : undefined;

const PostgresDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: port,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: [Order, Item, User],
  migrations: ["./src/migrations/*.ts"],
});

PostgresDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

export default PostgresDataSource;