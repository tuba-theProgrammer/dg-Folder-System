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
       },

       Folder_ID:{
        type:String,
        required:true,
       },
    
    totalStorage:{
        type:String,
        required:true,
    },
    usedStorage:{
        type:String,
        required:true,
    },

    timeZone:{
        type:String,
        required:true,
    },

    timeFormate:{
        type:String,
        required:true,
    },
    dateFormate:{
        type:String,
        required:true,
    }
      
},{
    timestamps:true
})


LoginDetailsSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });



const LoginDetails_schema = mongoose.model("logins", LoginDetailsSchema);
module.exports={ LoginDetails_schema}

