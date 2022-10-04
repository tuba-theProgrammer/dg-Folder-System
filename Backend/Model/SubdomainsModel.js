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
   }



})



const subdomain_schema = mongoose.model("SubdomainPackage", SubdomainSchema);
module.exports={ subdomain_schema}