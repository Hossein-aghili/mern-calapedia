import mongoose from "mongoose";
const productShema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"وارد نام محصول خود را وارد اجباری است"]
    }
})
const Product = mongoose.model('Product',productShema)
export default Product;