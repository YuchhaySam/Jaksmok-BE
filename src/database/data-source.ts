import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { UserEntity } from "../entity/user.entity";
import { BookEntity } from "../entity/book.entity";

dotenv.config();

export const MysqlDataSource = new DataSource({
  type: "mysql",
  synchronize: false,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [UserEntity, BookEntity],
  logging: true,
  migrations: ["dist/migrations/*.js"],
});
