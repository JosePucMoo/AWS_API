import Profesor from "../models/profesor.model.js";

export const createProfesor = async (req, res) => {
  try {
    await Profesor.sync();
    const { numeroEmpleado, nombres, apellidos, horasClase } = req.body;

    const profesor = await Profesor.create({
      numeroEmpleado,
      nombres,
      apellidos,
      horasClase,
    });

    res.status(201).json(profesor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProfesor = async (req, res) => {
  try {
    const profesores = await Profesor.findAll();
    res.status(200).json(profesores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProfesorById = async (req, res) => {
  const { id } = req.params;

  try {
    const profesor = await Profesor.findByPk(id); 

    if (!profesor) {
      return res.status(404).json({ error: 'Profesor not found' });
    }

    res.status(200).json(profesor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProfesor = async (req, res) => {
  const { id } = req.params;

  try {
    const profesor = await Profesor.findByPk(id);

    if (!profesor) {
      return res.status(404).json({ error: 'Profesor not found' });
    }

    await profesor.destroy(); 
    res.status(200).json({ message: 'Profesor deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProfesor = async (req, res) => {
  const { id } = req.params;
  const { numeroEmpleado, nombres, apellidos, horasClase } = req.body;

  try {
    const profesor = await Profesor.findByPk(id);

    if (!profesor) {
      return res.status(404).json({ error: 'Profesor not found' });
    }

    await profesor.update({ numeroEmpleado, nombres, apellidos, horasClase });

    res.status(200).json(profesor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const unsuportedMethod = (req, res) => {
  res.status(405).json({
    error: `Método ${req.method} no permitido en ${req.originalUrl}`,
  });
};
