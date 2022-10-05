const mongoose = require("mongoose");


const PackageSchema=new mongoose.Schema({
   Package_title:{
    type:String,
    unique:true,
    required:true, 
   },

Storage:{
    type:String,
    required:true,
},

status:{
    type:String,
    required:true,
},

package_price:{
    type:String,
    required:true,
},

subcriptionType:{
    type:String,
    required:true,
},

subcription_Status:{
    type:Boolean,
    default:false,
 },

subcription_expire_date:{
    type:String,
    required:true, 
},

subcription_renew_date:{
    type:String,
    required:true, 
},

 



})



const package_schema = mongoose.model("SubscriptionPackage", PackageSchema);
module.exports={ package_schema}
