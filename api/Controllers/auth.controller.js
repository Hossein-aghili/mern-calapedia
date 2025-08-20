import { catchAsync, HandleERROR } from "vanta-api";
import User from "../Models/user.model";
import { sendAuthCode } from "../Utils/smsHandler";

export const auth = catchAsync(async (req, res, next) => {
    const { phoneNumber = null, } = req.body
    if (!phoneNumber) {
        return next(new HandleERROR("شماره تلفن همراه خود را وارد کنید", 400))
    }
    const user = await User.findOne({ phoneNumber })
    if (!user) {
        return next(new HandleERROR("کاربری با این شماره تلفن همراه یافت نشد", 404))
    }
    if (user && user.password) {
        return res.status(200).json({
            success: true,
            newAccount: false,
            password: true,
        })
    } else {
        const resultSms = await sendAuthCode(phoneNumber)
        if (resultSms.success) {
            return res.status(200).json({
                success: true,
                newAccount: user?._id ? false : true,
                password: false,
            })
        } else {
            return res.status(404).json({
                success: false,
                newAccount: user?._id ? false : true,
                password: false,
                message: resultSms.message
            })
        }
    }
})
export const checkOtp = catchAsync(async (req, res, next) => { })
export const checkPassword = catchAsync(async (req, res, next) => { })
export const forgetPasseord = catchAsync(async (req, res, next) => { })
export const resendCode = catchAsync(async (req, res, next) => { })