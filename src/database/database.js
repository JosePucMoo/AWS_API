import { Sequelize } from "sequelize";

const database = new Sequelize("sicei-api", "admin", "Pumzxc_2552", {
  host: "sicei-cluster-instance-1.cx6gu0k2uzas.us-east-1.rds.amazonaws.com",
  port: 3306,
  dialect: "mysql",
  logging: false,
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
    await database.query("CREATE DATABASE IF NOT EXISTS `sicei-api`;");
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