import mongoose from "mongoose"
const sliderSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "عنوان اجباری است"]
    },
    image: {
        type: String,
        required: [true, "تصویر اجباری است"]
    },
    href: {
        type: String,
        required: [true, "لینک صفحه اجباری است"]
    },
}, {timestamps: true})
const Slider = mongoose.model("Slider", sliderSchema)
export default Slider