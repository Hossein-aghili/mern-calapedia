import express from 'express'
import { fileURLToPath } from "url";
import path from "path";
import cors from 'cors'
import morgan from 'morgan';

const __filename =fileURLToPath(import.meta.url)
export const __dirname = path.dirname(__filename)

const app = express()
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

export default app