// import { Request, Response, NextFunction } from 'express';

// class AuthMiddleware {
//   public static authorize(req: Request, res: Response, next: NextFunction) {
//     // Check if the user is authenticated
//     if (!req.isAuthenticated()) {
//       // User is not authenticated, return a 401 Unauthorized response
//       return res.status(401).json({ message: 'Unauthorized' });
//     }

//     // Check if the user has the required role (marketing manager or administrator)
//     if (req.user.role === 'marketing_manager' || req.user.role === 'administrator') {
//       // User has the required role, proceed to the next middleware or route handler
//       return next();
//     }

//     // User does not have the required role, return a 403 Forbidden response
//     return res.status(403).json({ message: 'Forbidden' });
//   }
// }

// export default AuthMiddleware;
