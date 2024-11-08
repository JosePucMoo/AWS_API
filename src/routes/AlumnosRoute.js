import express from 'express';
import { createAlumno, getAlumnos, deleteAlumno, getAlumnosById, updateAlumno } from '../controllers/AlumnoController.js';
import { alumnoDataValidatebyBody,alumnoDataValidatebyParams } from '../validators/AlumnoValidator.js';

const router = express.Router();

router.get('/alumnos', getAlumnos);

router.get('/alumnos/:id', alumnoDataValidatebyParams,getAlumnosById);

router.post('/alumnos', alumnoDataValidatebyBody,createAlumno);

router.put('/alumnos/:id', alumnoDataValidatebyBody,alumnoDataValidatebyParams,updateAlumno);

router.delete('/alumnos/:id', alumnoDataValidatebyParams,deleteAlumno);

export default router;