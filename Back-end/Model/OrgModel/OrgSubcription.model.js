const mongoose = require("mongoose");


const Package_SubcriptionSchema=new mongoose.Schema({
    
    OrgID:{
        type:String,
        required:true
    },

    PackageTitle:{
        type:String,
        required:true
    },

    PackageStorage:{
        type:String,
        required:true,
    },
    // resailer or retainer
    PackageStatus:{
        type:String,
        required:true,
    },


    PackagePrice:{
        type:String,
        required:true,
    },
    
    // either monthly or yearly
    SubcriptionType:{
        type:String,
        required:true,
    },
    
    Data_Time_OfSubcription:{
            type:Date,
            required:true,
        
    },

    SubcriptionStatus:{
        type:Boolean,
        default:true
    }


})


const Package_and_Subcription_schema = mongoose.model("organization_subcription", Package_SubcriptionSchema);
module.exports={ Package_and_Subcription_schema}

