const mongoose = require("mongoose");

const GroupSchema=new mongoose.Schema({
    
    GroupName:{
        type : String, 
        required:true 
    },
    ListOfUsers:[{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"Products" 
    }]
   
})


const Group_schema = mongoose.model("Groups", GroupSchema);
module.exports={ Group_schema}
