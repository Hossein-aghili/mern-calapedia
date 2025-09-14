import Comment from "../Models/comment.model.js";
import ApiFeatures, { catchAsync } from 'vanta-api';
export const createComment = catchAsync(async (req, res, next) => {
    const userId = req.userId
    const { isActive = null, ...others } = req.body
    const comment = await Comment.create({ ...others, userId })
    return res.status(201).json({
        success: true,
        data: comment,
        message: 'کامنت با موفقیت ساخته شد'
    })
})
export const getAllComment = catchAsync(async (req, res, next) => {
    const features = new ApiFeatures(Comment, req.query, req?.role)
        .filter()
        .sort()
        .paginate()
        .populate()
    const comments = await features.execute()
    const count = await Comment.countDocuments()
    return res.status(200).json({
        success: true,
        data: comments,
        count,
        message: 'با موفقیت ساخته دریافت شد'
    })
})
export const getOneComment = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const comment = await Comment.findById(id).populate('userId productId')
    return res.status(200).json({
        success: true,
        data: true,
        message: 'با موفقیت ساخته دریافت شد'
    })
})
export const getProductComment = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const comment = await Comment.find({ $and: [{ productId: id, isActive: true }] })
    return res.status(200).json({
        success: true,
        data: true,
        message: 'با موفقیت ساخته دریافت شد'
    })
})
export const changeActivity = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const comment = await Comment.findByIdAndUpdate(id, { isActive: req.body.isActive }, { new: true, runValidators: true })
    return res.status(200).json({
        success: true,
        data: true,
        message: "با موفقیت به روز شد"
    })
})
export const removeComment = catchAsync(async (req, res, next) => {
    const { id } = params
    const comment = await findByIdAndDelete(id)
    return res.status(200).json({
        success: true,
        data:comment,
        message: 'با موفقیت حذف شد'
    })
})