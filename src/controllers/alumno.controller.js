import Alumno from '../models/alumno.model.js';
import { uploadFile } from '../database/s3.js'
import { saveSession } from '../database/dynamoDB.js';
import { DataTypes } from 'sequelize';
import crypto, { randomUUID } from 'crypto';
import bcrypt from 'bcrypt';

export const loginAlumno = async (req, res) => {
  try {
      const { id } = req.params;
      const { password } = req.body;

      const alumno = await Alumno.findByPk(id);
    
      if (!alumno) {
        return res.status(404).json({ error: 'Alumno not found' });
      }

      // Verifica la contraseña
      const isPasswordValid = await bcrypt.compare(password, alumno.password);
      if (!isPasswordValid) {
          return res.status(400).json({ error: 'Invalid password' });
      }

      const sessionData = {
        id: randomUUID(),
        fecha: Math.floor(Date.now() / 1000),
        alumnoId: parseInt(id),
        active: true,
        sessionString: crypto.randomBytes(64).toString('hex')
      }
      
      const result = await saveSession(sessionData);

      res.status(200).json({sessionString: sessionData.sessionString}); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createAlumno = async (req, res) => {
    try {
        await Alumno.sync();
        const { nombres, apellidos, matricula, promedio, password } = req.body;
    
        const alumno = await Alumno.create({
            nombres,
            apellidos,
            matricula,
            promedio,
            fotoPerfilUrl: null,
            password,
        });
  
        res.status(201).json(alumno); 
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

export const getAlumnos = async (req, res) => {
    try {
        await Alumno.sync();
        const alumnos = await Alumno.findAll(); 
        res.status(200).json(alumnos);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
};

export const getAlumnosById = async (req, res) => {
    try {
        const { id } = req.params;
        const alumno = await Alumno.findByPk(id);
    
        if (!alumno) {
          return res.status(404).json({ error: 'Alumno not found' });
        }
    
        res.status(200).json(alumno);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

export const deleteAlumno = async (req, res) => {
    try {
        const { id } = req.params;
    
        const alumno = await Alumno.findByPk(id);
    
        if (!alumno) {
          return res.status(404).json({ error: 'Alumno not found' });
        }

        await alumno.destroy();
        res.status(200).json({ message: 'Alumno deleted successfully' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
};

export const updateAlumno = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombres, apellidos, matricula, promedio, fotoPerfilUrl, password } = req.body;
    
        const alumno = await Alumno.findByPk(id); 
    
        if (!alumno) {
          return res.status(404).json({ error: 'Alumno not found' });
        }
    
        await alumno.update({ nombres, apellidos, matricula, promedio, fotoPerfilUrl, password });
    
        res.status(200).json(alumno);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }

};

export const uploadProfilePicture = async (req, res) => {
  try {
      const { id } = req.params;
      const alumno = await Alumno.findByPk(id);
  
      if (!alumno) {
        return res.status(404).json({ error: 'Alumno not found' });
      }
      
      const fileUrl = await uploadFile(id, req.files.foto);

      alumno.fotoPerfilUrl = fileUrl;
      await alumno.save();
  
      res.status(200).json({"fotoPerfilUrl": fileUrl});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

export const unsuportedMethod = (req, res) => {
    res.status(405).json({
        error: `Método ${req.method} no permitido en ${req.originalUrl}`
    });
};

async function comparePasswords(plainPassword, hashedPassword) {
  const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
  return isMatch; // Retorna true si coinciden, false si no.
}