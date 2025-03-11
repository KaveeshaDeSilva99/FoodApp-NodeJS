const mongoose = require('mongoose');

//schema
const userSchema = new mongoose.Schema(
    {
        userName:{
            type: String,
            required:[true, "user name is required"]
        },
        email:{
            type: String,
            required:[true, "email name is required"]
        },
        password:{
            type: String,
            required:[true,"Password name is required"],
            unique:true,
        },
        address:{
            type: Array,
        },
        phone:{
            type: String,
            required:[true, "phone numbername is required"]
        },
        usertype:{
            type:String,
            required:[true,"user type is required"],
            default:'client',
            enum:['client','admin','vendor','driver']
        },
        profile:{
            type:String,
            default:"https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid"
        },
        answer:{
           type:String,
           required: [true,"Answer is required"],
        }
    } ,{timestamps:true}
)

module.exports=mongoose.model('user',userSchema);