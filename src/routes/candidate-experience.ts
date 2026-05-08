import { Router } from "express";
import { CandidateExperienceController } from "../controllers/candidate-experience.controller.ts";
import { validationMiddleware } from "../middlewares/validation.middleware.ts";
import { CandidateExperienceSchema } from "../models/schema.ts";

export const candidateExperienceRoutes = Router();
candidateExperienceRoutes.post('/', validationMiddleware(CandidateExperienceSchema), CandidateExperienceController.create)
candidateExperienceRoutes.patch('/:id', validationMiddleware(CandidateExperienceSchema), CandidateExperienceController.update)