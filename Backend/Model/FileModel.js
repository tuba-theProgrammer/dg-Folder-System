const mongoose = require("mongoose")

const FileSchema= new mongoose.Schema({
   
  

    FileName:{
        type:String,
        required:true,
    },
    
    FileSize:{
        type:String,
        required:true,
    },

    FileOwner:{
        type:String,
        required:true,
    },
    
    File_createdDate:{
        type:String,
        required:true,
    },
     
   numberOfDownloads:{
    type:Number,
    required:true,
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

  PermissibleInheritance:{
        type:Boolean,
        default:true,
  }

})

const File_schema = mongoose.model("Files", FileSchema);
module.exports={File_schema}

