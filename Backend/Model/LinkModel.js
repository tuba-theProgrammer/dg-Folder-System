const mongoose = require("mongoose")

const LinkSchema= new mongoose.Schema({
 
     sharedTo_name:{
        type:String,
        required:true
     },

     downloadLimit:{
        type:String,
        required:true
     },

     expirationDate:{
        type:String,
        required:true
     },

     LinkPassword:{
        type:String,
        required:true
     },

     TimeOfViewed:{
        type : Date, 
        default: Date.now 

     },
     
     TimeOfWritten:{
        type : Date, 
        default: Date.now 

     },

     TimeOfCreated:{
        type : Date, 
        default: Date.now 

     },
    
   

})


const link_schema = mongoose.model("Links", LinkSchema);
module.exports={link_schema}

