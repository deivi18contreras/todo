import { hoursService } from '../services/hours.service.js';
import { successResponse, errorResponse } from '../utils/response.util.js';

const getInstructorRecords = async (req, res) => {
  try {
    const result = await hoursService.getInstructorRecords(req.params.instructorId, req.query, req.user);
    return successResponse(res, 200, 'Instructor hour records retrieved successfully', result);
  } catch (error) {
    return errorResponse(res, error.status || 500, error.message || 'Error retrieving records');
  }
};

const getMonthDetails = async (req, res) => {
  try {
    const { instructorId, year, month } = req.params;
    const result = await hoursService.getMonthDetails(instructorId, year, month, req.user);
    return successResponse(res, 200, 'Month details retrieved successfully', result);
  } catch (error) {
    return errorResponse(res, error.status || 500, error.message || 'Error retrieving month details');
  }
};

const adminMarkPaid = async (req, res) => {
  try {
    const { instructorId, year, month } = req.params;
    const { amount, confirm } = req.body;
    const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    const result = await hoursService.adminMarkPaid(instructorId, year, month, amount, confirm, req.user.id, ip);
    return successResponse(res, 200, 'Hours marked as paid successfully', result);
  } catch (error) {
    return errorResponse(res, error.status || 500, error.message || 'Error marking hours as paid');
  }
};

const carryOver = async (req, res) => {
  try {
    const { instructorId } = req.params;
    const { fromYear, fromMonth, toYear, toMonth } = req.body;
    const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    const result = await hoursService.carryOver(instructorId, fromYear, fromMonth, toYear, toMonth, req.user.id, ip);
    return successResponse(res, 200, 'Excess hours carried over successfully', result);
  } catch (error) {
    return errorResponse(res, error.status || 500, error.message || 'Error carrying over hours');
  }
};

const getSummary = async (req, res) => {
  try {
    const { year, month } = req.query;
    const result = await hoursService.getSummary(year, month);
    return successResponse(res, 200, 'Monthly summary retrieved successfully', result);
  } catch (error) {
    return errorResponse(res, error.status || 500, error.message || 'Error retrieving summary');
  }
};

const getReport = async (req, res) => {
  try {
    const { instructorId, year, month } = req.params;
    const result = await hoursService.getReport(instructorId, year, month, req.user);
    return successResponse(res, 200, 'Report URL retrieved successfully', result);
  } catch (error) {
    return errorResponse(res, error.status || 500, error.message || 'Error generating report');
  }
};

export const hoursController = {
  getInstructorRecords,
  getMonthDetails,
  adminMarkPaid,
  carryOver,
  getSummary,
  getReport
};
