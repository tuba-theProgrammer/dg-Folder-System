const {superAdmin_schema} = require('../Model/SuperAdminModel')
const {Otp_schema} = require('../Model/OtpModel')


const superAdminSignIn = async (req,res)=>{
    
    const {SuperAdminEmail,SuperAdminPass}= req.body
    
    if(SuperAdminEmail.length>0 && SuperAdminPass.length>0){
       const data = {
        SuperAdminEmail: SuperAdminEmail,
            SuperAdminPass:SuperAdminPass
        };

    await superAdmin_schema.findOne(data,(err,user)=>{
        if(err){
           res.json({
               status: 0,
               message: "Error finding given Super Admin account"
           })
        }
        
        if(!user){
           res.json({
               status: 0,
               msg: "not such super admin found"
           });
        }

        res.json({
           status: 1,
           id: user._id,
           message: " super admin Account login Successfully"
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


const SuperAdminResetPass = async (req,res)=>{
    let data = await superAdmin_schema.findOne({SuperAdminEmail:req.body.SuperAdminEmail})
    const responseType = {}

    if(data){
        let otpCode = Math.floor((Math.random()*10000+1))
        let otpData = new Otp_schema({
            email:req.body.SuperAdminEmail,
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


const SuperAdminChangePassword = async(req,res)=>{
    let data = await Otp_schema.find({email:req.body.email,code: req.body.otpCode})
    const response={}
     
    if(data){
       let currentTime = new Date().getTime()
       let diff = data.expireIn - currentTime
        
       if(diff<0){
        response.message = "Token Expire"
        response.statusText= 'error'

       }else{
         await superAdmin_schema.findOne({
            SuperAdminEmail:req.body.SuperAdminEmail
         })
       }

    }else{
        response.message = "Invalid Otp"
        response.statusText = "error"
    }


    res.status(200).json(response)

}


module.exports = {superAdminSignIn,SuperAdminChangePassword,SuperAdminResetPass}