import ApiFeatures, { catchAsync } from "vanta-api";
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
    .populate([{path:'userId',select:'username phoneNumber fullName'}])
    const addresses = await features.execute()
    return res.status(200).json({
        success:true,
        data:addresses,
        message:"با موفقیت دریافت شد"
    })
})
export const getOne = catchAsync(async (req, res, next) => {

})
export const update = catchAsync(async (req, res, next) => {

})
export const remove = catchAsync(async (req, res, next) => {

})