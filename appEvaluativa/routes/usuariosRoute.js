import { Router } from "express";
import {
  getUsuarios,
  getUsuario,
  postUsuario,
  putUsuario,
  patchEstadoUsuario,
  deleteUsuario
} from '../controllers/usuariosController.js';

import { validarCreacionUsuario, validarActualizacionUsuario } from '../validators/usuariosValidator.js';


const router = Router();

router.get('/', getUsuarios);
router.get('/:id', getUsuario);
router.post('/', validarCreacionUsuario, postUsuario);
router.put('/:id', validarActualizacionUsuario, putUsuario);
router.patch('/:id', patchEstadoUsuario);
router.delete('/:id', deleteUsuario);

export default router;

