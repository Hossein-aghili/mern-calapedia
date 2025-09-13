import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import Variant from "../Models/variant.model.js";
import ProductVariant from "../Models/productVariant.model";
export const create = catchAsync(async (req, res, next) => {
    const variant = await Variant.create(req.body)
    return res.status(201).json({
        success: true,
        data: variant,
        message: 'با موفقیت ساخته شد'
    })
})
export const getAll = catchAsync(async (req, res, next) => {
    const features = new ApiFeatures(Variant, req.query, req?.role)
        .filter()
        .sort()
        .paginate()
        .populate()
    const variants = await features.execute()
    const count = await Variant.countDocuments()
    return res.status(200).json({
        success: true,
        data: variants,
        count,
        message: 'با موفقیت دریافت شد'
    })
})
export const getOne = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const variant = await Variant.findById(id)
    if (!variant) {
        return next(new HandleERROR('نوع محصول پیدا نشد'), 404)
    }
    return res.status(200).json({
        success: true,
        data: variant,
        message: 'با موفقیت دریافت شد'
    })
})
export const update = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const variant = await Variant.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
    if (!variant) {
        return next(new HandleERROR('نوع محصول پیدا نشد'), 404)
    }
    return res.status(200).json({
        success: true,
        data: variant,
        message: 'با موفقیت اپدیت شد'
    })
})
export const remove = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const product = await ProductVariant.findOne({ variantId: id })
    if (product) {
        return next(new HandleERROR('شما نمیتوانید این نوع را حذف کنید لطفا ابتدا تمام محصولات این نوع را حذف کنید'), 400)
    }
    await Variant.findByIdAndDelete(id)
    return res.status(200).json({
        success: true,
        message: 'با موفقیت حذف شد'
    })
})