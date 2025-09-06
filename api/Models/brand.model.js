import mongoose from "mongoose";
const brandShema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"وارد نام برند خود را وارد اجباری است"]
    },
    image:{
        type:String,
        required:[true,"وارد عکس برند خود را وارد اجباری است"]
    }

},{timestamps:true})
const Brand =mongoose.model("Brand",brandShema)
export default Brand;