const mongoose = require("mongoose");

const RolesSchema=new mongoose.Schema({
   
    RoleName:{
        type:String,
        required:true,
    },
   
    Roles_AddedBy_ID:{
        type:String,
        required:true,
    },

    Roles_TableName:{
        type:String,
        required:true,
    },

    RoleType:[{
       type:Array,
       default:[]
    }]

},{
    timestamps:true
})


const Roles_schema = mongoose.model("Roles", RolesSchema);
module.exports={ Roles_schema}

