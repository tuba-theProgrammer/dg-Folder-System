const mongoose = require("mongoose");


const OrgaThemeSchema=new mongoose.Schema({

    themeLogo:{
        type:String,
        required:true
    },


   themeTitle:{
        type:String,
        required:true
    },

    themeColor:{
        type:String,
        required:true
    },
   
    theme_createdBy:{
            type:String,
            required:true
    },

    theme_createBy_ID:{
        type:String,
        required:true
    }

},
{timestamps:true}
)


const OrganizationTheme_schema = mongoose.model("Organization_Theme", OrgaThemeSchema);
module.exports={ OrganizationTheme_schema}

