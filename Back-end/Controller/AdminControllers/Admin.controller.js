const schema= require('../../Model/AdminModel/Admin.model')
const Admin = schema.Admin_schema 
const Otp_schema = require('../../Model/OtpModel/Otp.model')
const OTP = Otp_schema.Otp_schema
const { generateOTP } = require('../../Utils/Services/Otp')
const { sendMail } = require('../../Utils/Services/Mail')


const createSuperAdmin = async (req,res)=>{
   
    console.log("create Admin Call")
   
    
    const admin= new Admin({
        AdminEmail:"tubarajput92@gmail.com",
        AdminPass:"12345678",
        AdminUsername:"tubaAsif",
        AdminProfileImage:"/image",
        AdminDisplayName:"tuba asif"
    })

    // save admin into database

admin.save(admin)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Admin."
    });
  });
   
   
}


const AdminSignIn= async (req,res)=>{
    console.log("Admin SignIn Call")
   //  Validate request
   if (!req.body.username) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
      console.log("super admin req body data ",req.body)


       Admin.findOne({
        AdminUsername: req.body.username,
      })
        .exec((err, user) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
    
          if (!user) {
            return res.status(404).send({ message: "Admin Not found." });
          }
          console.log("here is admin pass ",user.AdminPass)

          if(user.AdminPass== req.body.pass){
            res.status(200).send({
                id: user._id,
                username: user.AdminUsername,
                email: user.AdminEmail,
                image: user.AdminProfileImage
              });
          }else{
            res.status(500).send(
                "Incorrect Username and pass"
               );
          }
          
        });
    }




const Admin_ResetPassword= async(req,res)=>{
   
    let SuperAdmindata = await Admin.findOne({AdminEmail:req.body.Email})
    const responseType = {}
    const generatedOtp = generateOTP();
    console.log('Generated Otp',generateOTP)
    if(SuperAdmindata){
            let otpData = new OTP({
            Email:req.body.Email,
            Code: generatedOtp,
            ExpireIn: new Date().getTime() + 300*1000,
            PersonId: SuperAdmindata.id
        })
        console.log(SuperAdmindata.id)
         otpData.save(otpData).then(data => {
        responseType.DbCheck = 'Otp Data saved'
  
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while saving the otp"
            });
          });

          try {
            await sendMail({
              to:req.body.Email,
              OTP:generatedOtp,
            });
            responseType.statusText = 'Success'
            responseType.message= "Please check your email for otp verification"
    
          } catch (error) {
        responseType.statusText = 'Failed'
        responseType.message= 'Unable to Send OTP, Please try again later'

          }


    }else{
        responseType.statusText = 'error'
        responseType.message= "Email id does not exits"

    }

    res.status(200).json(responseType)
}



const Admin_ChangePassword= async (req,res)=>{
  
    const {PersonId,Email,Code,newPass}= req.body
 
    let Otpdata = await OTP.find({PersonId,Email,Code})
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
         
        const AdminData = await Admin.findById(PersonId)
        console.log(AdminData)
        

        Admin.findByIdAndUpdate(PersonId, {
            AdminEmail:AdminData.AdminEmail,
            AdminPass:newPass,
            AdminUsername: AdminData.AdminUsername,
            AdminProfileImage:AdminData.AdminProfileImage
        })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update Admin Pass with id=${AdminData.id}. Maybe Admin was not found!`
            });
          } else res.send(
            {
             message1: response.message,
             status: response.statusText,
             message: "Admin pass changes successfully.",
            id: AdminData.id,
            username: AdminData.AdminUsername,
            pass:AdminData.AdminPass,
            email: AdminData.AdminEmail,
            image: AdminData.AdminProfileImage
         });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating Admin Pass with id=" + AdminData.id
          });
        });
 


        // now also change pass in login details
        
       }
      
    }else{
            response.message = "Invalid Otp"
            response.statusText = "error"
        res.status(500).send({
             message:response.message,
             status:response.statusText
          });
     
    }


}




const UpdateAdminProfile = async (req,res)=>{
    const {id,profileImage,displayName}= req.body
     
    Admin.findByIdAndUpdate(id, {
        AdminDisplayName: displayName,
        AdminProfileImage:profileImage
    })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Admin data with id=${id}. Maybe Admin was not found!`
        });
      } else res.send(
        {
        
         message: "Admin data was updated successfully.",
        id: data.id,
        username: data.AdminUsername,
        pass:data.AdminPass,
        email: data.AdminEmail,
        image: data.AdminProfileImage,
     });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Admin with id=" + id
      });
    });
}

const ViewProfileData = async (req,res)=>{
    const {id} = req.body
  const Data = await Admin.findById(id)
  if(Data){
  res.status(200).send({
    Data,
    message:"Data Found Successfully"
  });
}else{
  res.status(500).send({
    message:"Error Finding Data"
  });
}
}


const LogOutAdmin= async (req,res)=>{

}



module.exports = {createSuperAdmin,
    AdminSignIn,
    Admin_ResetPassword,
     Admin_ChangePassword,
     UpdateAdminProfile,
     LogOutAdmin,
    ViewProfileData}