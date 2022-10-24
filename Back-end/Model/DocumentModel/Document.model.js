const mongoose = require("mongoose");

const DocumentSchema=new mongoose.Schema({
 
    User_ID:{
        type:String,
        required:true,
    },
    DocumentName:{
        type:String,
        required:true,
    },
    Folder_ID:{
        type:String,
        required:true,
    },
    DocumentLink:{
        type:String,
        required:true, 
    }

},{
    timestamps:true
})



const Document_Schema = mongoose.model("Documents", DocumentSchema);
module.exports={ Document_Schema}

