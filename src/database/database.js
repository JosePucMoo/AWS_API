import { Sequelize } from "sequelize";

const database = new Sequelize('aws_api', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: '3306'
});

async function testingDB() {
    try {
        await database.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}
testingDB();

export default database;