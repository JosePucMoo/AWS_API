import { body, param, validationResult } from "express-validator";

export const profesorDataValidatebyBody = [
    body("nombres")
        .exists({ checkFalsy: true })
        .withMessage("Nombre is required")
        .isString()
        .withMessage("Nombre should be string"),
    body("apellidos")
        .exists({ checkFalsy: true })
        .withMessage("Apellidos is required")
        .isString()
        .withMessage("Apellidos should be string"),
    body("horasClase")
        .exists({ checkFalsy: true })
        .withMessage("Horas de clase is required")
        .isInt({ min: 0})
        .withMessage("Horas de clase should be a positive number"),
    body("numeroEmpleado")
        .exists({ checkFalsy: true })
        .withMessage("Numero de empleado is required")
        .isInt({ min: 0})
        .withMessage("Numero de empleado should be a string"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())

            return res.status(400).json({ error: errors.array().map((error) => error.msg) });
        next();
    },
];

export const profesorDataValidatebyParams = [
    param("id")
        .exists({ checkFalsy: true })
        .isInt({ min: 0 })
        .withMessage("Id is required"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({ error: errors.array().map((error) => error.msg) });
        next();
    },
];