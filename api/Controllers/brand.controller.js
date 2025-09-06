import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import Brand from "../Models/brand.model.js";
import Product from "../Models/product.model.js";
import fs from "fs"

import { __dirname } from './../app.js';
export const getAll = catchAsync(async (req, res, next) => {
    const features = new ApiFeatures(Brand, req.query, req.role)
        .filter()
        .sort()
        .limitFields()
        .paginate()
        .populate()
    const brands = await features.execute()
    const count = await Brand.countDocuments()
    return res.status(200).json({
        success: true,
        data: brands,
        count,
        message: "با موفقیت دریافت شد"
    })
})
export const getOne = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const brand = await Brand.findById(id)
    if (!brand) {
        return next(new HandleERROR("برند یافت نشد", 404))
    }
    return res.status(200).json({
        success: true,
        data: brand,
        message: "با موفقیت دریافت شد"
    })
})
export const update = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const brand = await Brand.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
    if (!brand) {
        return next(new HandleERROR("برند یافت نشد", 404))
    }
    return res.status(200).json({
        success: true,
        data: brand,
        message: "با موفقیت به روز شد"
    })
})
export const remove = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const product = await Product.findOne({ brand: id })
    if (product) {
        return next(new HandleERROR("برند دارای محصول است و قابل حذف نیست", 400))
    }
    const brand = await Brand.findByIdAndDelete(id)
    if (brand.image) {
        fs.unlinkSync(`${__dirname}/Public/${brand.image}`)
    }
    return res.status(200).json({
        success: true,
        message: "با موفقیت حذف شد"
    })
})