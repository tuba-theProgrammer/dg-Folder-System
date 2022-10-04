const mongoose = require("mongoose");

const AccessRoleSchema=new mongoose.Schema({

    manageUser:{
        type: Boolean,
        default: false
       },
    
       EditUser:{
        type: Boolean,
        default: false
       },
       
       CreatePublic_Link_and_directory:{
        type: Boolean,
        default: false
       },
    
       MapCloudDrive:{
        type: Boolean,
        default: false
       },
       
       EditSelfProfile:{
        type: Boolean,
        default: false
       },
    
       Access_Application_Menu:{
        type: Boolean,
        default: false
       },
        
       Access_Activity_Section:{
        type: Boolean,
        default: false
       },
       
       Access_Notification_section:{
        type: Boolean,
        default: false
       },
    
       TransferFile_via_unEncrypted_FTP:{ 
        type: Boolean,
        default: false
    },
    
        TransferFile_via_Encrypted_FTP:{
            type: Boolean,
        default: false
        },
    
        storageLimit:{
            type: Boolean,
            default: false
        },
        
        setUserPass_to_Known_value:{
            type: Boolean,
            default: false
        },

        Edit_Articles:{
            type: Boolean,
            default: false
        },
      
        Edit_reseller_Control_panel:{
            type: Boolean,
            default: false
        },

        Access_to_side_administration_billing:{
            type: Boolean,
            default: false
        },


        Number_of_Uploads_per_login:{
            type: Boolean,
            default: false
        },

        Extension_type:{
            type: String,
            default: ".pdf"
        }

      

});


const AccessRequest_schema = mongoose.model("AccessRequest", AccessRoleSchema);
module.exports={ AccessRequest_schema}
