const mongoose = require("mongoose");

const Organization_BannerSchema=new mongoose.Schema({
    OrgID:{
        type:String,
        required:true,
    },
    OrgBannerLogo:{
        type:String,
        required:true,
    },
    OrgBannerTitle:{
        type:String,
        required:true,
    },
    
    OrgBanner_image:{
        type:String,
        required:true,
    },

    OrgBanner_video:{
        type:String,
        required:true,
    },

    OrgBanner_description:{
        type:String,
        required:true,
    }

},{

    timestamps:true
})


const OrgBanner_schema = mongoose.model("Organization_banner", Organization_BannerSchema);
module.exports={ OrgBanner_schema}

