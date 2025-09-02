import mongoose from "mongoose";
const addressSchema =mongoose.Schema({
    city:{
        type:String,
        required:[true,"وارد مکان خود را وارد اجباری است"]
    },
    receiverName:{
        type:String,
        required:[true,"وارد نام گیرنده خود را وارد اجباری است"]
    },
    receiverphoneNumber:{
        type:String,
        required:[true,"وارد شماره تلفن گیرنده خود را وارد اجباری است"],
        minlength:[11,"شماره تلفن باید 11 رقم باشد"],
        maxlength:[11,"شماره تلفن باید 11 رقم باشد"],
        unique:true,
    },
    postalCode:{
        type:String,
        required:[true,"وارد کد پستی خود را وارد اجباری است"],
        minlength:[10,"کد پستی باید 10 رقم باشد"],
        maxlength:[10,"کد پستی باید 10 رقم باشد"],
    },
    street:{
        type:String,
        required:[true,"وارد خیابان خود را وارد اجباری است"],
    },
    plaque:{
        type:String,
        required:[true,"وارد شماره پلاک خود را وارد اجباری است"],
    },
    province:{
        type:String,
        required:[true,"وارد استان خود را وارد اجباری است"],
    },
    description:{
        type:String,
        required:[true,"وارد توضیحات خود را وارد اجباری است"],
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }
},{
    timestamps:true,
})
const Address = mongoose.model("Address",addressSchema)
export default Address;