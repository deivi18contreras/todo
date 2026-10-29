import { trackingsService } from '../services/trackings.service.js';
import { successResponse, errorResponse } from '../utils/response.util.js';

const createTracking = async (req, res) => {
  try {
    const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const tracking = await trackingsService.createTracking(req.user.id, req.body, ip);
    return successResponse(res, 201, 'Tracking scheduled successfully', tracking);
  } catch (error) {
    return errorResponse(res, error.status || 500, error.message || 'Error scheduling tracking');
  }
};

const requestExtraordinary = async (req, res) => {
  try {
    const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const tracking = await trackingsService.requestExtraordinary(req.user.id, req.body, ip);
    return successResponse(res, 201, 'Extraordinary tracking requested successfully', tracking);
  } catch (error) {
    return errorResponse(res, error.status || 500, error.message || 'Error requesting extraordinary tracking');
  }
};

const approveExtraordinary = async (req, res) => {
  try {
    const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const tracking = await trackingsService.approveExtraordinary(req.params.id, req.user.id, ip);
    return successResponse(res, 200, 'Extraordinary tracking approved', tracking);
  } catch (error) {
    return errorResponse(res, error.status || 500, error.message || 'Error approving extraordinary tracking');
  }
};

const uploadPdf = async (req, res) => {
  try {
    const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    if (!req.file) {
      return errorResponse(res, 400, 'PDF file is required');
    }
    const tracking = await trackingsService.uploadPdf(req.params.id, req.user.id, req.file, ip);
    return successResponse(res, 200, 'Tracking PDF uploaded successfully', tracking);
  } catch (error) {
    return errorResponse(res, error.status || 500, error.message || 'Error uploading tracking PDF');
  }
};

const validateSignature = async (req, res) => {
  try {
    const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const tracking = await trackingsService.validateSignature(req.params.id, req.user.id, req.body, ip);
    return successResponse(res, 200, 'Signatures validated', tracking);
  } catch (error) {
    return errorResponse(res, error.status || 500, error.message || 'Error validating signatures');
  }
};

const executeTracking = async (req, res) => {
  try {
    const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const tracking = await trackingsService.executeTracking(req.params.id, req.user.id, ip);
    return successResponse(res, 200, 'Tracking executed successfully', tracking);
  } catch (error) {
    return errorResponse(res, error.status || 500, error.message || 'Error executing tracking');
  }
};

const markPaid = async (req, res) => {
  try {
    const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const tracking = await trackingsService.markPaid(req.params.id, req.user.id, ip);
    return successResponse(res, 200, 'Tracking marked as paid', tracking);
  } catch (error) {
    return errorResponse(res, error.status || 500, error.message || 'Error marking tracking as paid');
  }
};

const getTrackings = async (req, res) => {
  try {
    const result = await trackingsService.getTrackings(req.query, req.user);
    return successResponse(res, 200, 'Trackings retrieved successfully', result);
  } catch (error) {
    return errorResponse(res, error.status || 500, error.message || 'Error retrieving trackings');
  }
};

const getTrackingById = async (req, res) => {
  try {
    const tracking = await trackingsService.getTrackingById(req.params.id, req.user);
    return successResponse(res, 200, 'Tracking retrieved successfully', tracking);
  } catch (error) {
    return errorResponse(res, error.status || 500, error.message || 'Error retrieving tracking');
  }
};

const getTrackingSummary = async (req, res) => {
  try {
    const summary = await trackingsService.getTrackingSummary(req.params.productiveStageId, req.user);
    return successResponse(res, 200, 'Tracking summary retrieved', summary);
  } catch (error) {
    return errorResponse(res, error.status || 500, error.message || 'Error retrieving tracking summary');
  }
};

const getTemplateUrl = async (req, res) => {
  try {
    const url = await trackingsService.getTemplateUrl();
    return successResponse(res, 200, 'Template URL retrieved', { url });
  } catch (error) {
    return errorResponse(res, error.status || 500, error.message || 'Error retrieving template URL');
  }
};

export const trackingsController = {
  createTracking,
  requestExtraordinary,
  approveExtraordinary,
  uploadPdf,
  validateSignature,
  executeTracking,
  markPaid,
  getTrackings,
  getTrackingById,
  getTrackingSummary,
  getTemplateUrl
};
