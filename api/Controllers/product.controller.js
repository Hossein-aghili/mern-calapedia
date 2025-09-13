import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import Product from "../Models/product.model.js";
import ProductVariant from "../Models/productVariant.model.js";
import fs from 'fs'
export const create = catchAsync(async (req, res, next) => {
    const product = await Product.create(req.body)
    return res.status(201).json({
        success: true,
        data: product,
        message: 'با موفقیت ساخته شد'
    })
})
export const getAll = catchAsync(async (req, res, next) => {
    const features = new ApiFeatures(Product, req.query, req.role)
        .filter()
        .sort()
        .paginate()
        .populate()
    const products = await features.execute()
    const count = await Product.countDocuments()
    return res.status(200).json({
        success: true,
        data: products,
        count,
        message: "با موفقیت دریافت شد"
    })
})
export const getOne = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const product = await Product.findById(id).populate('categoryId brandId defaultProductVariant')
    if (!product) {
        return next(new HandleERROR('محصول پیدا نشد'), 404)
    }
    return res.status(200).json({
        success: true,
        data: product,
        message: "با موفقیت دریافت شد"
    })

})
export const update = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const product = await Product.findByIdAndUpdate(id, { new: true, runValidators: true })
    if (!product) {
        return next(new HandleERROR('محصول پیدا نشد'), 404)
    }
    return res.status(200).json({
        success: true,
        data: product,
        message: "با موفقیت به روز شد"
    })
})
export const remove = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const productVariant = await ProductVariant.deleteMany({ productId: id })
    const product = await Product.findByIdAndDelete(id)
    for (let image of product.imageUrl) {
        fs.unlinkSync(`${__dirname}/Public/${image}`)
    }
    return res.status(200).json({
        success: true,
        message: 'با موفقیت حذف شد'
    })
})
