import express from 'express'
import { changeActivity, createComment, getAllComment, getOneComment, getProductComment, removeComment } from '../Controllers/comment.controller.js'
import { isAdmin } from './../Middlewares/isAdmin.js';
import { isLogin } from '../Middlewares/isLogin.js';
const commentRouter = express.Router()
commentRouter.route('/').get(isAdmin, getAllComment).post(isLogin, createComment)
commentRouter.route('/post-comments/:id').get(getProductComment)
commentRouter.route('/:id').get(isAdmin, getOneComment).patch(isAdmin, changeActivity).delete(isAdmin, removeComment)
export default commentRouter