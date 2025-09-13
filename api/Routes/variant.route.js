import express from 'express'
import { create, getAll, getOne, remove, update } from '../Controllers/variant.controller.js'
const variantRouter = express.Router()
variantRouter.route('/').get(getAll).post(create)
variantRouter.route('/:id').get(getOne).patch(update).delete(remove)
export default variantRouter