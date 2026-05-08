import { CandidateExperience } from "../database/schema.ts";
import type { CandidateExperienceSchema } from "../models/schema.ts";

export class CandidateExperienceModel {
    static findByCandidateId = (candidateId: string) => CandidateExperience.findAll({ where: { candidateId } })
    static create = (input: CandidateExperienceSchema) => CandidateExperience.create(input)
    static update = (id: string, input: CandidateExperienceSchema) => CandidateExperience.update(input, { where: { id } })
}