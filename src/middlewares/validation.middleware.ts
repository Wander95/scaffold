import { NextFunction,Request,Response } from "express";
import { Schema } from 'joi'

abstract class ValidationMiddleware {
  constructor(){}

  validateBody = (_schema:Schema) => (req:Request,res:Response,next:NextFunction) => {
    
    const result = _schema.validate(req.body);
    if(!result.error) {
      next()
    }else{
      const message = result.error?.details.map(_detail => _detail.message).join(',');
      return res.status(422).json({
        path: req.originalUrl,
        code: 422,
        status: 'fail',
        data:[],
        message: message,
        error: true
      })
    }
  }

  validateParams(req:Request,res:Response,next:NextFunction){
    const { params,originalUrl } = req;

    for (const paramKey in params) {
      const isIntCheck = Number(params[paramKey]);

      if(isNaN(isIntCheck)) return res.status(400).json({
        path: originalUrl,
        status: 'fail',
        code: 400,
        data:[],
        error: true,
        message: `Parameter ${paramKey}  must be a number`,
      });
    }

    next()
  }
}

export default ValidationMiddleware