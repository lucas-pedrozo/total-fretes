import multer from 'multer';
import path from 'path';
import fs from 'fs';
import type { Request, Response, NextFunction } from 'express';

const createUploadsDir = (dir: string): void => {
  if(!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
    console.log('Diretorio de imagens criado:', dir);
    
  }
};
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback): void => {
  if ( file.mimetype === 'image/jpeg' 
    || file.mimetype === 'image/png'
    || file.mimetype === 'image/jpg' 
    || file.mimetype === 'image/webp' 
  ) {
    cb(null, true);
  } else {
    cb(new Error('Somente tipos de imagem sao permitidas. (JPEG, PNG, JPG, WEBP)') as unknown as null, false);
  }
};

const MAX_FILE_SIZE = 5 * 1024 * 1024; 

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/';
    createUploadsDir(uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

export const uploadSingleImage = (fieldName: string) => multer({ 
  storage,
  fileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE,
    files: 1
  }
}).single(fieldName);

export const uploadMultipleImages = (fieldName: string, maxCount: number) => multer({ 
  storage,
  fileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE,
    files: maxCount
  }
}).array(fieldName, maxCount);

export const handleMulterError = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({ error: 'Arquivo excede o tamanho máximo permitido (5MB).' });
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({ error: 'Quantidade de arquivos excede o limite permitido.' });
    }
    return res.status(400).json({ error: err.message });
  } else if (err) {
    return res.status(400).json({ error: err.message || 'Erro no upload.' });
  }
  next();
};