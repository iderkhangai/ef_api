import { Request, Response } from 'express';
import programsService from '../services/ProgramService';
import { ResponseHelper } from '../helpers/ResponseHelper';
import { ProgramStatus, ProgramMessages } from '../helpers/constants/ProgramConstants';
import { validationResult } from 'express-validator';
import Program from 'src/models/programs';

const getPrograms = (req: Request, res: Response) => {
  const { page, limit, sortBy, sortOrder } = req.query;
  // Parse the pagination and sorting parameters
  const pageNum = parseInt(page as string) || 1;
  const pageSize = parseInt(limit as string) || 10;
  const sortField = sortBy as keyof Program;
  const sortDirection = sortOrder === 'desc' ? -1 : 1;

  // Get the paginated and sorted programs
  const programs = programsService.getPrograms(pageNum, pageSize, sortField, sortDirection);

  const response = ResponseHelper(ProgramStatus.FOUND, ProgramMessages.FETCHED_SUCCESSFULLY, req.originalUrl);
  res.json({ ...response, body: programs });
};

const getProgramById = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const program = programsService.getProgramById(id);
  if (program) {
    res.json(program);
  } else {
    res.status(404).json({ message: `Program not found with ${id}` });
  }
};

const createProgram = (req: Request, res: Response) => {
  const newProgram = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const program = programsService.addProgram(newProgram);
  res.status(201).json(program);
};

const deleteProgram = (req: Request, res: Response) => {
  const programId = parseInt(req.params.id);
  const success = programsService.deleteProgram(programId);
  if (success) {
    const response = ResponseHelper(ProgramStatus.DELETED, ProgramMessages.DELETED_SUCCESSFULLY, req.originalUrl);
    res.json({ ...response });
  } else {
    res.status(404).json({ message: `Program not found with ${programId}` });
  }
};

const updateProgram = (req: Request, res: Response) => {
  const programId = parseInt(req.body.id);
  const updatePayload = req.body;
  // Update the program by ID using the service
  const updatedProgram = programsService.updateProgram(programId, updatePayload);
  if (updatedProgram) {
    const response = ResponseHelper(ProgramStatus.UPDATED, ProgramMessages.UPDATED_SUCCESSFULLY, req.originalUrl);
    res.json({ ...response });
  } else {
    res.status(404).json({ message: `Program not found with ${programId}` });
  }
};

export default {
  getPrograms,
  getProgramById,
  createProgram,
  deleteProgram,
  updateProgram,
};
