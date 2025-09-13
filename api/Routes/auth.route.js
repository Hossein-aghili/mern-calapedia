import express from 'express'
import { auth, checkOtp, checkPassword, forgetPasseord, resendCode } from '../Controllers/auth.controller.js'
const authRouter = express.Router()
authRouter.route('/').post(auth)
authRouter.route('/otp').post(checkOtp)
authRouter.route('/password').post(checkPassword)
authRouter.route('/forget').post(forgetPasseord)
authRouter.route('/resend').post(resendCode)
export default authRouter