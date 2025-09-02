import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import Address from "../Models/address.model.js";

export const create = catchAsync(async (req, res, next) => {

})
export const getAll = catchAsync(async (req, res, next) => {
    const features = new ApiFeatures(Address, req.query, req.role)
        .filter()
        .sort()
        .addManualFilters(req.role != 'admin' ? { userId: req.userId } : '')
        .limitFields()
        .paginate()
        .populate([{ path: 'userId', select: 'username phoneNumber fullName' }])
    const addresses = await features.execute()
    return res.status(200).json({
        success: true,
        data: addresses,
        message: "با موفقیت دریافت شد"
    })
})
export const getOne = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const address = await Address.findById(id)
    if (req.role != 'admin' && address.userId != req.userId) {
        return next(new HandleERROR("شما اجازه دسترسی به این آدرس را ندارید", 401))
    }
    return res.status(200).json({
        success: true,
        data: address,
        message: "با موفقیت دریافت شد"
    })
})
export const update = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const { userId = null, ...others } = req.body
    const address = await Address.findById(id)
    if (req.role != 'admin' && address.userId != req.userId) {
        return next(new HandleERROR("شما اجازه دسترسی به این آدرس را ندارید", 401))
    }
    const newAddress = await Address.findByIdAndUpdate(id, others, { new: true, runValidators: true })
    return res.status(200).json({
        success: true,
        data: newAddress,
        message: "با موفقیت به روز شد"
    })
})
export const remove = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const address = await Address.findById(id)
    if (req.role != 'admin' && address.userId != req.userId) {
        return next(new HandleERROR("شما اجازه دسترسی به این آدرس را ندارید", 401))
    }
    await Address.findByIdAndUpdate(id)
    return res.status(200).json({
        success: true,
        message: "با موفقیت حذف شد"
    })
})