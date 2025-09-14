import express from 'express'
import { create, getAll, getOne, remove, update } from './../Controllers/productVariant.controller.js';
const productVariantRouter = express.Router()
productVariantRouter.route('/').get(getAll).post(create)
productVariantRouter.route('/:id').get(getOne).patch(update).delete(remove)
export default productVariantRouter