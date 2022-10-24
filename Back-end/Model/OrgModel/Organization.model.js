const mongoose = require("mongoose");


const OrganizationSchema=new mongoose.Schema({

    OrganizationEmail:{
        type:String,
        required:true
    },
    OrganizationUsername:{
        type:String,
        required:true
    },

    OrganizationPass:{
        type:String,
        required:true,
    },

    OrganizationTitle:{
        type:String,
        required:true,
    },


    Organization_Status:{
        type:Boolean,
        default:true
    },

    Subcription_Plan_id:{
        type:String,
       },
    
    Organization_theme_id:{
        type:String,
    },
    
    Organization_street:{
        type:String,
        
    },

    Organization_city:{
        type:String,
       
    },
    Organization_country:{
        type:String,
      
    },
   
    Organization_billingAddress:{
        type:String,
      
    },

    Organization_zipCode:{
        type:String,
     
    },
    
    Organization_states:{
        type:String,
      
    },
   
    Organization_privacyPolicy:{
        type:String,
      
    },
    
    Organization_termAndCond:{
        type:String,
       
    },

    

   
},
{timestamps:true}
)

OrganizationSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

const Organization_schema = mongoose.model("Organization", OrganizationSchema);
module.exports={ Organization_schema}

