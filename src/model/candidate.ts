import { Candidate, CandidateExperience, SocialItem } from "../database/schema.ts";
import type { CandidateSchema } from "../models/schema.ts";

export class CandidateModel {
    static getAll = () => {
        return Candidate.findAll({ attributes: { exclude: ['createdAt','updatedAt'] } })
    }

    static getById = (id: string) => {
        return  Candidate.findByPk(id, { 
            attributes: { exclude: ['createdAt', 'updatedAt'] }, 
            include:[
                { model: CandidateExperience, attributes: { exclude: ['createdAt', 'updatedAt', 'candidateId'] },},
                { model: SocialItem, attributes: { exclude: ['createdAt', 'updatedAt', 'candidateId'] } }
            ] })
    }

    static getOne = () => {
        return  Candidate.findOne({ 
            attributes: { exclude: ['createdAt', 'updatedAt'] }, 
            include:[
                { model: CandidateExperience, attributes: { exclude: ['createdAt', 'updatedAt', 'candidateId'] },},
                { model: SocialItem, attributes: { exclude: ['createdAt', 'updatedAt', 'candidateId'] } }
            ] })
    }

    static create = (input: CandidateSchema) => {
        return Candidate.create(input);
    }

    static update = (id: string, input: CandidateSchema) => {
        return Candidate.update(input, { where: { id } })
    }
}