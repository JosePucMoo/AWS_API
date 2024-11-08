import express from 'express';
import { createProfesor,getProfesor,getProfesorById,updateProfesor ,deleteProfesor, unsuportedMethod} from '../controllers/ProfesorController.js';
import { profesorDataValidatebyBody,profesorDataValidatebyParams } from '../validators/ProfesorValidator.js';

const router = express.Router();

router.get('/profesores', getProfesor);

router.get('/profesores/:id', profesorDataValidatebyParams,getProfesorById);

router.post('/profesores', profesorDataValidatebyBody,createProfesor);

router.put('/profesores/:id', profesorDataValidatebyBody,profesorDataValidatebyParams,updateProfesor);

router.delete('/profesores/:id', profesorDataValidatebyParams,deleteProfesor);

router.all('/profesores', unsuportedMethod);


export default router;