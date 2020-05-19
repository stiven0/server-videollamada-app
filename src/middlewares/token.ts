
  require('dotenv').config();
  import { verify } from 'jsonwebtoken';
  import {Request, Response, NextFunction} from 'express';

  const verificarToken = (req:Request, res:Response, next:NextFunction) => {

    const token = req.header('Token');

    verify(String(token), process.env.SECRET_TOKEN || 'SEED-DESARROLLO', (error:any, decoded:any) => {
      if(error) return res.status(401).json({ message : 'Token invalido' });

      (req as any).usuario = decoded.usuario;
      next();
    });
  }

  export default verificarToken;
