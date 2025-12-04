import { z } from 'zod';
import { Request, Response } from 'express';
import sequelize from '../config/database';
import Usuario from '../models/usuario.model';
import Caminhoneiro from '../models/caminhoneiro.model';


export const createUsuario = async (req: Request, res: Response) => {
    const t = await sequelize.transaction();
    try {
        const usuario = await Usuario.create(req.body, { transaction: t });

        const caminhoneiro = await Caminhoneiro.create(
            { usuario_id: usuario.id_usuario },
            { transaction: t }
        );

        await t.commit();
        return res.status(201).json({ usuario, caminhoneiro });
    } catch (error) {
        await t.rollback();
        if (error instanceof z.ZodError) {
            console.log(error);
            return res.status(400).json({ errors: error.issues });
        }
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};


export const getAllUsuarios = async (req: Request, res: Response) => {
    try {
        const usuarios = await Usuario.findAll();
        return res.status(200).json(usuarios);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

export const getUsuarioById = async (req: Request, res: Response) => {
    try {
        const usuario = await Usuario.findOne({});

        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        return res.status(200).json(usuario);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

export const updateUsuario = async (req: Request, res: Response) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }
        await usuario.update(req.body);
        return res.status(200).json(usuario);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

export const deleteUsuario = async (req: Request, res: Response) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }
        await usuario.destroy();
        return res.status(204).send();
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

export const patchUsuario = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        await usuario.update(req.body);

        return res.status(200).json(usuario);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};


