const mongoose = require("mongoose");


const AdminSchema=new mongoose.Schema({
  
   
   AdminEmail:{
    type:String,
    required:true,
    trim: true,
    unique: true,
   },
   AdminPass:{
    type:String,
    required:true,
    trim: true,
    unique: true,
   },
    
   AdminAccessRoles:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"AccessRequest" 
   },
   
   Admin_Display_name:{
    type:String,
    required:true, 
},

Admin_langauge:{
    type:String,
    required:true,
},

Admin_timeZone:{
    type:String,
    required:true,
},
Admin_timeFormat:{
    type:String,
    required:true,
},
 
Admin_dateFormat:{
    type:String,
    required:true,
},

Subcribe_packages:[{
    type:mongoose.Schema.Types.ObjectId,
    required: true,
    ref:"SubscriptionPackage" 
}],

site_storage_limit:{
    type:String,
    required:true,
   }



 
},)

const Admin_schema = mongoose.model("Admin", AdminSchema);
module.exports={ Admin_schema}
