import { Router } from "express";
import { CandidateExperienceController } from "../controllers/candidate-experience.controller.ts";
import { candidateExperienceMiddleware } from "../middlewares/candidate.middleware.ts";

export const candidateExperienceRoutes = Router();
candidateExperienceRoutes.post('/', candidateExperienceMiddleware, CandidateExperienceController.create)
candidateExperienceRoutes.patch('/:id', candidateExperienceMiddleware, CandidateExperienceController.update)