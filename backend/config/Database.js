import { Sequelize } from "sequelize";

const db = new Sequelize(
  "auth_db", // Database name
  "root", // Username
  "admin", // Password 
  {
    host: "localhost", // Host where your database is running
    dialect: "mysql", // Type of database (MySQL in this case)
  }
);

export default db;
