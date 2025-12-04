import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jtw";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        acesso: 'usuario' | 'empresa' | 'admin';
      };
    }
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization?.trim();
  if (!authHeader) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token mal formatado" });
  }

  try {
    const decoded = verifyToken(token) as {
      id_usuario?: number;
      acesso?: 'usuario' | 'empresa' | 'admin';
      [key: string]: any;
    };

    if (!decoded.id_usuario || !decoded.acesso) {
      return res.status(403).json({ message: "Acesso negado. Usuário não autenticado." });
    }

    req.user = {
      id: decoded.id_usuario,
      acesso: decoded.acesso,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Token inválido",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

type Role = 'usuario' | 'empresa' | 'admin';

export const authorizeRoles = (...allowedRoles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "Não autenticado" });
    }

    const { acesso } = req.user;

    // admin sempre pode tudo (se você quiser essa regra)
    if (acesso === 'admin') {
      return next();
    }

    if (!allowedRoles.includes(acesso)) {
      return res.status(403).json({ message: "Acesso negado. Permissão insuficiente." });
    }

    next();
  };
};

export const allowOwnerOrRoles = (...allowedRoles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "Não autenticado" });
    }

    const { id, acesso } = req.user;
    const paramId = Number(req.params.id);

    // se for admin ou empresa (ou outros papéis permitidos), passa
    if (allowedRoles.includes(acesso) || acesso === 'admin') {
      return next();
    }

    // se for usuario comum, só pode mexer no próprio id
    if (acesso === 'usuario' && id === paramId) {
      return next();
    }

    return res.status(403).json({ message: "Acesso negado ao recurso solicitado." });
  };
};