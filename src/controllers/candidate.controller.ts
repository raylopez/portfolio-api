import type { Request, Response } from 'express'
import { Candidate } from '../database/schema.ts'
import { type CandidateSchema } from '../models/schema.ts'

export class CandidateController {
    static getAll = async (_req: Request, res: Response) => {
        const candidates = await Candidate.findAll()
        res.json(candidates)
    }
    static getById = async (req: Request<{id: string}>, res: Response) => {
        const { id } = req.params
        const candidate = await Candidate.findByPk(id)
        if (!candidate) {
            return res.status(400).json({ message: 'candidato no encontrado' })
        }
        
        res.send(candidate)
    }
    static create = async (req: Request<{},{},CandidateSchema>, res: Response) => {
        const candidateCreate = await Candidate.create(req.body);
        if (!candidateCreate) return res.status(400).json({ message: 'candidate no created' })
        
        res.status(201).send({ message: 'candidato creado con éxito' })
    }
    static update = async (req: Request<{id: string},{},CandidateSchema>, res: Response) => {
        const { id } = req.params
        const { name, lastName, phone, email } = req.body
        const result = await Candidate.update({  name, lastName, phone, email},
            { where:{ id: id } })
        const [affectedRows] = result
        if (affectedRows < 1) {
            return res.status(400).json({ message: 'No se pudo actualizar el candidato' })
        }

        res.send({ message: 'Candidato actualizado' })
    }
    static delete = async (req: Request<{id: string}>, res: Response) => {
        res.send('obteniendo candidatos')
    }
    static addExperienceToCandidate = async (req: Request<{id: string}, {},{name: string, dateStart: Date, dateEnd: Date}>, res: Response) => {
        const { id } = req.params
        res.status(201).json({ message: 'created' })
    }
}