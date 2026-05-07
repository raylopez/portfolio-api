import type { CandidateExperienceSchema } from '../models/schema.ts'
import { CandidateExperience } from '../database/schema.ts';
import type { EndPointCreateAsync, EndPointUpdateAsync } from '../definitions/endpoints.ts';

export class CandidateExperienceController {
    static create: EndPointCreateAsync<CandidateExperienceSchema> = async (req, res) => {
        const experienceCreated = await CandidateExperience.create(req.body)
        res.status(201).json(experienceCreated)
    }

    static update: EndPointUpdateAsync<CandidateExperienceSchema> = async (req, res) => {
        const { id } = req.params
        const result = await CandidateExperience.update(req.body, { where: { id } })
        const [affectedRows] = result
        if (affectedRows > 0) {
            res.json({ message: 'Experiencia actualizada con éxito' })
            return
        }

        res.status(400).json({ message: 'error al actualizar experiencia' })
    }
}