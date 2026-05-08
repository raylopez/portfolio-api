import type { CandidateExperienceSchema } from '../models/schema.ts'
import type { EndPointCreateAsync, EndPointUpdateAsync } from '../definitions/endpoints.ts';
import { CandidateExperienceModel } from '../model/candidate-experience.ts';

export class CandidateExperienceController {
    static create: EndPointCreateAsync<CandidateExperienceSchema> = async (req, res) => {
        const experienceCreated = await CandidateExperienceModel.create(req.body)
        res.status(201).json(experienceCreated)
    }

    static update: EndPointUpdateAsync<CandidateExperienceSchema> = async (req, res) => {
        const { id } = req.params
        const result = await CandidateExperienceModel.update(id, req.body)
        const [affectedRows] = result
        if (affectedRows > 0) {
            res.json({ message: 'Experiencia actualizada con éxito' })
            return
        }

        res.status(400).json({ message: 'error al actualizar experiencia' })
    }
}