import {body} from 'express-validator';
import {validarDatos} from './validateResults.js' ;
import pool from '../config/mysql.js';

export const validarCreacionUsuario = [
    body('nombre')
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({min:3}).withMessage('El nombre debe tener al menos 3 caracteres: por ejemplo Ana'),

    body('email')
    .notEmpty().withMessage('El email es obligatorio')
    .isEmail().withMessage('Debe ser un email válido')
      .custom(async (value) => {
        const [rows] = await pool.query ('SELECT id FROM usuarios WHERE email = ?',
            
            [value]
        );
        if(rows.length > 0){
            throw new Error('El email ya está registrado por otro usuario')
        }
    }),


    body('fecha_nacimiento')
    .notEmpty().withMessage('La fecha de nacimiento es obligatoria')
    .isDate().withMessage('le fecha debe contener año, mes, día'),
  

    validarDatos,
];



export const validarActualizacionUsuario = [
    body('nombre')
        .optional()
        .isLength({ min: 3 })
        .withMessage('El nombre debe tener al menos 3 caracteres, por ejemplo: Ana'),

    body('email')
        .optional()
        .isEmail().withMessage('Debe ser un email válido')
        .custom(async (value, { req }) => {
            const id = req.params.id; 

            const [rows] = await pool.query(
                'SELECT id FROM usuarios WHERE email = ? AND id != ?',
                [value, id]
            );

            if (rows.length > 0) {
                throw new Error('El email ya está registrado por otro usuario');
            }

            return true;
        }),

    body('fecha_nacimiento')
        .optional()
        .isDate().withMessage('La fecha debe contener año, mes y día'),

   validarDatos,
];
