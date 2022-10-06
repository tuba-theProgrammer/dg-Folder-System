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
        type:Date,
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
        type:Date,
        default:Date.now

     },

     AccessedFolders:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Folders" 
     }],

     User_langauge:{
        type:String,
        default:"English"
    },
    
    User_timeZone:{
        type:String,
        default: Date.now
    },
    User_timeFormat:{
        type:String,
        default:() => new Date(+new Date() + 7*24*60*60*1000)
    },
     
    User_dateFormat:{
        type:String,
        default:"YYYY-MM-DD hh:mm:ss"
    },

})


const Users_schema = mongoose.model("Users", UserSchema);
module.exports={Users_schema}


   
  
