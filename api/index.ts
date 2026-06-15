import express, { type Response, type Express } from 'express'
import { userRoutes } from '../src/routes/user.ts'
import { sequelize } from '../src/database/sequelize.ts'
import { candidateRoutes } from '../src/routes/candidate.ts'
import { router as socialItemRouter } from '../src/routes/social-item.ts'
import { PORT } from '../src/config.ts'
import { errorMiddleware } from '../src/middlewares/error.middleware.ts'
import { candidateExperienceRoutes } from '../src/routes/candidate-experience.ts'
import cors from 'cors'
import morgan from 'morgan'

const port = PORT ?? 3000

const app: Express = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(cors({ origin: 'http://localhost:4200', methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'] }))

const main = async () => {
  try {
    await sequelize.sync()
    console.log('Base de datos inicializada');
    
    app.listen(port, () => {
      console.log(`Escuchando api en http://localhost:${port}`);
    })
  } catch (error) {
    console.error('Error al iniciar BD', error);
  }
}

main();

app.get('/', async (_, res: Response) => {
  res.send('<h1>Bienvenido a la API</h1>')
})

//Routes
app.use('/users',userRoutes)
app.use('/candidates',candidateRoutes)
app.use('/candidate-experience', candidateExperienceRoutes)
app.use('/social-item', socialItemRouter)

//Middlewares
app.use(errorMiddleware)

app.use('/', (_, res: Response) => {
  res.status(404).send('<h1>Pagina no encontrada</h1>')
})
export default app