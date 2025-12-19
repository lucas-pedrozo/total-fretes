import { z } from 'zod';

export const usuarioCreateSchema = z.object({
  senha: z
    .string()
    .min(8, 'A senha precisa ter pelo menos 8 caracteres')
    .regex(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
    .regex(/[^A-Za-z0-9]/, 'A senha deve conter pelo menos um caractere especial'),
  nome: z
    .string()
    .min(1, 'Nome é obrigatório'),
  email: z
    .string()
    .email('Email inválido'),
  cpf: z
    .string()
    .min(11, 'CPF deve ter 11 dígitos')
    .max(14, 'CPF inválido'),
  cnpj: z
    .string()
    .min(14, 'CNPJ deve ter 14 dígitos')
    .max(18, 'CNPJ inválido')
    .optional()
    .or(z.literal('').transform(() => undefined)),
  cnh: z
    .string()
    .min(1, 'CNH é obrigatória'),
  datanascimento: z
    .coerce.date({ message: 'Data de nascimento inválida' }),
  imagemUsuario_id: z
    .number()
    .int()
    .positive()
    .optional(),
  acesso: z
    .enum(['usuario', 'admin', 'empresa'])
    .optional(),
});

export const usuarioUpdateSchema = usuarioCreateSchema.partial();