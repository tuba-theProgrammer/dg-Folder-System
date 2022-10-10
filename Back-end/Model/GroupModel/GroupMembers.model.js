const mongoose = require("mongoose");

const GroupMembersSchema=new mongoose.Schema({
   

     GroupID:{
        type:String,
        required:true,
       },

       UserID:{
        type:String,
        required:true,
       },

},
{
    timestamps:true
}

)


const GroupMember_schema = mongoose.model("GroupMembers", GroupMembersSchema);
module.exports={ GroupMember_schema}

