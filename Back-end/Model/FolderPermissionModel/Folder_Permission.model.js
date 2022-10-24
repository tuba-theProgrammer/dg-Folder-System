const mongoose = require("mongoose");

const FolderPermissionSchema=new mongoose.Schema({
 
    User_ID:{
        type:String,
        required:true,
    },
    FolderName:{
        type:String,
        required:true,
    },
    Previous_Folder_ID:{
        type:String,
        required:true,
    }

},{
    timestamps:true
})



const FolderPermission_Schema = mongoose.model("FolderPermission", FolderPermissionSchema);
module.exports={ FolderPermission_Schema}

