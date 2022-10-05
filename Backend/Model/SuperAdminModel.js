const mongoose = require("mongoose");


const SuperAdminSchema=new mongoose.Schema({
    AdminEmail:{
        type:String,
        required:true,
        trim: true,
        unique: true,
    },
    AdminPass:{
        type:String,
        required:true
    },
    
    SuperAdmin_Display_name:{
        type:String,
        required:true, 
    },
    
    SuperAdmin_langauge:{
        type:String,
        required:true,
    },
    
    SuperAdmin_timeZone:{
        type:String,
        required:true,
    },
    SuperAdmin_timeFormat:{
        type:String,
        required:true,
    },
     
    SuperAdmin_dateFormat:{
        type:String,
        required:true,
    },
    AdminData:[{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"Admin" 
    }],
   
    TimeOfLogin:{
        type : Date, 
        default: Date.now 

     },
},


)

const superAdmin_schema = mongoose.model("SuperAdmin", SuperAdminSchema);
module.exports={ superAdmin_schema}
