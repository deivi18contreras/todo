import { bitacorasService } from '../services/bitacoras.service.js';
import { successResponse, errorResponse } from '../utils/response.util.js';

/**
 * Apprentice submits a logbook
 */
const submitBitacora = async (req, res) => {
  try {
    const bitacora = await bitacorasService.submitBitacora(
      req.user.id,
      req.body,
      req.file,
      req.ip
    );
    return successResponse(res, 201, 'Logbook submitted successfully', bitacora);
  } catch (error) {
    return errorResponse(res, error.status || 500, error.message);
  }
};

/**
 * Instructor approves a logbook
 */
const approveBitacora = async (req, res) => {
  try {
    const bitacora = await bitacorasService.approveBitacora(
      req.params.id,
      req.user.id,
      req.ip
    );
    return successResponse(res, 200, 'Logbook approved successfully', bitacora);
  } catch (error) {
    return errorResponse(res, error.status || 500, error.message);
  }
};

/**
 * Instructor rejects a logbook
 */
const rejectBitacora = async (req, res) => {
  try {
    const { comment } = req.body;
    if (!comment || comment.length < 10) {
      return errorResponse(res, 400, 'A valid comment (min 10 chars) is required for rejection');
    }

    const bitacora = await bitacorasService.rejectBitacora(
      req.params.id,
      req.user.id,
      comment,
      req.ip
    );
    return successResponse(res, 200, 'Logbook rejected successfully', bitacora);
  } catch (error) {
    return errorResponse(res, error.status || 500, error.message);
  }
};

/**
 * Get logbooks with filters
 */
const getBitacoras = async (req, res) => {
  try {
    const bitacoras = await bitacorasService.getBitacoras(req.query, req.user);
    return successResponse(res, 200, 'Logbooks retrieved successfully', bitacoras);
  } catch (error) {
    return errorResponse(res, error.status || 500, error.message);
  }
};

/**
 * Apprentice re-submits a rejected logbook
 */
const resubmitBitacora = async (req, res) => {
  try {
    const bitacora = await bitacorasService.resubmitBitacora(
      req.params.id,
      req.user.id,
      req.file,
      req.ip
    );
    return successResponse(res, 200, 'Logbook re-submitted successfully', bitacora);
  } catch (error) {
    return errorResponse(res, error.status || 500, error.message);
  }
};

/**
 * Instructor creates an additional logbook request
 */
const createAdditionalBitacora = async (req, res) => {
  try {
    const bitacora = await bitacorasService.createAdditionalBitacora(
      req.user.id,
      req.body,
      req.ip
    );
    return successResponse(res, 201, 'Additional logbook requested successfully', bitacora);
  } catch (error) {
    return errorResponse(res, error.status || 500, error.message);
  }
};

/**
 * Get the official logbook template URL
 */
const getTemplateUrl = async (req, res) => {
  try {
    console.log('[DEBUG] getTemplateUrl controller hit');
    const url = await bitacorasService.getTemplateUrl();
    return successResponse(res, 200, 'Template URL retrieved', { url });
  } catch (error) {
    return errorResponse(res, error.status || 500, error.message);
  }
};

export const bitacorasController = {
  submitBitacora,
  approveBitacora,
  rejectBitacora,
  resubmitBitacora,
  createAdditionalBitacora,
  getTemplateUrl,
  getBitacoras
};
