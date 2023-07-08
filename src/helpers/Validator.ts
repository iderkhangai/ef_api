import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

// Validation schema for the createProgram route
const createProgramSchema = Joi.object({
    // id: Joi.number().required().label('ID'),
    title: Joi.string().required().label('Title'),
    topic: Joi.string().required().label('Topic'),
    learningFormats: Joi.array()
        .items(Joi.string())
        .min(1)
        .required()
        .label('Learning Formats'),
    startDate: Joi.string().isoDate().empty('').label('Start Date'),
    bestseller: Joi.boolean().required().label('Bestseller'),
});

// Validation schema for the updateProgram route
const updateProgramSchema = Joi.object({
    id: Joi.number().required().label('ID'),
    title: Joi.string().optional().label('Title'),
    topic: Joi.string().optional().label('Topic'),
    learningFormats: Joi.array()
        .items(Joi.string())
        .min(1)
        .optional()
        .label('Learning Formats'),
    bestseller: Joi.boolean().optional().label('Bestseller'),
    startDate: Joi.string().isoDate().empty('').label('Start Date'),
}).min(2);


// Middleware function for validating the createProgram route
const validateCreateProgram = (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = createProgramSchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
    });

    if (error) {
        const validationErrors: { [key: string]: string } = {};
        error.details.forEach((detail) => {
            const { path, message } = detail;
            validationErrors[path[0]] = message;
        });

        return res.status(400).json({
            error: 'Validation Error',
            details: validationErrors,
        });
    }

    // Replace the request body with the stripped valid data
    req.body = value;

    next();
};

const validateUpdateProgram = (req: Request, res: Response, next: NextFunction) => {
    const { error } = updateProgramSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};


export { validateCreateProgram, validateUpdateProgram };
