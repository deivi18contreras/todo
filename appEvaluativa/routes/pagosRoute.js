import { Router } from "express";
import {
    getPagos,
    getPago,
    postPago,
    getPagoEstado,
    putPago   
} from '../controllers/pagosController.js';

import { validarActualizarPago, validarCreacionPago } from '../validators/pagosValidator.js';


const router = Router();

router.get('/estado/:usuario_id', getPagoEstado);
router.get('/:usuario_id', getPago);
router.get('/', getPagos);
router.post('/', validarCreacionPago,  postPago);
router.put('/:id', validarActualizarPago,  putPago);

export default router;
