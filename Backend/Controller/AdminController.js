const {Admin_schema} = require('../Model/AdminModel')

const AdminSignIn = async (req,res)=>{
    
    const {AdminEmail,AdminPass}= req.body
    
    if(AdminEmail.length>0 && AdminPass.length>0){
       const data = {
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
    const {AdminEmail,AdminPass,Admin_Display_name} = req.body 
    console.log('Account Create Data', req.body)
    try{

        const AdminAccount=await Admin_schema.create({AdminEmail,AdminPass,Admin_Display_name})
        res.status(200).send({
             status:1,
             data:AdminAccount,
             message:"Account created successfully"
            })

    }
    catch(error){
        res.send(error.message)
    }

}

const AdminSelfUpdateSettings = async (req,res)=>{
   
}

const ViewOneAdmin = async (req,res)=>{
    const {AdminId} = req.body
    if(AdminId.length>0){
       const data = {
        id:AdminId
       }
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
           message: " Account found successfully"
       });
   }
   
   )
}
else{
    res.json({
        status: 0,
        message: "Empty body received"
    });
}
}

const ViewAllAdmins = async (req,res)=>{
    const AllAdminsData =  await Admin_schema.find();
    console.log(AllAdminsData)
    res.status(200).send(
        AllAdminsData) 
    


}

const DeleteAdminAccount = async (req,res)=>{
    const {AdminId}=req.body;
    console.log(AdminId)
  
    await admin_schema.findOneAndDelete(AdminId)
    const AdminData=await auth_schema.find()
    res.status(200).send(
        AdminData
    )
}

const AdminResetPass = async (req,res)=>{

}



module.exports = {AdminSignIn,AdminCreateAccount,AdminSelfUpdateSettings,ViewOneAdmin,ViewAllAdmins,DeleteAdminAccount,AdminResetPass}






