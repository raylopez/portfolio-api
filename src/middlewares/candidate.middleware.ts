import type { Request, Response, NextFunction } from 'express'
import { validateCandidate, validateCandidateExperience } from '../models/schema.ts'

export const candidateRegisterMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const isPartial = req.method === 'PATCH' ? true: false;
    const validated = validateCandidate(req.body, isPartial);

    if (validated.success) {
        req.body = validated.data;
        return next()
    }
    
    return res.status(400).json({ message: 'Error de entrada', error: JSON.parse(validated.error.message) })
}

export const candidateExperienceMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const validation = validateCandidateExperience(req.body);
    if (validation.success) {
        req.body = validation.data
        return next()
    }

    res.status(400).json({ message : 'Error de entrada', error: JSON.parse(validation.error.message) })
}