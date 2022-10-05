const mongoose = require("mongoose");

const ProductSchema=new mongoose.Schema({
     
    productTitle:{
        type:String,
        required:true,
        trim: true,
        unique: true,
    },

    ListOfSites:[{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"Subdomain_site" 
    }],

})


const Product_schema = mongoose.model("Products", ProductSchema);
module.exports={Product_schema}

