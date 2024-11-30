import express from 'express';
import { createAlumno, getAlumnos, deleteAlumno, getAlumnosById, uploadProfilePicture, updateAlumno, loginAlumno, unsuportedMethod, verifySession, logoutAlumno } from '../controllers/alumno.controller.js';
import { alumnoDataValidatebyBody,alumnoDataValidatebyParams } from '../validators/alumno.validator.js';

const router = express.Router();

router.get('/alumnos', getAlumnos);

router.get('/alumnos/:id', alumnoDataValidatebyParams, getAlumnosById);

router.post('/alumnos/:id/fotoPerfil', alumnoDataValidatebyParams, uploadProfilePicture);

router.post('/alumnos/:id/session/login', alumnoDataValidatebyParams, loginAlumno);

router.post('/alumnos/:id/session/logout', alumnoDataValidatebyParams, logoutAlumno);

router.post('/alumnos/:id/session/verify', alumnoDataValidatebyParams, verifySession);

router.post('/alumnos', alumnoDataValidatebyBody,createAlumno);

router.put('/alumnos/:id', alumnoDataValidatebyBody,alumnoDataValidatebyParams, updateAlumno);

router.delete('/alumnos/:id', alumnoDataValidatebyParams, deleteAlumno);

router.all('/alumnos', unsuportedMethod);

export default router;