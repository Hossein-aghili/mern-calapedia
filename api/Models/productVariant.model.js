import mongoose from "mongoose";
const productVariantSchema = new mongoose.Schema({
    price: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    },
    variantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Variant'
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    priceAfterDiscount: {
        type: number,
        required: true
    }
}, { timestamps: true })
const ProductVariant = mongoose.model('productVariant', productVariantSchema)
export default ProductVariant