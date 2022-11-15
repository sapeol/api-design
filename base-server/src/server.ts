import express from 'express';
import router from './router';
import morgan from 'morgan'
import cors from 'cors'
import { protectroute } from './modules/auth';
const app = express()
app.use(cors())
app.use(morgan('dev'))
app.use('/api', protectroute, router)

export default app