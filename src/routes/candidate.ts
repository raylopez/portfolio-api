import { Router } from "express";
import { CandidateController } from "../controllers/candidate.controller.ts";
import { candidateExperienceMiddleware, candidateRegisterMiddleware } from "../middlewares/candidate.middleware.ts";

export const candidateRoutes: Router = Router()
candidateRoutes.get('/', CandidateController.getAll)
candidateRoutes.get('/:id', CandidateController.getById)
candidateRoutes.post('/', candidateRegisterMiddleware, CandidateController.create)
candidateRoutes.patch('/:id',candidateRegisterMiddleware, CandidateController.update)
candidateRoutes.delete('/:id', CandidateController.delete)
candidateRoutes.post('/:id', candidateExperienceMiddleware, CandidateController.addExperienceToCandidate)