import express from 'express';
import router from './router';
import morgan from 'morgan'
import cors from 'cors'
import { protectroute } from './modules/auth';
import { createUser, signIn } from './handlers/user';
const app = express()
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', protectroute, router)
app.use('/signup', createUser)
app.use('/signin', signIn)
export default app     