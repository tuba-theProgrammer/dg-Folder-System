const mongoose = require("mongoose");

const PackageSchema=new mongoose.Schema({

    
    PackageName:{
        type:String,
        required:true,
    },

    PackagePrice:{
        type:String,
        required:true,
    },
    PackageStorage:{
        type:String,
        required:true,
    },
    
    Package_durationTitle:{
        type:String,
        required:true,
    },

    Package_durationDays:{
        type:String,
        required:true,
    },
    
// active or deactive package
     PackageStatus:{
        type:String,
        required:true,
     }

},{
    timestamps:true
})


const Packages_schema = mongoose.model("Packages", PackageSchema);
module.exports={ Packages_schema}

