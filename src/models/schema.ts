import * as z from 'zod'
import { ExperienceType, SocialStatus } from '../database/schema.ts';

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
    lastName: z.string().min(2).max(100),
    position: z.string().min(2).max(100),
    about: z.string().min(2).max(200),
    phone: z.string().regex(new RegExp('')).min(2).max(14),
    email: z.email(),
    resumeUrl: z.string(),
    socialStatus: z.enum([
        SocialStatus.Single,
        SocialStatus.Married, 
        SocialStatus.Widowed,
        SocialStatus.Divorced,
        SocialStatus.Separated,
    ]),
    skills: z.array(z.string()),
    softSkills: z.array(z.string()),
})

export type CandidateSchema = z.infer<typeof CandidateSchema>

export const validateUserSchema = (input: any, isPartial: boolean = false) => {
    const result = isPartial ? UserSchema.partial().safeParse(input) : UserSchema.safeParse(input)
    return result
}

export const validateCandidate = (input: any, isPartial: boolean = false) => {
    const result = isPartial ? CandidateSchema.partial().safeParse(input) : CandidateSchema.safeParse(input);
    return result;
}

export const CandidateExperienceSchema = z.object({
    name: z.string(),
    description: z.string().max(250),
    periodStart: z.date(),
    periodEnd: z.date(),
    type: z.enum([ExperienceType.Education, ExperienceType.Job]),
    technologies: z.array(z.string()),
    degree: z.string(),
    link: z.url(),
    candidateId: z.uuid({ version: 'v4' })
})

export type CandidateExperienceSchema = z.infer<typeof CandidateExperienceSchema>

export const validateCandidateExperience = (input: any, isPartial: boolean = false) => {
    const result = isPartial ? CandidateExperienceSchema.partial().safeParse(input) : CandidateExperienceSchema.safeParse(input)

    return result
}