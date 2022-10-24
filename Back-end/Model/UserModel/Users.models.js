const mongoose = require("mongoose");


const UserSchema=new mongoose.Schema({
    
    UserDisplayName:{
        type:String,
        required:true
    },

    UserEmail:{
        type:String,
        required:true
    },

    Org_ID:{
        type:String,
        required:true
    },

    Site_ID:{
        type:String,
        required:true
    },

    Folder_Permission_ID:{
        type:String,
        required:true
    },

    Role_ID:{
        type:String,
        required:true
    },

    UserName:{
        type:String,
        required:true
    },

    UserPass:{
        type:String,
        required:true
    },

    UserStatus:{
        type:Boolean,
        default:true
    },

     created_by_ID:{
        type:String,
        required:true
     },

     Created_By:{
        type:String,
        required:true
     }

},{
    timestamps:true
})

UserSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

const User_schema = mongoose.model("Users", UserSchema);
module.exports={ User_schema}

