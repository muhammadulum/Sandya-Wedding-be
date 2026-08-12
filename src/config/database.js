import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  //"postgres",
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    port: process.env.DB_PORT,
    logging: false,
  },

  console.log(
    `✅ Database connected: ${process.env.DB_PASSWORD} @ ${process.env.DB_HOST}:${process.env.DB_PORT}`,
  ),
);

export default sequelize;
