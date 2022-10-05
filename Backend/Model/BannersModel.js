const mongoose = require("mongoose");

const BannerSchema= mongoose.Schema({
    
    bannerTitle:{
        type:String,
         
    },

    bannerImage:{
        type:String,
        required:true, 
    },

    bannerVideo:{
        type:String,
        required:true, 
    },
    bannerDescription:{
        type:String,
        required:true, 
    },


})

const banner_schema= mongoose.model("Banner", BannerSchema);
module.exports={ banner_schema}
