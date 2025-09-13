import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import ProductVariant from "../Models/productVariant.model.js";
export const create = catchAsync(async (req, res, next) => {
    const productVariant = await ProductVariant.create(req.body)
    return res.status(201).json({
        success: true,
        data: productVariant,
        message: 'با موفقیت ساخته شد'
    })
})
export const getAll = catchAsync(async (req, res, next) => {
    const features = new ApiFeatures(ProductVariant, req.query, req?.role)
        .filter()
        .sort()
        .paginate()
        .populate()
    const productVariant = await features.execute()
    const count = await ProductVariant.countDocuments()
    return res.status(200).json({
        success: true,
        data: productVariant,
        count,
        message: 'با موفقیت دریافت شد'
    })
})
export const getOne = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const productVariant = await ProductVariant.findById(id).populate('variantId productId')
    if (!productVariant) {
        return next(new HandleERROR('نوع محصول پیدا نشد'), 404)
    }
    return res.status(200).json({
        success: true,
        data: productVariant,
        message: 'با موفقیت دریافت شد'
    })
})
export const update = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const productVariant = await ProductVariant.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
    if (!productVariant) {
        return next(new HandleERROR('نوع محصول پیدا نشد'), 404)
    }
    return res.status(200).json({
        success: true,
        data: productVariant,
        message: 'با موفقیت اپدیت شد'
    })

})
export const remove = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const productVariant = await ProductVariant.findByIdAndDelete(id)
    return res.status(200).json({
        success: true,
        data: productVariant,
        message: 'با موفقیت حذف شد'
    })
})