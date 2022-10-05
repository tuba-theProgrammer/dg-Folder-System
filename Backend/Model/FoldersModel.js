const mongoose = require("mongoose")

const FolderSchema= new mongoose.Schema({
   
  

    FolderName:{
        type:String,
        required:true,
    },
    
    FolderSize:{
        type:String,
        required:true,
    },

    FolderOwner:{
        type:String,
        required:true,
    },
    
    Folder_createdDate:{
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
  },
  

  ListOfFiles:[{
    type:mongoose.Schema.Types.ObjectId,
    required: true,
    ref:"Files" 
  }],

  AccessRights:{
    type:String,
    default:"read",
  },

  Folder_ipAddress:{
    type:String,
  },
   
  Folder_activityDate:{
    type : Date, 
    default: Date.now 
  },

  


},
{
    timestamps:true
}
)

const Folder_schema = mongoose.model("Folders", FolderSchema);
module.exports={Folder_schema}
