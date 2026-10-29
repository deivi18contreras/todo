import companiesService from '../services/companies.service.js';
import { successResponse, errorResponse } from '../utils/response.util.js';

export const createCompany = async (req, res) => {
  try {
    const company = await companiesService.createCompany(req.body, req.user.id);
    return successResponse(res, 201, 'Empresa creada con éxito', company);
  } catch (error) {
    return errorResponse(res, 400, error.message);
  }
};

export const getCompanies = async (req, res) => {
  try {
    const data = await companiesService.getCompanies(req.query, req.user.role);
    return successResponse(res, 200, 'Empresas recuperadas', data);
  } catch (error) {
    return errorResponse(res, 500, 'Error al obtener empresas');
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const company = await companiesService.getCompanyById(req.params.id, req.user);
    return successResponse(res, 200, 'Empresa encontrada', company);
  } catch (error) {
    const status = error.message.includes('acceso') ? 403 : 404;
    return errorResponse(res, status, error.message);
  }
};

export const updateCompany = async (req, res) => {
  try {
    const company = await companiesService.updateCompany(req.params.id, req.body, req.user.id);
    return successResponse(res, 200, 'Empresa actualizada', company);
  } catch (error) {
    return errorResponse(res, 400, error.message);
  }
};

export const addContact = async (req, res) => {
  try {
    const company = await companiesService.addContact(req.params.id, req.body, req.user.id);
    return successResponse(res, 200, 'Contacto agregado', company);
  } catch (error) {
    return errorResponse(res, 400, error.message);
  }
};

export const updateContact = async (req, res) => {
  try {
    const company = await companiesService.updateContact(req.params.id, req.params.contactId, req.body, req.user.id);
    return successResponse(res, 200, 'Contacto actualizado', company);
  } catch (error) {
    return errorResponse(res, 400, error.message);
  }
};

export const deleteContact = async (req, res) => {
  try {
    const company = await companiesService.deleteContact(req.params.id, req.params.contactId, req.user.id);
    return successResponse(res, 200, 'Contacto eliminado', company);
  } catch (error) {
    return errorResponse(res, 400, error.message);
  }
};

export const deactivateCompany = async (req, res) => {
  try {
    const company = await companiesService.deactivateCompany(req.params.id, req.user.id);
    return successResponse(res, 200, 'Empresa desactivada', company);
  } catch (error) {
    const status = error.message.includes('activas') ? 409 : 400;
    return errorResponse(res, status, error.message);
  }
};

export const importCompanies = async (req, res) => {
  try {
    if (!req.file) return errorResponse(res, 400, 'No se ha subido ningún archivo');
    const source = req.query.source || 'FLAT_FILE';
    const result = await companiesService.importCompanies(req.file.buffer, source, req.user.id);
    return successResponse(res, 200, 'Importación finalizada', result);
  } catch (error) {
    return errorResponse(res, 400, error.message);
  }
};

export default {
    createCompany,
    getCompanies,
    getCompanyById,
    updateCompany,
    addContact,
    updateContact,
    deleteContact,
    deactivateCompany,
    importCompanies,
};
