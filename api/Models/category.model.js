import mongoose from "mongoose" 
const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "وارد نام دسته بندی خود را وارد اجباری است"]
    },
    parentCategory: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "Category",
        default:null
    },
    image: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: true
    },

},{timestamps:true})
categorySchema.index({title:1,parentCategory:1},{unique:true})

const Category = mongoose.model("Category",categorySchema)
export default Category;