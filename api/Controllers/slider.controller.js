import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api"
import Slider from "../Models/slider.model.js"
import  fs from 'fs';

export  const create = catchAsync(async(req,res,next)=>{
    const slider = await Slider.create(req.body)
    return res.status(201).json({
        success: true,
        data: slider,
        message: "با موفقیت ساخته شد"
    })
})
export const getAll = catchAsync(async(req,res,next)=>{
    const features = new ApiFeatures(Slider,req.query,req.role)
    .filter()
    .sort()
    .limitFields()
    .populate()
    const slider = await features.execute()
    return res.status(200).json({
        success: true,
        data: slider,
        message: "با موفقیت دریافت شد"
    })
})
export const getOne = catchAsync(async(req,res,next)=>{
    const {id} = req.params
    const slider = await Slider.findById(id)
    if(!slider){
        return next(new HandleERROR("اسلایدر مورد نظر یافت نشد",404))
    }
    return res.status(200).json({
        success: true,
        data: slider,
        message: "با موفقیت دریافت شد"
    })
})
export const update = catchAsync(async(req,res,next)=>{
    const {id} = req.params
    const slider = await Slider.findByIdAndUpdate(id,req.body,{new: true})
    if(!slider){
        return next(new HandleERROR("اسلایدر مورد نظر یافت نشد",404))
    }
    return res.status(200).json({
        success: true,
        data: slider,
        message: "با موفقیت به روز شد"
    })
})
export const remove = catchAsync(async(req,res,next)=>{
    const {id} = req.params
    const slider = await Slider.findByIdAndDelete(id)
    if(slider.image){
        fs.unlinkSync(`${__dirname}/Public/${slider.image}`)
    }
    return res.status(200).json({
        success: true,
        message: "با موفقیت حذف شد"
    })
})