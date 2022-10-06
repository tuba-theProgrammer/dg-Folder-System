const mongoose = require("mongoose");

const BannerSchema= mongoose.Schema({
    
    bannerTitle:{
        type:String,
    },

    bannerImage:{
        type:String,
        default:'',
    },

    bannerVideo:{
        type:String,
        default:'',
    },
    bannerDescription:{
        type:String,
        default:'',
    },


})

const banner_schema= mongoose.model("Banner", BannerSchema);
module.exports={ banner_schema}
