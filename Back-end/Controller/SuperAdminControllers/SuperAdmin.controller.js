const SuperAdmin_schema= require('../../Model/SuperAdminModel/SuperAdmin.model')
const Otp_schema = require('../../Model/OtpModel/Otp.model')

const SuperAdminSignIn= async (req,res)=>{
    
    const {AdminEmail,AdminPass}= req.body
    console.log("super admin req body data ",req.body)
     
    const Data={
       AdminEmail:AdminEmail,
       AdminPass:AdminPass
    }

    await SuperAdmin_schema.findOne(Data,(err,user)=>{
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

}




const SuperAdmin_ResetPassword= async(req,res)=>{
   
    let SuperAdmindata = await SuperAdmin_schema.findOne({AdminEmail:req.body.AdminEmail})
    const responseType = {}
    
    if(SuperAdmindata){
        let otpCode = Math.floor((Math.random()*10000+1))
        let otpData = new Otp_schema({
            Email:req.body.AdminEmail,
            Code:otpCode,
            ExpireIn: new Data().getTime() + 300*1000,
            PersonId: SuperAdmindata.id
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



const SuperAdmin_ChangePassword= async (req,res)=>{
    
    const {PersonId,Email,Code}= req.body
    
    
   
    let Otpdata = await Otp_schema.find({PersonId,Email,Code})
    const response={}
     
    if(Otpdata){
       let currentTime = new Date().getTime()
       let diff = Otpdata.expireIn - currentTime
        
       if(diff<0){
        response.message = "Token Expire"
        response.statusText= 'error'

       }else{
        response.message = "Otp receive successfully"
        response.statusText= 'success'
       }
      
    }else{
        response.message = "Invalid Otp"
        response.statusText = "error"
    }


    res.status(200).json(response)

}








module.exports = {SuperAdminSignIn,SuperAdmin_ResetPassword, SuperAdmin_ChangePassword}