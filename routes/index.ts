// import { NextFunction, Request, Response } from "express";

// module.exports = function (app : any) {
//     app.use('/api/v1/users', require("./userRoutes"));
  
  
//     app.use((req: Request, res: Response, next: NextFunction) => {
//       res.status(404).json({
//         message: 'Invalid api endpoint',
//       });
//     });
  
//   }


import express from 'express';
import userRoutes from './userRoutes';
import { Request, Response, NextFunction } from 'express';

const router = express.Router();

router.use('/users', userRoutes);

// Handle invalid routes
router.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    message: 'Invalid API endpoint',
  });
});

export default router;
