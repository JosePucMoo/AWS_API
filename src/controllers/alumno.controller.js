import Alumno from '../models/alumno.model.js';
import { uploadFile } from '../lib/s3.js'
import { saveSession, getSessionBySessionString, updateActiveStatusBySessionString } from '../lib/dynamoDB.js';
import crypto, { randomUUID } from 'crypto';
import bcrypt from 'bcrypt';
import { sendEmailSNS } from '../lib/sns.js';

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

export const verifySession = async (req, res) => {
  try {
      const { id } = req.params;
      const { sessionString } = req.body;

      const alumno = await Alumno.findByPk(id);
    
      if (!alumno) {
        return res.status(404).json({ error: 'Alumno not found' });
      }

      // Busca la sesión en DynamoDB por el sessionString
    const sessionData = await getSessionBySessionString(sessionString);

    if(!sessionData) {
      return res.status(400).json({ error: 'Session invalid' });
    }

    const session = {
      active: sessionData.active.BOOL, // Convertir BOOL a booleano
      alumnoId: parseInt(sessionData.alumnoId.N), // Convertir N (string numérico) a entero
      sessionString: sessionData.sessionString.S, // Obtener S como cadena
      id: sessionData.id.S, // Obtener S como cadena (UUID)
      fecha: parseInt(sessionData.fecha.N) // Convertir N (string numérico) a entero
    };

    // Verifica si la sesión existe y si pertenece al alumno correcto
    if (!session || session.alumnoId != id) {
      return res.status(404).json({ error: 'Session not found or invalid for this user' });
    }

    // Verifica si la sesión está activa
    if (session.active) {
      return res.status(200).json({ message: 'Session is valid and active' });
    } else {
      return res.status(400).json({ error: 'Session is not active' });
    }

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const logoutAlumno = async (req, res) => {
  try {
      const { id } = req.params;
      const { sessionString } = req.body;

      const alumno = await Alumno.findByPk(id);
    
      if (!alumno) {
        return res.status(404).json({ error: 'Alumno not found' });
      }

      // Busca la sesión en DynamoDB por el sessionString
    const sessionData = await getSessionBySessionString(sessionString);

    if(!sessionData) {
      return res.status(400).json({ error: 'Session invalid' });
    }

    const session = {
      active: false, // Cambiar el activo de la session a False
      alumnoId: parseInt(sessionData.alumnoId.N),
      sessionString: sessionData.sessionString.S, 
      id: sessionData.id.S,
      fecha: parseInt(sessionData.fecha.N) 
    };

    // Verifica si la sesión existe y si pertenece al alumno correcto
    if (!session || session.alumnoId != id) {
      return res.status(404).json({ error: 'Session not found or invalid for this user' });
    }

    const result = await updateActiveStatusBySessionString(session);

    return res.status(200).json({ result: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const sendEmail = async (req, res) => {
        
  const { id } = req.params;
  const alumno = await Alumno.findByPk(id);

  if (!alumno) {
      return res.status(404).json({ error: 'Alumno not found' });
  }

  try {
      const data  = await sendEmailSNS(alumno);
      res.status(200).json({message: 'Email sent successfully'});
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
}

