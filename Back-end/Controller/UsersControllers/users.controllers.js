const UserSchema = require('../../Model/UserModel/Users.models')
const User = UserSchema.User_schema
const Otp_schema = require('../../Model/OtpModel/Otp.model')
const OTP = Otp_schema.Otp_schema
const { generateOTP } = require('../../Utils/Services/Otp')
const { sendMail } = require('../../Utils/Services/Mail')

const CreateUser= async(req,res)=>{

    const {UserEmail,UserDisplayName,Org_ID,Site_ID,Folder_Permission_ID,Role_ID,UserName,UserPass,created_by_ID,Created_By} = req.body;
    if (!req.body.UserName) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
      }
        console.log("create User req body data ",req.body)
       
    const Response ={}
            const user= new User({
               UserEmail,
               UserDisplayName,
               Org_ID,
               Site_ID,
               Folder_Permission_ID,
               Role_ID,
               UserName,
               UserPass,
               created_by_ID,
               Created_By
          })
      
          // save User into database   
      user.save(user)
        .then(data => {
          Response.UserResponse = data
          console.log(data)
         
         res.status(200).send({
           Response
         }
         )

        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the User."
          });
        });
  
}


const LoginUser = async(req,res)=>{
    console.log("User SignIn Call")
    console.log("User req body ", req.body)
  //  Validate request
  if (!req.body.username) {
   res.status(400).send({ message: "Content can not be empty!" });
   return;
 }
     console.log("User req body data ",req.body)


      User.findOne({
          UserName: req.body.username,
     })
       .exec((err, user) => {
         if (err) {
           res.status(500).send({ message: err });
           return;
         }
   
         if (!user) {
           return res.status(404).send({ message: "User Not found." });
         }

         if(user.UserPass== req.body.pass){
          res.status(200).send({
            id: user.id,
            username: user.UserName,
            pass:user.UserPass,
            email: user.UserEmail,
          });
         }else{
          res.status(500).send(
             "Incorrect Username and pass"
            );
         }
       
       });


}

const DeleteUser = async(req,res)=>{
    const {id} = req.body;
    console.log(id)
  
    User.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete User with id=${id}. Maybe User was not found!`
          });
        } else {
          res.send({
            message: "User was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete User with id=" + id
        });
      });
}


const UpdateUserProfile =async(req,res)=>{
    const {id,UserEmail,UserDisplayName}= req.body
     
    User.findByIdAndUpdate(id, {
        UserEmail,
        UserDisplayName
    })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User data with id=${id}. Maybe User was not found!`
        });
      } else res.send(
        {
        
         message: "User data was updated successfully.",
         data
     });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });  
}

const displayAllUser = async(req,res)=>{
    const UserData =  await User.find();
    console.log(UserData)
    res.status(200).send(
       UserData)  
}


const UserChangePass = async(req,res)=>{
   
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
         
      
        User.updateOne({_id:PersonId},{$set: {UserPass: newPass}})
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update User Pass with id=${PersonId}. Maybe User was not found!`
            });
          } else{ res.send(
            {
             message1: response.message,
             status: response.statusText,
             message: "User was updated successfully.",
             data
         });
        }
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating User Pass with id=" + PersonId
          });
        });
        
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



const UserResetPass = async(req,res) =>{

    let Userdata = await  User.findOne({ UserEmail:req.body.Email})
    const responseType = {}
    const generatedOtp = generateOTP();
  
    console.log('Generated Otp',generateOTP)
  
    if(Userdata){
            let otpData = new OTP({
            Email:req.body.Email,
            Code: generatedOtp,
            ExpireIn: new Date().getTime() + 300*1000,
            PersonId:Userdata.id
        })
        console.log(Userdata.id)
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



const ViewProfileData = async (req,res)=>{
    const {id} = req.body
  const Data = await User.findById(id)
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



const ManageUserRole= async(req,res)=>{
   const {id,
    newRoleId} = req.body
  
    
    User.updateOne({_id:id}, {
      $set:{Role_ID:newRoleId}
    })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User Role  data with id=${id}. Maybe  User was not found!`
        });
      } else res.send(
        {
        
         message: "User Role updated successfully.",
         data
     });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User Role with id=" + id
      });
    });


}


const LogOutUser= async (req,res)=>{

}


module.exports= {
    LoginUser,
    DeleteUser,
    CreateUser,
    UpdateUserProfile,
    displayAllUser,
    UserChangePass,
    UserResetPass,
    LogOutUser,
    ViewProfileData,
    ManageUserRole
}