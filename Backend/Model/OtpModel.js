const mongoose = require("mongoose");

const OtpSchema=new mongoose.Schema({
   
    email: {
        type:String,
        required:true
    },

    code:{
        type:Number,
        required:true
    },
    expireIn:{
        type:Date, 
        required:true
    }

})


const Otp_schema = mongoose.model("Otps", OtpSchema);
module.exports={ Otp_schema}

  
