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
        default: () => ({}),
        ref:"AccessRequest" 
   },
   
   Admin_Display_name:{
    type:String,
    required:true, 
},

  Admin_StorageLimit:{
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
    default:() => new Date(+new Date() + 7*24*60*60*1000)
},
 
Admin_dateFormat:{
    type:String,
    default:"YYYY-MM-DD hh:mm:ss"
},

Subcribe_packages:[{
    type:mongoose.Schema.Types.ObjectId,
    default: () => ({}),
    ref:"SubscriptionPackage" 
}],


  
   ManageBanners:[{
    type:mongoose.Schema.Types.ObjectId,
    default: () => ({}),
    ref:"Banner" 
}],


  ListOfProduct:[{
    type:mongoose.Schema.Types.ObjectId,
    default: () => ({}),
    ref:"Products" 
  }],
   

  BrandAndTheme:{
    type:mongoose.Schema.Types.ObjectId,
    default: () => ({}),
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
 
},{
    timestamps: true,
},)

const Admin_schema = mongoose.model("Admin", AdminSchema);
module.exports={ Admin_schema}
