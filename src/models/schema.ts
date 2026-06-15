import * as z from 'zod'
import { ExperienceType, SocialStatus } from '../database/schema.ts';

export const UserSchema = z.object({
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

export const CandidateSchema = z.object({
    name: z.string().min(2).max(100),
    lastName: z.string().min(2).max(100),
    position: z.string().min(2).max(100),
    about: z.string().min(2).max(300),
    phone: z.string().regex(new RegExp('')).min(2).max(14),
    email: z.email(),
    resumeUrl: z.string(),
    profilePhotoPath: z.string(),
    socialStatus: z.enum([
        SocialStatus.Single,
        SocialStatus.Married, 
        SocialStatus.Widowed,
        SocialStatus.Divorced,
        SocialStatus.Separated,
    ]),
    skills: z.array(z.string()).transform(s => s.join(',')),
    softSkills: z.array(z.string()).transform(s => s.join(',')),
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
    periodStart: z.coerce.date(),
    periodEnd: z.coerce.date(),
    type: z.enum([ExperienceType.Education, ExperienceType.Job]),
    technologies: z.array(z.string()).transform(t=>t.join(',')),
    degree: z.string(),
    link: z.url(),
    candidateId: z.uuid({ version: 'v4' })
})

export type CandidateExperienceSchema = z.infer<typeof CandidateExperienceSchema>

export const validateCandidateExperience = (input: any, isPartial: boolean = false) => {
    const result = isPartial ? CandidateExperienceSchema.partial().safeParse(input) : CandidateExperienceSchema.safeParse(input)

    return result
}

export const SocialItemSchema = z.object({
    name: z.string(),
    url: z.url(),
    candidateId: z.uuidv4()
})

export type SocialItem = z.infer<typeof SocialItemSchema>


export function validateSchema<T extends z.ZodObject>(schema: T, input: unknown, isPartial: boolean = false) {
    const result = isPartial ? schema.partial().safeParse(input) : schema.safeParse(input)
    return result
}