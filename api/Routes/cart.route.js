import express from 'express'
import { add, getUserCart, remove } from '../Controllers/cart.controller.js'
const cartRouter = express.Router()
cartRouter.route('/').post(add).get(getUserCart).patch(remove)
export default cartRouter