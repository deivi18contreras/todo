import usersService from '../services/users.service.js';
import { successResponse, errorResponse } from '../utils/response.util.js';

/**
 * Crear instructor individualmente
 */
export const createInstructor = async (req, res) => {
  try {
    const instructor = await usersService.createInstructor(req.body, req.user.id);
    return successResponse(res, 201, 'Instructor creado con éxito', instructor);
  } catch (error) {
    return errorResponse(res, 400, error.message);
  }
};

/**
 * Listar instructores con filtros
 */
export const getInstructors = async (req, res) => {
  try {
    const data = await usersService.getInstructors(req.query);
    return successResponse(res, 200, 'Instructores recuperados', data);
  } catch (error) {
    return errorResponse(res, 500, 'Error al obtener instructores');
  }
};

/**
 * Cambiar estado de instructor
 */
export const changeInstructorStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, reason } = req.body;
    const result = await usersService.changeInstructorStatus(id, { status, reason }, req.user.id);
    return successResponse(res, 200, 'Estado actualizado', result);
  } catch (error) {
    const status = error.message === 'Instructor no encontrado' ? 404 : 400;
    return errorResponse(res, status, error.message);
  }
};

/**
 * Reasignar aprendices
 */
export const reassignApprentices = async (req, res) => {
  try {
    const result = await usersService.reassignApprentices(req.body, req.user.id);
    return successResponse(res, 200, 'Reasignación completada', result);
  } catch (error) {
    return errorResponse(res, 400, error.message);
  }
};

/**
 * Crear aprendiz
 */
export const createApprentice = async (req, res) => {
  try {
    const apprentice = await usersService.createApprentice(req.body, req.user.id);
    return successResponse(res, 201, 'Aprendiz creado con éxito', apprentice);
  } catch (error) {
    return errorResponse(res, 400, error.message);
  }
};

/**
 * Importación masiva de aprendices
 */
export const importApprentices = async (req, res) => {
  try {
    if (!req.file) return errorResponse(res, 400, 'No se ha subido ningún archivo');
    const result = await usersService.importApprentices(req.file.buffer, req.user.id);
    return successResponse(res, 200, 'Proceso de importación finalizado', result);
  } catch (error) {
    return errorResponse(res, 400, error.message);
  }
};

/**
 * Listar aprendices con filtros
 */
export const getApprentices = async (req, res) => {
  try {
    const data = await usersService.getApprentices(req.query);
    return successResponse(res, 200, 'Aprendices recuperados', data);
  } catch (error) {
    return errorResponse(res, 500, 'Error al obtener aprendices');
  }
};

/**
 * Obtener detalle de usuario por ID (Instructor o Aprendiz)
 */
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    // Lógica de visibilidad del spec: ADMIN puede todo, aprendiz solo el mismo
    if (req.user.role === 'APPRENTICE' && req.user.id !== id) {
      return errorResponse(res, 403, 'No tienes permiso para ver este perfil');
    }

    const user = await usersService.getUserById(id);
    return successResponse(res, 200, 'Usuario encontrado', user);
  } catch (error) {
    return errorResponse(res, 404, error.message);
  }
};

/**
 * Actualizar aprendiz
 */
export const updateApprentice = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await usersService.updateApprentice(id, req.body, req.user);
    return successResponse(res, 200, 'Aprendiz actualizado', user);
  } catch (error) {
    const status = error.message.includes('encontrado') ? 404 : 403;
    return errorResponse(res, status, error.message);
  }
};

/**
 * Historial de acciones de un aprendiz
 */
export const getApprenticeHistory = async (req, res) => {
  try {
    const { id } = req.params;
    // TODO: Implementar consulta a AuditLog filtrada por entityId
    return successResponse(res, 200, 'Historial recuperado', []);
  } catch (error) {
    return errorResponse(res, 500, 'Error al obtener historial');
  }
};

export default {
  createInstructor,
  getInstructors,
  changeInstructorStatus,
  reassignApprentices,
  createApprentice,
  importApprentices,
  getApprentices,
  getUserById,
  updateApprentice,
  getApprenticeHistory,
};
