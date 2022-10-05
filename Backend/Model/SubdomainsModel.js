const mongoose = require("mongoose");

const SubdomainSchema=new mongoose.Schema({
   sitename:{
    type:String,
    unique:true,
    required:true, 
   },
   
   owner_name:{
    type:String,
    required:true, 
   },

   owner_email:{
    type:String,
    required:true, 
   },
  
   site_username:{
    type:String,
    required:true,
   },

   site_pass:{
    type:String,
    required:true,
   },
   
   site_storage_limit:{
    type:String,
    required:true,

   },

   site_status:{
     type:Boolean,
    default:true,
   },

   TimeOfLogout:{
    type : Date, 
    default: Date.now 
   
 },


 TimeOfLogin:{
    type : Date, 
    default: Date.now 

 },


 ListOfGroups:[{
    type:mongoose.Schema.Types.ObjectId,
    required: true,
    ref:"Groups" 
 }],


 ListOfUsers:[{
    type:mongoose.Schema.Types.ObjectId,
    required: true,
    ref:"Users" 
 }]

})



const subdomain_schema = mongoose.model("Subdomain_site", SubdomainSchema);
module.exports={ subdomain_schema}
