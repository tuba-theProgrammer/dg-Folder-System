const {Admin_schema} = require('../Model/AdminModel')

const AdminSignIn = async (req,res)=>{
    
    const {AdminEmail,AdminPass}= req.body
    
    if(AdminEmail.length>0 && AdminPass.length>0){
        data = {
            AdminEmail: AdminEmail,
            AdminPass:AdminPass
        };

    await Admin_schema.findOne(data,(err,user)=>{
        if(err){
           res.json({
               status: 0,
               message: "Error finding given User"
           })
        }
        
        if(!user){
           res.json({
               status: 0,
               msg: "not such user found"
           });
        }

        res.json({
           status: 1,
           id: user._id,
           message: " Account login Successfully"
       });
   }
   
   )
    }else{
        res.json({
            status: 0,
            message: "Data must be greater than zero/ invalid Fields"
        });
    }



}

const AdminCreateAccount = async (req,res)=>{
     
}

const AdminUpdateAccount = async (req,res)=>{

}

const ViewAllAdmins = async (req,res)=>{

}

const DeleteAdminAccount = async (req,res)=>{

}

const AdminResetPass = async (req,res)=>{

}



module.exports = {AdminSignIn,AdminCreateAccount,AdminUpdateAccount,ViewAllAdmins,DeleteAdminAccount,AdminResetPass}






