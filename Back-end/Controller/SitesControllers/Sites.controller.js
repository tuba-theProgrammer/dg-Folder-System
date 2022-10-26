const Sites_schema = require('../../Model/SitesModel/Sites.model')
const Site = Sites_schema.Sites_schema
const Otp_schema = require('../../Model/OtpModel/Otp.model')
const OTP = Otp_schema.Otp_schema
const { generateOTP } = require('../../Utils/Services/Otp')
const { sendMail } = require('../../Utils/Services/Mail')
const ResponseCode = require('../../Utils/Responses/ResponseCode')


const SiteLogin=async (req,res)=>{
      console.log("Site SignIn Call")
      console.log("site req body ", req.body)
    //  Validate request
    if (!req.body.username) {
     res.status(400).send({ message: "Content can not be empty!" });
     return;
   }
       console.log("site req body data ",req.body)
 
 
        Site.findOne({
            SiteUsername: req.body.username,
       })
         .exec((err, user) => {
           if (err) {
             res.status(500).send({ 
              message: err,
              resCode: ResponseCode.ERROR_MESSAGE
            });
             return;
           }
     
           if (!user) {
             return res.status(404).send({ message: "Site Not found." });
           }

           if(user.SitePass== req.body.pass){
            res.status(200).send({
              data,
              message: "Site Account login Successfully",
              resCode:ResponseCode.LOGIN_SUCCESSFULL
            });
           }else{
            res.status(500).send({
               message:"Incorrect Username and pass",
               resCode: ResponseCode.INCORECT_EMAIL_PASS
            }
              );
           }
         
         });


}



const CreateSiteAccount= async (req,res)=>{
   
        const {DisplayName,Username,UserPass,UserEmail,OrgId,OwnerName} = req.body;
        if (!req.body.Username) {
            res.status(400).send({
              
              message: "Content can not be empty!",
              resCode: ResponseCode.CONTENT_NOT_FOUND
          });
            return;
          }
            console.log("create site req body data ",req.body)
           
                  const site= new Site({
                    siteName:DisplayName,
                    SiteUsername:Username,
                    SitePass:UserPass,
                    ownerEmail: UserEmail,
                    ownerName:OwnerName,
                    Org_Id: OrgId
              })
          
              // save Site into database   
          site.save(site)
            .then(data => {
                    console.log(data)
             
             res.status(200).send({
            data,
            message: "Site Account Created Successfully",
            resCode:ResponseCode.ACCOUNT_CREATED_SUCCESSFULLY
             }
             )
    
            })
            .catch(err => {
              res.status(500).send({
                message:
                  err.message || "Some error occurred while creating the Site.",
                  resCode:ResponseCode.ERROR_MESSAGE
              });
            });
      
}


const DeleteSiteAccount = async (req,res) =>{
  
    const {id} = req.body;
    console.log(id)
  
    Site.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete site with id=${id}. Maybe site was not found!`
          });
        } else {
          res.send({
            message: "site was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete site with id=" + id
        });
      });
  
}



const DisplayAllSitesData= async (req,res)=>{ 
    const SiteData =  await Site.find();
    console.log(SiteData)
    res.status(200).send(
       SiteData)  
 
}








const Site_ResetPassword= async(req,res)=>{
   
  let Sitedata = await  Site.findOne({ ownerEmail:req.body.Email})
  const responseType = {}
  const generatedOtp = generateOTP();

  console.log('Generated Otp',generateOTP)

  if(Sitedata){
          let otpData = new OTP({
          Email:req.body.Email,
          Code: generatedOtp,
          ExpireIn: new Date().getTime() + 300*1000,
          PersonId:Sitedata.id
      })
      console.log(Sitedata.id)
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
  
  
  
  const Site_ChangePassword= async (req,res)=>{
    
   
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
       
    
      Site.updateOne({_id:PersonId},{$set: {SitePass: newPass}})
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Site Pass with id=${PersonId}. Maybe Site was not found!`
          });
        } else{ res.send(
          {
           message1: response.message,
           status: response.statusText,
           message: "Site was updated successfully.",
          id: data.id,
          username:data.SiteUsername,
          pass:data.SitePass,
          email: data.ownerEmail,
       
       });
      }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Site Pass with id=" + PersonId
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
  
  
  
const UpdateSiteProfile = async (req,res)=>{
    const {id,email,ownerName,displayName}= req.body
     
    Site.findByIdAndUpdate(id, {
        siteName: displayName,
        ownerEmail: email,
        ownerName:ownerName
    })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Site data with id=${id}. Maybe Site was not found!`
        });
      } else res.send(
        {
        
         message: "Site data was updated successfully.",
         data
     });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Site with id=" + id
      });
    });

    
  
}


const ViewProfileData = async (req,res)=>{
    const {id} = req.body
  const Data = await Site.findById(id)
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


module.exports = {SiteLogin,
    CreateSiteAccount,
    DeleteSiteAccount,
    DisplayAllSitesData,
    Site_ResetPassword,
    Site_ChangePassword,
    UpdateSiteProfile,
    ViewProfileData}