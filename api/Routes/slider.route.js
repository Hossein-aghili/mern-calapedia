import express from 'express'
import { getAll, create, getOne, update, remove } from '../Controllers/slider.controller.js'
import { isAdmin } from './../Middlewares/isAdmin.js';
const sliderRouter = express.Router()
sliderRouter.route('/').get(getAll).post(isAdmin, create)
sliderRouter.route('/:id').get(isAdmin, getOne).patch(isAdmin, update).delete(isAdmin, remove)
export default sliderRouter