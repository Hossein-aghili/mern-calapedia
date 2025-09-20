import Cart from "../Models/cart.model.js";
import { catchAsync } from 'vanta-api';
import ProductVariant from './../Models/productVariant.model.js';

export const add = catchAsync(async (req, res, next) => {
    const { productVariantId, productId, categoryId } = req.body
    let add = false
    const pr = await ProductVariant.findById(productVariantId)
    const userId = req.userId
    const cart = await Cart.findOne({ userId })

    cart.items = cart.items.map((item) => {
        if (item.productVariantId.toString() == productVariantId) {
            item.quantity = item.quantity + 1
            cart.totalPrice = cart.totalPrice + item.finalPrice
            add = true
        }
        return item
    })
    if (!add) {
        cart.items.push({
            productId,
            categoryId,
            productVariantId,
            quantity: 1,
            finalPrice: pr.price
        })
        cart.totalPrice += +pr.price
    }
    const newCart = await cart.save()
    return res.status(200).json({
        success: true,
        data: newCart,
        message: 'با موفقیت اضافه شد'
    })
})
export const remove = catchAsync(async (req, res, next) => {
    const { productVariantId } = req.body
    const userId = req.userId
    const cart = await Cart.findOne({ userId })
    cart.items = cart.items.filter((item) => {
        if (item.productVariantId.toString() == productVariantId) {
            item.quantity = item.quantity - 1
            cart.totalPrice = cart.totalPrice - item.finalPrice
            if (item.quantity == 0) {
                return false
            }
        }
        return item
    })
    const newCart = await cart.save()
    return res.status(200).json({
        success: true,
        data: newCart,
        message: 'با موفقیت حذف شد'
    })
})
export const getUserCart = catchAsync(async (req, res, next) => {
    const userId = req.userId
    const cart = await Cart.findOne({ userId })
    return res.status(200).json({
        success: true,
        data: cart
    })
})