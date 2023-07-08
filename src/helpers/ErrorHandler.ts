
import express from 'express';

export class ErrorHandler extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

export const handleError = (req: express.Request, res: express.Response, err: ErrorHandler): void => {
  const { statusCode, message } = err;
  const timestamp = new Date().toISOString();
  const url = req.originalUrl;
  res.status(statusCode).json({
    status: statusCode,
    timestamp,
    url,
    message,
  });
};
