import dotenv from 'dotenv';
import jwt from "jsonwebtoken";
import Usuario from "../models/usuario.model";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET!
const JWT_EXPIRES_IN = "7d"

export const generateToken = (user: Usuario): string => {
  const payload = {
    id_usuario: (user as any).id_usuario,
    acesso: (user as any).acesso,
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

export const verifyToken = (token: string) : any => {
  return jwt.verify(token, JWT_SECRET);
};