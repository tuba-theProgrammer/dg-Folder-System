const {Admin_schema} = require('../Model/AdminModel')
const {Otp_schema} = require('../Model/OtpModel')

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
    const {AdminEmail,AdminPass,Admin_Display_name,Admin_StorageLimit} = req.body 
    console.log('Account Create Data',{AdminEmail,AdminPass,Admin_Display_name,Admin_StorageLimit})
    try{

        const AdminAccount=await Admin_schema.create({AdminEmail,AdminPass,Admin_Display_name,Admin_StorageLimit})
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

const EditAdminAccount= async (req,res)=>{
   
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
  
    await admin_schema.findOneAndRemove(AdminId)
    const AdminData=await auth_schema.find()
    res.status(200).send(
        AdminData
    )
}

const AdminResetPass = async (req,res)=>{
    let data = await Admin_schema.findOne({AdminEmail:req.body.AdminEmail})
    const responseType = {}

    if(data){
        let otpCode = Math.floor((Math.random()*10000+1))
        let otpData = new Otp_schema({
            email:req.body.AdminEmail,
            code:otpCode,
            expireIn: new Data().getTime() + 300*1000
        })

         await otpData.save();
        responseType.statusText = 'Success'
        responseType.message= "Please check your email for otp verification"

    }else{
        responseType.statusText = 'error'
        responseType.message= "Email id does not exits"

    }

    res.status(200).json(responseType)
}


const AdminChangePassword = async(req,res)=>{
    let data = await Otp_schema.find({email:req.body.email,code: req.body.otpCode})
    const response={}
     
    if(data){
       let currentTime = new Date().getTime()
       let diff = data.expireIn - currentTime
        
       if(diff<0){
        response.message = "Token Expire"
        response.statusText= 'error'

       }else{
         await Admin_schema.findOne({
            AdminEmail:req.body.AdminEmail
         })
       }

    }else{
        response.message = "Invalid Otp"
        response.statusText = "error"
    }


    res.status(200).json(response)

}



module.exports = {AdminSignIn,AdminCreateAccount,EditAdminAccount,AdminSelfUpdateSettings,ViewOneAdmin,ViewAllAdmins,DeleteAdminAccount,AdminResetPass,AdminChangePassword}






