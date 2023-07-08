
import express from 'express';
import ProgramsController from '../controllers/ProgramsController';
import { validateCreateProgram, validateUpdateProgram } from '../helpers/Validator';
import { authorize } from '../middlewares/authMiddleware';
const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Program:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID of the program
 *         title:
 *           type: string
 *           description: Title of the program
 *         topic:
 *           type: string
 *           description: Topic of the program
 *         learningFormats:
 *           type: array
 *           items:
 *             type: string
 *           description: Learning formats available for the program
 *         bestseller:
 *           type: boolean
 *           description: Indicates if the program is a bestseller
 *         startDate:
 *           type: string
 *           description: Start date of the program
 */

/**
 * @swagger
 * /api/v1/programs:
 *   get:
 *     summary: Get all programs
 *     tags:
 *       - Programs
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Program'
 */
router.get('/', ProgramsController.getPrograms, authorize);

/**
 * @swagger
 * /api/v1/programs:
 *   post:
 *     summary: Create a program
 *     tags:
 *       - Programs
 *     requestBody:
 *       description: Program object to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Program'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Program'
 *       400:
 *         description: Bad request
 */
router.post('/', validateCreateProgram, ProgramsController.createProgram);
/**
 * @swagger
 * /api/v1/programs/{id}:
 *   get:
 *     summary: Get a program by ID
*     tags:
 *       - Programs
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the program
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Program'
 *       404:
 *         description: Program not found
 */
router.get('/:id', ProgramsController.getProgramById, authorize);
/**
 * @swagger
 * /api/v1/programs:
 *   patch:
 *     summary: Update a program
 *     tags:
 *       - Programs
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the program
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Updated program object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Program'
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Program'
 *       404:
 *         description: Program not found
 */
router.patch('/', validateUpdateProgram, ProgramsController.updateProgram, authorize);
/**
 * @swagger
 * /api/v1/programs/{id}:
 *   delete:
 *     summary: Delete a program by ID
 *     tags:
 *       - Programs
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the program
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Program not found
 */
router.delete('/:id', ProgramsController.deleteProgram, authorize)

export default router;
