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
    ],
    benchmark: true,
    logging: (sql,timing) => {
        console.log(`Executed SQL: ${sql} in ${timing}`)
        if (timing)
            console.log(`Time taken ${timing}ms`);
    }
})