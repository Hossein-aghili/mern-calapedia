import mongoose from "mongoose";
const commentSchema = new mongoose.Schema({
    content:{
        type:String,
        required:[true,'وارد کردن محتوا اجباری است'],
        trim:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    },
    isActive:{
        type:Boolean,
        default:false
    }
},{timestamps:true})
const Comment = mongoose.model('Comment',commentSchema)
export default Comment