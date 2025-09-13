import mongoose from "mongoose";
const informtionSchema = mongoose.Schema({

})
const productShema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "وارد نام محصول خود را وارد اجباری است"]
    },
    imageUrl: {
        type: String,
        required: [true, 'بارگذاری عکس اجباری است'],
        default: []
    },
    informtion: {
        type: [informtionSchema],
        default: []
    },
    description: {
        type: String,
        required: [true, 'توضیحات اجباری است']
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    brandId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand'
    },
    defaultProductVariant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'productVariant'
    }

}, { timestamps: true })
const Product = mongoose.model('Product', productShema)
export default Product;