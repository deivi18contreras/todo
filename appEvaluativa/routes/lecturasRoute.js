import { Router } from "express";
import{
    postLecturaPrincipal,
    postLectura,
    getLecturas,
    getLectura
} from '../controllers/lecturasController.js'


const router = Router();

router.post('/principal/:usuario_id', postLecturaPrincipal);
router.post('/diaria/:usuario_id', postLectura);
router.get('/usuario/:usuario_id', getLecturas);
router.get('/:id', getLectura)

export default router;