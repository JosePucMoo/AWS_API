import Profesor from "../models/ProfesorModel.js";


let profesores = [];

export const createProfesor = (req, res) => {
    try {
        const { numeroEmpleado, nombres, apellidos, horasClase } = req.body;
        const profesor = new Profesor(numeroEmpleado, nombres, apellidos, horasClase);
        profesores.push(profesor);
        res.status(201).json(profesor);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getProfesor = (req, res) => {
    res.status(200).json(profesores);
};

export const getProfesorById = (req, res) => {
    const { id } = req.params;
    const profesor = profesores.find((profesor) => profesor.id === id);

    if (!profesor) {
        return res.status(404).json({ error: 'Profesor not found' });
    }

    res.status(200).json(profesor);
}

export const deleteProfesor = (req, res) => {
    const { id } = req.params;
    console.log(id);
    const profesor = profesores.find((profesor) => profesor.id === id);

    if (!profesor) {
        return res.status(404).json({ error: 'Profesor not found' });
    }

    profesores = profesores.filter((profesor) => profesor.id !== id);
    res.status(200).json({ message: 'Profesor deleted successfully' });
};

export const updateProfesor = (req, res) => {
    try {
        const { id } = req.params;
        
        const { numeroEmpleado, nombres, apellidos, horasClase } = req.body;

        const profesor = profesores.find((profesor) => profesor.id === id);

        if (!profesor) {
            return res.status(404).json({ error: 'Profesor not found' });
        }

        Object.assign(profesor, { numeroEmpleado, nombres, apellidos, horasClase });

        res.status(200).json(profesor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

};