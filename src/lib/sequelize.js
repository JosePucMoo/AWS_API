import { Sequelize } from "sequelize";
import { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD, DB_PORT, DB_DIALECT } from "./config.js";

const database = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: DB_DIALECT,
  loggin: false
});

async function testingDB() {
    try {
        await database.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

const createDatabase = async () => {
  try {
    // Conéctate al clúster sin especificar una base de datos
    await database.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`);
    console.log("Base de datos creada exitosamente.");
    process.exit(0); // Finaliza el script
  } catch (error) {
    console.error("Error al crear la base de datos:", error);
    process.exit(1);
  }
};

//createDatabase();

testingDB();

export default database;