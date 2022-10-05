const mongoose = require("mongoose")

const UserSchema= new mongoose.Schema({
    Username:{
        type:String,
        required:true,
    },

    DisplayName:{
        type:String,
        required:true,
    },
    User_email:{
        type:String,
        required:true,
    },
    UserPass:{
        type:String,
        required:true,
    },
    
    User_Role:{
        type:String,
        default:"User",
    },

     Access_expirationDate:{
        typ0e:Date,
        required:true,
     },
     
     PermissionType:{
        type:String,
        default:"read",
     },
     
     // sites can enable and disable user
     UserStatus:{
        type:Boolean,
        default:true
     },

    
     User_last_login:{
        type:String,
     },

     AccessedFolders:[{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"Folders" 
     }],

     User_langauge:{
        type:String,
        required:true,
    },
    
    User_timeZone:{
        type:String,
        required:true,
    },
    User_timeFormat:{
        type:String,
        required:true,
    },
     
    User_dateFormat:{
        type:String,
        required:true,
    },


})


const Users_schema = mongoose.model("Users", UserSchema);
module.exports={Users_schema}


   
  
