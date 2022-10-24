const mongoose = require("mongoose");

const SitesSchema=new mongoose.Schema({
    siteName:{
        type:String,
        required:true,
       },
      Org_Id:{
        type:String,
        required:true,
        },

       ownerName:{
        type:String,
        required:true,
       },

      ownerEmail:{
        type:String,
        required:true,
       },
       SiteUsername:{
        type:String,
        required:true,
       },
       SitePass:{
        type:String,
        required:true,
       },
       
   
       // admin can enable and disable site
       Site_Status:{
        type:Boolean,
        default:true
       },
      
},
{ timestamps: true }

)


SitesSchema.method("toJSON", function() {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});


const Sites_schema = mongoose.model("Site", SitesSchema);
module.exports={ Sites_schema}

