import * as z from 'zod'
import { SocialStatus } from '../database/schema.ts';

const UserSchema = z.object({
    name: z
        .string('el nombre es requerido')
        .max(100)
        .min(3),
    password: z
        .string('La contraseña es requerida')
        .max(15, 'La contraseña debe de tener máximo 15 caracteres')
        .min(8,'La contraseña debe de tener mínimo 8 caracteres'),
    email: z.email('El correo debe de tener un formato válido')
})

export type UserSchema = z.infer<typeof UserSchema>;
export type UserUpdateSchema = Omit<UserSchema, 'password'>;

const CandidateSchema = z.object({
    name: z.string().min(2).max(100),
    lastname: z.string().min(2).max(100),
    position: z.string().min(2).max(100),
    about: z.string().min(2).max(200),
    phone: z.string().regex(new RegExp('')).min(2).max(14),
    email: z.email(),
    resumeUrl: z.url(),
    socialStatus: z.enum([
        SocialStatus.Single,
        SocialStatus.Married, 
        SocialStatus.Widowed,
        SocialStatus.Divorced,
        SocialStatus.Separated,
    ]),
    skils: z.array(z.string()),
    softSkills: z.array(z.string()),
})

export type CandidateSchema = z.infer<typeof CandidateSchema>

export const validateUserSchema = (input: any, isPartial: boolean = false) => {
    const result = isPartial ? UserSchema.partial().safeParse(input) : UserSchema.safeParse(input)
    return result
}

export const validateCandidate = (input: any, isPartial: boolean) => {
    const result = isPartial ? CandidateSchema.partial().safeParse(input) : CandidateSchema.safeParse(input);
    return result;
}

