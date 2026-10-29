import { productiveStagesService } from '../services/productiveStages.service.js';
import { successResponse, errorResponse } from '../utils/response.util.js';

/**
 * Apprentice registers their productive stage
 */
const registerEP = async (req, res) => {
  try {
    const ep = await productiveStagesService.registerProductiveStage(
      req.user.id,
      req.body,
      req.ip
    );
    return successResponse(res, 201, 'Productive stage registered successfully', ep);
  } catch (error) {
    return errorResponse(res, error.status || 500, error.message);
  }
};

/**
 * Admin approves an EP
 */
const approveEP = async (req, res) => {
  try {
    const ep = await productiveStagesService.approveProductiveStage(
      req.params.id,
      req.user.id,
      req.body,
      req.ip
    );
    return successResponse(res, 200, 'Productive stage approved successfully', ep);
  } catch (error) {
    return errorResponse(res, error.status || 500, error.message);
  }
};

/**
 * Admin assigns instructors to an EP
 */
const assignInstructors = async (req, res) => {
  try {
    const ep = await productiveStagesService.assignInstructors(
      req.params.id,
      req.user.id,
      req.body,
      req.ip
    );
    return successResponse(res, 200, 'Instructors assigned successfully', ep);
  } catch (error) {
    return errorResponse(res, error.status || 500, error.message);
  }
};

/**
 * Get all EPs (Admin/Instructor)
 */
const getAllEPs = async (req, res) => {
  try {
    const eps = await productiveStagesService.getAllProductiveStages(req.query, req.user);
    return successResponse(res, 200, 'Productive stages retrieved successfully', eps);
  } catch (error) {
    return errorResponse(res, error.status || 500, error.message);
  }
};

/**
 * Get apprentice's own EPs
 */
const getMyEPs = async (req, res) => {
  try {
    const eps = await productiveStagesService.getMyApprenticeStages(req.user.id);
    return successResponse(res, 200, 'Your productive stages retrieved successfully', eps);
  } catch (error) {
    return errorResponse(res, error.status || 500, error.message);
  }
};

/**
 * Admin rejects an EP
 */
const rejectEP = async (req, res) => {
  try {
    const ep = await productiveStagesService.rejectProductiveStage(
      req.params.id,
      req.user.id,
      req.body,
      req.ip
    );
    return successResponse(res, 200, 'Productive stage rejected successfully', ep);
  } catch (error) {
    return errorResponse(res, error.status || 500, error.message);
  }
};

/**
 * Admin marks EP as COMPLETED
 */
const completeEP = async (req, res) => {
  try {
    const ep = await productiveStagesService.completeProductiveStage(
      req.params.id,
      req.user.id,
      req.ip
    );
    return successResponse(res, 200, 'Productive stage marked as COMPLETED', ep);
  } catch (error) {
    return errorResponse(res, error.status || 500, error.message, error.errors);
  }
};

/**
 * Admin archives a COMPLETED EP
 */
const archiveEP = async (req, res) => {
  try {
    const ep = await productiveStagesService.archiveProductiveStage(
      req.params.id,
      req.user.id,
      req.ip
    );
    return successResponse(res, 200, 'Productive stage archived', ep);
  } catch (error) {
    return errorResponse(res, error.status || 500, error.message);
  }
};

/**
 * Add a comment to the EP thread
 */
const addComment = async (req, res) => {
  try {
    const ep = await productiveStagesService.addComment(
      req.params.id,
      req.user.id,
      req.body,
      req.ip
    );
    return successResponse(res, 201, 'Comment added successfully', ep);
  } catch (error) {
    return errorResponse(res, error.status || 500, error.message);
  }
};

/**
 * Check eligibility for an apprentice
 */
const getEligibility = async (req, res) => {
  try {
    const id = req.params.apprenticeId || req.query.apprenticeId;
    const eligibility = await productiveStagesService.getEligibility(id);
    return successResponse(res, 200, 'Eligibility retrieved successfully', eligibility);
  } catch (error) {
    return errorResponse(res, error.status || 500, error.message);
  }
};

export const productiveStagesController = {
  registerEP,
  approveEP,
  assignInstructors,
  rejectEP,
  completeEP,
  archiveEP,
  addComment,
  getEligibility,
  getAllEPs,
  getMyEPs
};
