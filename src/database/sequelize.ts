import { Sequelize } from 'sequelize-typescript'
import * as dotenv from 'dotenv'
import { Candidate, CandidateExperience, SocialItem, User } from './schema.ts'

dotenv.config()

export const sequelize = new Sequelize(process.env.POSTGRES_URL!, {
    dialect: 'postgres',
    ssl: true,
    models: [
        User,
        Candidate,
        CandidateExperience,
        SocialItem
    ]
})