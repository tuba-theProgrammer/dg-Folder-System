const mongoose = require("mongoose");

const PermissionSchema=new mongoose.Schema({
    PermissionName:{
        type:String,
        required:true,
    },
    PermissionAdded_By_Id:{
        type:String,
        required:true,
    },
 

},{
    timestamps:true
})


const Permission_schema = mongoose.model("Permissions", PermissionSchema);
module.exports={ Permission_schema}

