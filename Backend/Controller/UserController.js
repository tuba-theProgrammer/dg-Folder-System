const {Users_schema} = require('../Model/UserModel')
const {Otp_schema} = require('../Model/OtpModel')


const UserSignIn = async (req,res)=>{
    
    const {User_email, UserPass}= req.body
    
    if( User_email.length>0 && UserPass.length>0){
       const data = {
        User_email:User_email,
        UserPass: UserPass
        };

    await Users_schema.findOne(data,(err,user)=>{
        if(err){
           res.json({
               status: 0,
               message: "Error finding given User"
           })
        }
        
        if(!user){
           res.json({
               status: 0,
               msg: "not such User found"
           });
        }

        res.json({
           status: 1,
           id: user._id,
           message: "User Account login Successfully"
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

const UserCreateAccount = async (req,res)=>{
    const {Username, DisplayName,User_email,UserPass,User_Role,Access_expirationDate,PermissionType,UserStatus} = req.body 
    console.log('User Account Create Data', req.body)
    try{

        const UserAccount=await Users_schema.create({Username, DisplayName,User_email,UserPass,User_Role,Access_expirationDate,PermissionType,UserStatus})
        res.status(200).send({
             status:1,
             data:UserAccount,
             message:"User Account created successfully"
            })

    }
    catch(error){
        res.send(error.message)
    }
}


const UserSelfUpdateSettings = async (req,res)=>{
   
}

const EditUser= async (req,res)=>{

}

const ViewOneUser = async (req,res)=>{
    const {id} = req.body
    if(id.length>0){
       const data = {
        id:id
       }
    await Users_schema.findOne(data,(err,user)=>{
        if(err){
           res.json({
               status: 0,
               message: "Error finding given User"
           })
        }
        
        if(!user){
           res.json({
               status: 0,
               msg: "not such User found"
           });
        }

        res.json({
           status: 1,
           id: user._id,
           message: "User Account found successfully"
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

const ViewAllUsers = async (req,res)=>{
    const AllUsersData =  await Users_schema.find();
    console.log(AllUsersData)
    res.status(200).send(
        AllUsersData) 
    


}

const setUserStatus = async (req,res)=>{
   
}



const UserResetPass = async (req,res)=>{
    let data = await Users_schema.findOne({User_email:req.body.User_email})
    const responseType = {}

    if(data){
        let otpCode = Math.floor((Math.random()*10000+1))
        let otpData = new Otp_schema({
            email:req.body.User_email,
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


const UserChangePassword = async(req,res)=>{
    let data = await Otp_schema.find({email:req.body.email,code: req.body.otpCode})
    const response={}
     
    if(data){
       let currentTime = new Date().getTime()
       let diff = data.expireIn - currentTime
        
       if(diff<0){
        response.message = "Token Expire"
        response.statusText= 'error'

       }else{
         await Users_schema.findOne({
            User_email:req.body.User_email
         })
       }

    }else{
        response.message = "Invalid Otp"
        response.statusText = "error"
    }


    res.status(200).json(response)

}




module.exports = {UserSignIn,UserCreateAccount,setUserStatus,UserSelfUpdateSettings,EditUser,ViewOneUser,ViewAllUsers,UserResetPass,UserChangePassword}






