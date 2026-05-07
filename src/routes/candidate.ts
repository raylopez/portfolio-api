import { Router } from "express";
import { CandidateController } from "../controllers/candidate.controller.ts";
import { candidateExperienceMiddleware, candidateRegisterMiddleware, validationMiddleware } from "../middlewares/candidate.middleware.ts";
import { CandidateSchema } from "../models/schema.ts";

export const candidateRoutes: Router = Router()
candidateRoutes.get('/', CandidateController.getAll)
candidateRoutes.get('/first', CandidateController.getOne)
candidateRoutes.get('/:id', CandidateController.getById)
candidateRoutes.get('/:id/experiences', CandidateController.getExperiencesByCandidate)
candidateRoutes.post('/', validationMiddleware(CandidateSchema), CandidateController.create)
candidateRoutes.patch('/:id',candidateRegisterMiddleware, CandidateController.update)
candidateRoutes.delete('/:id', CandidateController.delete)