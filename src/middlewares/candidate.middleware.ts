import type { Request, Response, NextFunction } from 'express'
import { CandidateSchema, SocialItemSchema, validateCandidate, validateCandidateExperience, validateSchema } from '../models/schema.ts'
import type { MiddlewareAsync } from '../definitions/endpoints.ts'
import type { ZodObject, ZodSchema } from 'zod'

const getErrorResponse = (res: Response, error: string) => {
  return  res.status(400).json({ message : 'Error de entrada', error })
}

export const candidateRegisterMiddleware: MiddlewareAsync = () => {
    validationMiddleware(CandidateSchema)
}

export const candidateExperienceMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const isPartial: boolean = req.method === 'PATCH' ? true: false;
    const validation = validateCandidateExperience(req.body, isPartial);
    if (validation.success) {
        req.body = validation.data
        return next()
    }

    res.status(400).json({ message : 'Error de entrada', error: JSON.parse(validation.error.message) })
}

export const socialItemMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const isPartial = req.method  === 'PATCH' ? true : false;
    const result = validateSchema(SocialItemSchema, req.body, isPartial)
    if (result.success) {
        req.body = result.data
        return next()
    }
    
    getErrorResponse(res, JSON.parse(result.error.message))
}

export function validationMiddleware<T extends ZodObject>(schema: T): MiddlewareAsync {

    return (req, res, next) => {
        const isPartial: boolean = req.method === 'PATCH' ? true : false;
        const validation = validateSchema<T>(schema, req.body, isPartial)

        if (!validation.success) {
            res.status(400)
                .json({
                    message: 'Validation error',
                    error: JSON.parse(validation.error.message)
                })
            return
        }

        req.body = validation.data
        next()
    }
}