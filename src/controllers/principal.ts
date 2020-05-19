
  require('dotenv').config();
  import { Request, Response } from 'express';
  import { sign } from 'jsonwebtoken';


  // ruta principal de la app
  export const principal = (req:Request, res:Response) => {
    
    return res.status(200).json({ ok : true, message : 'HOLA MUNDO' });
  };


  // metodo para generar un token con base en lo que reciba
  const generateToken = (info : {} | string) => {
    return sign({ usuario : info }, String(process.env.SECRET_TOKEN), { expiresIn : '2h' });
  };
