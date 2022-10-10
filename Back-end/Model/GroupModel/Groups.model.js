const mongoose = require("mongoose");

const GroupsSchema=new mongoose.Schema({

    GroupName:{
        type:String,
        required:true,
       },

    Added_By_ID:{
        type:String,
        required:true,
       },

       OrgID:{
        type:String,
        required:true,
       },

       Group_TableName:{
        type:String,
        required:true,
       },
       
    
      
},{
    timestamps:true
}
)


const Groups_schema = mongoose.model("Groups", GroupsSchema);
module.exports={ Groups_schema}

