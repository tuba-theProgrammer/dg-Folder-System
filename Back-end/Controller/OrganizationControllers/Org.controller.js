const Org_schema = require('../../Model/OrgModel/Organization.model')
const Organization = Org_schema.Organization_schema
const Otp_schema = require('../../Model/OtpModel/Otp.model')
const OTP = Otp_schema.Otp_schema
const { generateOTP } = require('../../Utils/Services/Otp')
const { sendMail } = require('../../Utils/Services/Mail')


const OrganizationLogin=async (req,res)=>{
     console.log("Organization SignIn Call")

    //  Validate request
    if (!req.body.username) {
     res.status(400).send({ message: "Content can not be empty!" });
     return;
   }
       console.log("Organization req body data ",req.body)
 
 
        Organization.findOne({
          OrganizationUsername: req.body.username,
       })
         .exec((err, user) => {
           if (err) {
             res.status(500).send({ message: err });
             return;
           }
     
           if (!user) {
             return res.status(404).send({ message: "Organization Not found." });
           }

           if(user.OrganizationPass== req.body.pass){
            res.status(200).send({
              id: user.id,
              username: user.OrganizationUsername,
              pass:user.OrganizationPass,
              email: user.OrganizationEmail,
            });
           }else{
            res.status(500).send(
               "Incorrect Username and pass"
              );
           }
         
         });

}



const CreateOrganizationAccount= async (req,res)=>{
  
       if (!req.body.Username) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
      }
        const {DisplayName,Username,UserPass,UserEmail} = req.body;
        console.log('Create Organization Account Call')
        console.log(req.body)
       
    const Response ={}

            const Org= new Organization({
            OrganizationTitle:DisplayName,
            OrganizationUsername:Username,
            OrganizationPass:UserPass,
            OrganizationEmail: UserEmail,
          })
      
          // save Organization into database   
      Org.save(Org)
        .then(data => {
          Response.OrgResponse = data
          console.log(data)
         
         res.status(200).send({
          r1: Response.OrgResponse,
         
         }
         )

        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Organization."
          });
        });
}




const DeleteOrganizationAccount = async (req,res) =>{
   
  

  const {id} = req.body;
  console.log(id)

  Organization.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Organization with id=${id}. Maybe Organization was not found!`
        });
      } else {
        res.send({
          message: "Organization was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Organization with id=" + id
      });
    });


}



const DisplayAllOrganizationData= async (req,res)=>{ 
        const OrgData =  await  Organization.find();
        console.log(OrgData)
        res.status(200).send(
           OrgData) 
 
}



const UpdateProfileData= async(req,res)=>{
   
  const {id,email,displayName,street,city,country,billingAddress,zipCode,states,privacyPolicy,termAndCond}= req.body
     
  Organization.findByIdAndUpdate(id, {
    OrganizationEmail:email,
    OrganizationTitle: displayName,
    Organization_street:street,
    Organization_city:city,
    Organization_country:country,
    Organization_billingAddress:billingAddress,
    Organization_zipCode:zipCode,
    Organization_states:states,
    Organization_privacyPolicy:privacyPolicy,
    Organization_termAndCond:termAndCond
  })
  .then(data => {
    if (!data) {
      res.status(404).send({
        message: `Cannot update Organization data with id=${id}. Maybe Organization was not found!`
      });
    } else{ 
      
      console.log("organization updated data ",data)
      res.send(
      {
      
       message: "Organization data was updated successfully.",
      id: data.id,
      username: data.OrganizationUsername,
      email: data.OrganizationEmail,
        })
      }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error updating Admin with id=" + id
    });
  });

  

}






const Organization_ResetPassword= async(req,res)=>{
   

  let Organizationdata = await  Organization.findOne({ OrganizationEmail:req.body.Email})

  const responseType = {}
  const generatedOtp = generateOTP();

  console.log('Generated Otp',generateOTP)

  if(Organizationdata){
          let otpData = new OTP({
          Email:req.body.Email,
          Code: generatedOtp,
          ExpireIn: new Date().getTime() + 300*1000,
          PersonId:Organizationdata.id
      })
      console.log(Organizationdata.id)
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






const Organization_ChangePassword= async (req,res)=>{
  
 
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
       
    
      Organization.updateOne({_id:PersonId},{$set: {OrganizationPass:newPass}})
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Organization Pass with id=${PersonId}. Maybe Organization was not found!`
          });
        } else{ res.send(
          {
           message1: response.message,
           status: response.statusText,
           message: "Organization was updated successfully.",
           data
       
       });
      }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Organization Pass with id=" + PersonId
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


const SetOrganizationStatus = async(req,res)=>{
      const {id,status} = req.body
     
      Organization.updateOne({_id:id},{$set: {Organization_Status:status}})
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Organization Status with id=${id}. Maybe Organization was not found!`
          });
        } else{ res.send(
          {
           message: "Organization status updated successfully.",
           data
       
       });
      }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Organization Status with id=" + id
        });
      });


}




const ViewProfileData = async (req,res)=>{
    const {id} = req.body
  const OrganizationData = await Organization.findById(id)
  if(OrganizationData){
  res.status(200).send({
    OrganizationData,
    message:"Data Found Successfully"
  });
}else{
  res.status(500).send({
    message:"Error Finding Data"
  });
}
}

const LogOutOrganization= async (req,res)=>{

}




module.exports = {OrganizationLogin,
  CreateOrganizationAccount,
  DeleteOrganizationAccount,
  DisplayAllOrganizationData,
  Organization_ChangePassword,
  Organization_ResetPassword,
  UpdateProfileData,
  SetOrganizationStatus,
  LogOutOrganization,
  ViewProfileData
}