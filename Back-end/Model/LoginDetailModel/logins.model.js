const mongoose = require("mongoose");

const LoginDetailsSchema=new mongoose.Schema({

     LogUsermame:{
        type:String,
        required:true,
       },

       LogPass:{
        type:String,
        required:true,
       },
   
       Log_TableName:{
        type:String,
        required:true,
       },
   
    LogUserId:{
        type:String,
        required:true,
    }
      
})


const LoginDetails_schema = mongoose.model("LogDetails", LoginDetailsSchema);
module.exports={ LoginDetails_schema}

