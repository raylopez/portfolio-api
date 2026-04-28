import type { Request, Response } from 'express'
import { Candidate } from '../database/schema.ts'

export class CandidateController {
    static getAll = async (req: Request, res: Response) => {
        const candidates = await Candidate.findAll()
        res.json(candidates)
    }
    static getById = async (req: Request<{id: string}>, res: Response) => {
        res.send('obteniendo candidatos')
    }
    static create = async (req: Request<{},{},{name: string}>, res: Response) => {
        const { name } = req.body
        res.send('obteniendo candidatos')
    }
    static update = async (req: Request<{id: string},{},{name: string}>, res: Response) => {
        const { name } = req.body
        res.send('obteniendo candidatos')
    }
    static delete = async (req: Request<{id: string}>, res: Response) => {
        res.send('obteniendo candidatos')
    }
}