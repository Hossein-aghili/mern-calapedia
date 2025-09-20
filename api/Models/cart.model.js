import mongoose from "mongoose";
const itemSchema = mongoose.Schema({
    productVariantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductVariant'
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    quantity: {
        type: Boolean,
        default: 0
    }
})
const cartSchema = mongoose.Schema({
    items: {
        type: [itemSchema],
        default: []
    },
    totalPrice: {
        type: Number,
        default: 0
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Cart = mongoose.model('Cart', cartSchema)
export default Cart