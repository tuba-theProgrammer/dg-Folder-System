const mongoose = require("mongoose");

const SitesSchema=new mongoose.Schema({
    siteName:{
        type:String,
        required:true,
       },

       ownerName:{
        type:String,
        required:true,
       },

      ownerEmail:{
        type:String,
        required:true,
       },
       SiteUsername:{
        type:String,
        required:true,
       },
       SitePass:{
        type:String,
        required:true,
       },
       
       Site_StorageLimit:{
        type:Number,
        required:true,
       },
        
       // admin can enable and disable site
       Site_Status:{
        type:Boolean,
        default:true
       },
      
},
{ timestamps: true }

)


const Sites_schema = mongoose.model("Sites", SitesSchema);
module.exports={ Sites_schema}

