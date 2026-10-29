import { validationResult } from 'express-validator';

export const validarDatos = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {

     
        const mensajes = errors.array().map(err => ({
            campo: err.path,
            mensaje: err.msg
        }));

        return res.status(400).json({
            errors: mensajes
        });
    }

    next();
};
