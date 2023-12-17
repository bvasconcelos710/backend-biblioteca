import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY || ''

export const verificarToken = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(' ')[1]; // Captura o token do header 'Authorization'

    if (!token) {
        res.status(401).json({ message: 'Token não fornecido' });
        return;
    }

    jwt.verify(token, SECRET_KEY, (error, decoded) => {
        if (error) {
            res.status(401).json({ message: 'Token inválido' });
            return;
        }
        // Adiciona o ID do usuário decodificado ao objeto de requisição
        req.body.userId = (decoded as { userId: string }).userId;
        next();
    });
};
