import { Candidate, CandidateExperience, ExperienceType } from '../database/schema.ts'
import { type CandidateSchema } from '../models/schema.ts'
import { CandidateModel } from '../model/candidate.ts'
import type { EndPointAsync, EndPointCreateAsync, EndPointUpdateAsync, EndPointWithIdAsync } from '../definitions/endpoints.ts'


export class CandidateController {
    static getAll: EndPointAsync = async (_, res) => {
        const candidates = await CandidateModel.getAll()
        res.json(candidates)
    }
    static getById: EndPointWithIdAsync = async (req, res) => {
        const { id } = req.params
        const candidate = await CandidateModel.getById(id)
        if (!candidate) {
            res.status(404).json({ message: 'candidato no encontrado' })
            return
        }
        
        res.send(candidate)
    }
    static getOne: EndPointAsync = async (req, res) => {
        const candidate = await CandidateModel.getOne()
        if (!candidate) {
            res.status(404).json({ message: 'No hay ningún candidato' })
            return
        }

        const { name, lastName, about, position, socialStatus, email, phone, resumeUrl, skills, softSkills,socials, experiences } = candidate
        const candidateMap = {
            name,
            lastName,
            about,
            position,
            socialStatus,
            email,
            phone,
            resumeUrl,
            skills,
            softSkills,
            socials,            
            education: experiences.filter(x=>x.type == ExperienceType.Education),
            experenceJobs: experiences.filter(x=>x.type == ExperienceType.Job),
        };

        res.json(candidateMap)
    }
    static getExperiencesByCandidate:EndPointWithIdAsync = async (req, res) => {
        const { id } = req.params
        const experiences = await CandidateExperience.findAll({ where: { candidateId: id } })
        
        res.send(experiences)
    }
    static create:EndPointCreateAsync<CandidateSchema> = async (req, res) => {
        const candidateCreate = await CandidateModel.create(req.body)
        res.status(201).json(candidateCreate)
    }
    static update: EndPointUpdateAsync<CandidateSchema> = async (req, res) => {
        const { id } = req.params
        const result = await CandidateModel.update(id, req.body)
        const [affectedRows] = result
        if (affectedRows < 1) {
            res.status(400).json({ message: 'No se pudo actualizar el candidato' })
            return 
        }

        res.send({ message: 'Candidato actualizado' })
    }
    static delete:EndPointWithIdAsync = async (req, res): Promise<void> => {
        const { id } = req.params
        const result = await Candidate.destroy({ where: {  id } })
        if (result > 0) {
            res.send('elimiando candidato')
            return
        }

        res.status(400).json({ message: 'no se pudo eliminar el candidato' })
    }
}