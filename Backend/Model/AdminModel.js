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
    default:"English"
},

Admin_timeZone:{
    type:Date,
    default: Date.now
  
},
Admin_timeFormat:{
    type:String,
    
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


  
   ManageBanners:[{
    type:mongoose.Schema.Types.ObjectId,
    required: true,
    ref:"Banner" 
}],


  ListOfProduct:[{
    type:mongoose.Schema.Types.ObjectId,
    required: true,
    ref:"Products" 
  }],
   

  BrandAndTheme:{
    type:mongoose.Schema.Types.ObjectId,
    required: true,
    ref:"Brand_and_theme" 
  },
   

  TimeOfLogin:{
    type : Date, 
    default: Date.now 

 },

 TimeOfLogout:{
    type : Date, 
    default: Date.now 

 },
  
  
 
},)

const Admin_schema = mongoose.model("Admin", AdminSchema);
module.exports={ Admin_schema}
