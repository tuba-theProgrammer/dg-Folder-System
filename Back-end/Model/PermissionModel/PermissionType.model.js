const mongoose = require("mongoose");

const PermissionTypeSchema=new mongoose.Schema({

   PermissionID:{
    type:String,
    required:true,
   },
   
   PermissionName:{
    type:String,
    required:true,
   },
},{

    timestamps:true
})


const PermissionType_schema = mongoose.model("PermissionTypes", PermissionTypeSchema);
module.exports={ PermissionType_schema}

