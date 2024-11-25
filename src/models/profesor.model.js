import { DataTypes, Model } from 'sequelize';
import database from '../database/database.js';

class Profesor extends Model {}

Profesor.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,  
      autoIncrement: true,
    },
    numeroEmpleado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    nombres: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellidos: {
      type: DataTypes.STRING,
      allowNull: false,  
    },
    horasClase: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
  },
  {
    sequelize: database, 
    modelName: 'Profesor', 
    tableName: 'profesores', 
    timestamps: false, 
  }
);

export default Profesor;
