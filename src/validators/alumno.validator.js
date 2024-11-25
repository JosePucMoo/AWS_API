import { body, param, validationResult} from "express-validator";

export const alumnoDataValidatebyBody = [
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
    body("matricula")
        .exists({ checkFalsy: true })
        .withMessage("Matricula is required")
        .matches(/^A\d+$/)
        .withMessage("Matricula should start with 'A' followed by numbers"),
    body("promedio")
        .exists({checkFalsy: true})
        .withMessage("Promedio is required")
        .isFloat({ min: 0 })
        .withMessage("Promedio should be a positive number"),
    body("password")
        .exists({checkFalsy: true})
        .withMessage("Password is required")
        .isLength({min: 10, max: 10})
        .withMessage("Password must be exactly 10 characters long"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ error : errors.array().map((error) => error.msg) });
        next();
    },
];

export const alumnoDataValidatebyParams = [
    param("id")
        .exists({ checkFalsy: true })
        .isInt({ min: 0 })
        .withMessage("Id is required"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({ error : errors.array().map((error) => error.msg) });
        next();
    },
];