import { Request, Response, NextFunction } from 'express';
declare module 'express' {
  interface Request {
    user?: {
      role: string;
      // Add other properties as needed
    };
  }
}

export const authorize = (req: Request, res: Response, next: NextFunction) => {
  // Perform authentication and authorization logic here
  // Check if the user is authenticated and has the necessary role/permissions

  // Example: Check if the user role is "marketing manager" or "administrator"
  const userRole = req.user?.role;
  if (userRole === 'marketing manager' || userRole === 'administrator') {
    // User is authorized, proceed to the next middleware or route handler
    next();
  } else {
    // User is not authorized, send a 403 Forbidden response
    res.status(403).json({ message: 'Access denied' });
  }
};
