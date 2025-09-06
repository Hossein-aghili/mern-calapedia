import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api"
import Category from "../Models/category.model.js"
import Product from "../Models/product.model.js"
import fs from 'fs'

export const create = catchAsync(async(req,res,next)=>{
    const category = await Category.create(req.body)
    return res.status(200).json({
        success:true,
        data:category,
        message:'با موفقیت ساخته شد'
    })
})

export const getAll = catchAsync(async (req, res, next) => {
    let role = null
    if (req?.headers?.authorization) {
        role = jwt?.verify(req?.headers?.authorization.split(' ')[1], process.env.JWT_SECRET).role
    }
    const features = new ApiFeatures(Category, req.query, role)
        .filter()
        .sort()
        .limitFields()
        .search()
        .populate()
    const categories = await features.execute()
    const count = await Category.countDocuments()
    return res.status(200).json({
        success: true,
        data: categories,
        count,
        message: "با موفقیت دریافت شد"
    })
})
export const getOne = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const category = await Category.findById(id)
    if (!category) {
        return next(new HandleERROR("دسته بندی مورد نظر یافت نشد", 404))
    }
    return res.status(200).json({
        success: true,
        data: category,
        message: "با موفقیت دریافت شد"
    })
})
export const update = catchAsync(async (req, res, next) => {
    const {id} = req.params
    const category = await Category.findByIdAndUpdate(id,req.body,{new:true})
    if(!category) {
        return next(new HandleERROR("دسته بندی مورد نظر یافت نشد",404))
    }
    return res.status(200).json({
        success: true,
        data: category,
        message: "با موفقیت به روز شد"
    })
})
export const remove = catchAsync(async (req, res, next) => {
    const {id} = req.params
    const product = await Product.findOne({categoryId:id})
    const categories = await Category.findOne({parentCategory:id})
    if(product || categories) {
        return next(new HandleERROR("دسته بندی مورد نظر دارای محصول یا زیر دسته بندی است",400))
    }
    const category =await Category.findByIdAndDelete(id)
    if(category.image) {
        fs.unlinkSync(`${__dirname}/Public/Category/${category.image}`)
    }
    return res.status(200).json({
        success: true,
        data: category,
        message: "با موفقیت حذف شد"
    })
})