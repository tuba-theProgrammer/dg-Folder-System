const mongoose = require("mongoose");

const BrandThemeSchema = new mongoose.Schema({
   
    BrandLogo:{
        type:String,
        required:true,
    },
    
    BrandTitle:{
        type:String,
        required:true,
    },

    BrandColor:{
        type:String,
        required:true,
    }

})

const BrandTheme_scheme = mongoose.model("Brand_and_theme",BrandThemeSchema);
module.exports={BrandTheme_scheme}