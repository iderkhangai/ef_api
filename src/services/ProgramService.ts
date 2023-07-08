import programsData from '../public/programs.json';
import Program from '../models/programs';
import { generateUniqueId } from '../utils/helper';

interface Pagination {
  totalPages: number;
  totalElements: number;
  pageSize: number;
  currentPage: number;
  sortBy: keyof Program;
  sortOrder: 'asc' | 'desc';
}
const programs: Program[] = programsData;

const getPrograms = (
  pageNum: number,
  pageSize: number,
  sortField: keyof Program,
  sortDirection: number
) => {
  // Apply sorting
  const sortedPrograms = programs.sort((a, b) => {
    if (a[sortField] < b[sortField]) {
      return -1 * sortDirection;
    } else if (a[sortField] > b[sortField]) {
      return 1 * sortDirection;
    }
    return 0;
  });

  // Apply pagination
  const startIndex = (pageNum - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedPrograms = sortedPrograms.slice(startIndex, endIndex);

  const totalElements = sortedPrograms.length;
  const totalPages = Math.ceil(totalElements / pageSize);
  const pagination: Pagination = {
    totalPages,
    totalElements,
    pageSize,
    currentPage: pageNum,
    sortBy: sortField,
    sortOrder: sortDirection === 1 ? 'asc' : 'desc',
  };

  return { rows: paginatedPrograms, pagination };
}

const addProgram = (newProgram: Program): Program => {
  const program: Program = {
    ...newProgram,
    id: generateUniqueId(), // Implement the generateUniqueId function in helpers.ts
  };
  programs.push(program);
  return program;
};

const getProgramById = (id: number): Program | undefined => {
  const program = programs.find((program) => program.id === id);
  return program;
};

const deleteProgram = (id: number): boolean => {
  const index = programs.findIndex((program) => program.id === id);
  if (index !== -1) {
    programs.splice(index, 1);
    return true;
  }
  return false;
};

const updateProgram = (programId: number, updates: Partial<Program>): Program | null => {
  // Find the program by ID
  const programIndex = programs.findIndex((program) => program.id === programId);
  // If the program is found
  if (programIndex !== -1) {
    // Update the program with the provided updates
    programs[programIndex] = {
      ...programs[programIndex],
      ...updates,
    };

    // Return the updated program
    return programs[programIndex];
  }
  // If the program is not found, return null
  return null;
};

export default {
  getPrograms,
  getProgramById,
  addProgram,
  deleteProgram,
  updateProgram,
};
