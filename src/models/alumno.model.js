import { DataTypes, Model } from 'sequelize';
import database from '../lib/sequelize.js';
import bcrypt from 'bcrypt';

class Alumno extends Model {}

Alumno.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombres: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellidos: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    matricula: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, 
    },
    promedio: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
        max: 10, 
      },
    },
    fotoPerfilUrl: {
        type: DataTypes.STRING(2083),
        allowNull: true, 
        validate: {
          isUrl: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
  },
  {
    sequelize: database,
    modelName: "Alumno",
    tableName: "alumnos", 
    timestamps: false
  }
);

Alumno.addHook('beforeCreate', async (alumno) => {
  alumno.password = await bcrypt.hash(alumno.password, 10);
});

Alumno.addHook('beforeUpdate', async (alumno) => {
  if (alumno.changed('password')) {
      alumno.password = await bcrypt.hash(alumno.password, 10);
  }
});

export default Alumno;
