import { Router } from "express";
import { CandidateController } from "../controllers/candidate.controller.ts";

export const candidateRoutes: Router = Router()
candidateRoutes.get('/', CandidateController.getAll)
candidateRoutes.get('/', CandidateController.getById)
candidateRoutes.post('/', CandidateController.create)
candidateRoutes.purge('/', CandidateController.update)
candidateRoutes.delete('/', CandidateController.delete)