import { NextFunction, Request, Response } from "express";

module.exports = function (app : any) {
    app.use('/api/v1/users', require("./userRoutes"));
  
  
    app.use((req: Request, res: Response, next: NextFunction) => {
      res.status(404).json({
        message: 'Invalid api endpoint',
      });
    });
  
  }