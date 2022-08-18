import { NextFunction, Request, Response } from 'express';
import JWT from '../utils/jwtUtils/JWT';

const validator = new JWT();

const validateToken = (request: Request, response: Response, next: NextFunction) => {
  const token = request.headers.authorization as string;
  const payload = validator.verify(token);
  request.body.user = payload;
  next();
};

export default validateToken;
