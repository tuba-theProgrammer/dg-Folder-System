const mongoose = require("mongoose");

const SubcriptionSchema=new mongoose.Schema({
   
    sub_packageId:{
        type:String,
        required:true,
    },
    org_id:{
        type:String,
        required:true,
    },

    sub_startDate:{
        type:Date,
        default: Date.now
    },
    sub_EndDate:{
        type:Date,
        required:true,
    },
    
    // admin can enable and disable subcription
    subStatus:{
        type:Boolean,
        default:true,
    },

},{
    timestamps:true
})


const Subcription_schema = mongoose.model("Subcriptions", SubcriptionSchema);
module.exports={ Subcription_schema}

