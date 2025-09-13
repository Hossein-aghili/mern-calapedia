import mongoose from "mongoose";
const variantSchema = new mongoose.Schema({
    type:{
        type:String,
        enum:['size','color'],
        required:[true,'نوع تایپ الزامی است']
    },
    value:{
        type:String,
        required:[true,'مقدار الزامی است']
    }
},{timestamps:true})
const Variant = mongoose.model('Variant',variantSchema)
export default Variant