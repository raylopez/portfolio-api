import { Sequelize } from 'sequelize-typescript'
import { Candidate, CandidateExperience, SocialItem, User } from './schema.ts'
import { POSTGRES_URL } from '../config.ts'

export const sequelize = new Sequelize(POSTGRES_URL!, {
    dialect: 'postgres',
    ssl: true,
    models: [
        User,
        Candidate,
        CandidateExperience,
        SocialItem
    ]
})