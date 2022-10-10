const mongoose = require("mongoose");

const SuperAdminSchema=new mongoose.Schema({
       AdminEmail:{
        type:String,
        required:true,
       },
    
       AdminPass:{
        type:String,
        required:true,
       },

     
       AdminTotalStorage:{
       type:String,
        required:true,
       },

       


},{

    timestamps:true
}
)


const SuperAdmin_schema = mongoose.model("SuperAdmin", SuperAdminSchema);
module.exports={ SuperAdmin_schema}

