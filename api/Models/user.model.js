import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    fullname:{
        type: String,
    },
    username:{
        type: String,
    },
    phoneNumber: {
        type: String,
        required: [true, "phone number is required"],
        match: [/^(\+98|0)?9\d{9}$/, "phone is not valid"],
        unique: [true, "phone number is exist"],
      },
      password:{
        type: String,
      },
      isComplete : {
        type: Boolean,
        default:false
      },
      boughtProductIds:{
        type:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref: "Product",
            }
        ],
        default:[]
      },
      role:{
        type:String,
        enum:["user","admin"],
        default:"user"
      }
})
const User = mongoose.model("User",userSchema)
export default User