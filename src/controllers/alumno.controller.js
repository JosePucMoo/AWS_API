import Alumno from "../models/alumno.model.js";

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

export const unsuportedMethod = (req, res) => {
    res.status(405).json({
        error: `Método ${req.method} no permitido en ${req.originalUrl}`
    });
};