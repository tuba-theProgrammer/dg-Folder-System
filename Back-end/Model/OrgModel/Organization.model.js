const mongoose = require("mongoose");


const OrganizationSchema=new mongoose.Schema({

    OrganizationEmail:{
        type:String,
        required:true
    },

    OrganizationPass:{
        type:String,
        required:true,
    },

    OrganizationLogo:{
        type:String,
        required:true,
    },

    OrganizationTitle:{
        type:String,
        required:true,
    },

    Org_Theme_color:{
        type:String,
        required:true,
    },

    Org_Total_Storage:{
        type:String,
        required:true,
    },

    Organization_Status:{
        type:String,
        required:true,
    },

   
})


const Organization_schema = mongoose.model("Organizations", OrganizationSchema);
module.exports={ Organization_schema}

