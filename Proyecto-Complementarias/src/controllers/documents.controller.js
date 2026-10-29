import { documentsService } from '../services/documents.service.js';
import { successResponse, errorResponse } from '../utils/response.util.js';

export const submitDocument = async (req, res) => {
  try {
    const file = req.file;
    if (!file || file.mimetype !== 'application/pdf') {
      return errorResponse(res, 400, 'A generic PDF file is required');
    }
    const ip = req.ip || req.headers['x-forwarded-for'];
    const result = await documentsService.submitDocument(req.user.id, req.body, file, ip);
    return successResponse(res, 201, 'Document submitted successfully', result);
  } catch (err) {
    return errorResponse(res, err.status || 500, err.message || 'Error submitting document');
  }
};

export const getDocuments = async (req, res) => {
  try {
    const result = await documentsService.getDocuments(req.user.id, req.user.role, req.query);
    return successResponse(res, 200, 'Documents retrieved', result);
  } catch (err) {
    return errorResponse(res, err.status || 500, err.message || 'Error getting documents');
  }
};

export const getDocumentById = async (req, res) => {
  try {
    const result = await documentsService.getDocumentById(req.params.id, req.user.id, req.user.role);
    return successResponse(res, 200, 'Document retrieved', result);
  } catch (err) {
    return errorResponse(res, err.status || 500, err.message || 'Error retrieving document');
  }
};

export const approveDocument = async (req, res) => {
  try {
    const ip = req.ip || req.headers['x-forwarded-for'];
    const result = await documentsService.approveDocument(req.params.id, req.user.id, ip);
    return successResponse(res, 200, 'Document approved', result);
  } catch (err) {
    return errorResponse(res, err.status || 500, err.message || 'Error approving document');
  }
};

export const rejectDocument = async (req, res) => {
  try {
    const ip = req.ip || req.headers['x-forwarded-for'];
    const result = await documentsService.rejectDocument(req.params.id, req.body.comment, req.user.id, ip);
    return successResponse(res, 200, 'Document rejected', result);
  } catch (err) {
    return errorResponse(res, err.status || 500, err.message || 'Error rejecting document');
  }
};

export const resubmitDocument = async (req, res) => {
  try {
    const file = req.file;
    if (!file || file.mimetype !== 'application/pdf') {
      return errorResponse(res, 400, 'A generic PDF file is required');
    }
    const ip = req.ip || req.headers['x-forwarded-for'];
    const result = await documentsService.resubmitDocument(req.params.id, req.user.id, file, ip);
    return successResponse(res, 200, 'Document resubmitted successfully', result);
  } catch (err) {
    return errorResponse(res, err.status || 500, err.message || 'Error resubmitting document');
  }
};

export const requestDeletion = async (req, res) => {
  try {
    const ip = req.ip || req.headers['x-forwarded-for'];
    const result = await documentsService.requestDeletion(req.params.id, req.body.reason, req.user.id, ip);
    return successResponse(res, 200, 'Deletion requested', result);
  } catch (err) {
    return errorResponse(res, err.status || 500, err.message || 'Error requesting deletion');
  }
};

export const deleteDocument = async (req, res) => {
  try {
    const ip = req.ip || req.headers['x-forwarded-for'];
    const result = await documentsService.deleteDocument(req.params.id, req.user.id, ip);
    return successResponse(res, 200, 'Document deleted', result);
  } catch (err) {
    return errorResponse(res, err.status || 500, err.message || 'Error deleting document');
  }
};

export const getEpStatus = async (req, res) => {
  try {
    const result = await documentsService.getEpStatus(req.params.productiveStageId, req.user.id, req.user.role);
    return successResponse(res, 200, 'EP certification status retrieved', result);
  } catch (err) {
    return errorResponse(res, err.status || 500, err.message || 'Error retrieving EP status');
  }
};

export const documentsController = {
  submitDocument,
  getDocuments,
  getDocumentById,
  approveDocument,
  rejectDocument,
  resubmitDocument,
  requestDeletion,
  deleteDocument,
  getEpStatus
};
