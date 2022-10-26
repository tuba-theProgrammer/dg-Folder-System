const logSchema = require('../../Model/LoginDetailModel/logins.model')
const logs = logSchema.LoginDetails_schema
const FolderSchema = require('../../Model/FolderPermissionModel/Folder_Permission.model')
const Folder = FolderSchema.FolderPermission_Schema
const ResponseCodes = require('../../Utils/Responses/ResponseCode')


const CreateLoginDetails = async (req,res)=>{
    const {Username,UserPass,TableName,timeZone,Folder_ID,userID,time_formate,date_formate,total_storage,used_storage} = req.body;

    const log= new logs({
        LogUsermame:Username,
        LogPass:UserPass,
        Log_TableName:TableName,
        LogUserId:userID,
        totalStorage:total_storage,
        usedStorage:used_storage,
        timeZone:timeZone,
        timeFormate:time_formate,
        dateFormate:date_formate,
        Folder_ID

      })

     log.save(log)
     .then(data=>{
    
      console.log(data)
      res.status(200).send({
        data,
        message: "Login details data added successfully"
       })
     }).catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Login details."
      });
    });

}

const LoginAccountGeneral = async(req,res) =>{
    console.log("Logs SignIn Call")
    console.log(req.body)
    //  Validate request
    if (!req.body.username) {
     res.status(400).send({ 
      
      message: "Content can not be empty!",
      resCode:1004
    
    });
     return;
   }
       console.log("Log details req body data ",req.body)
 
 
        logs.findOne({
            LogUsermame: req.body.username,
       })
         .exec((err, user) => {
           if (err) {
             res.status(500).send({ 
              message: err,
              resCode:ResponseCodes.ERROR_MESSAGE
            });
             return;
           }
     
           if (!user) {
             return res.status(404).send(
              { message: "Log details Not found.",
              resCode:ResponseCodes.DATA_NOT_FOUND
            
            }
             
             );
           }
          console.log(user)
           if(user.LogPass== req.body.pass){
            res.status(200).send({
              user,
              message: "login Successfully",
              resCode:ResponseCodes.LOGIN_SUCCESSFULL
              }
              
              );
           }else{
            res.status(500).send({
              message: "Incorrect Username and pass",
              resCode: ResponseCodes.INCORECT_EMAIL_PASS
            }
              );
           }
          
         });
}



const UpdateLoginDetails= async (req,res)=>{

    const {id,timeZone,timeFormat,DateFormat}= req.body

    const LoginData= await logs.findOne({LogUserId:id})
    logs.findByIdAndUpdate(LoginData.id, {
        timeZone,
        timeFormate:timeFormat,
        dateFormate:DateFormat
    })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Login Data with id=${LoginData.id}. Maybe LoginDetails was not found!`,
          
        });
      } else res.status(200).send(
        {
        id: data.id,
        username:data.LogUsermame,
        pass:data.LogPass,
        timeZone:data.timeZone,
        timeFormate:data.timeFormate,
        dateFormate:data.dateFormate
     });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Admin Details with id=" + id
      });
    });
}

const DeleteLoginDetails = async(req,res) =>{
    console.log("Login Detail delete Call")

    const {id} = req.body;
    console.log(id)
    
    const LoginData= await logs.findOne({LogUserId:id})

    logs.findByIdAndRemove(LoginData.id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete LoginDetails with id=${id}. Maybe Login Details was not found!`
          });
        } else {
          res.send({
            message: "Login Details was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Login Details with id=" + id
        });
      });
  
}



const UpdateLoginDetailsPass = async (req,res)=>{
         
    const {id,newPass} = req.body
    const LoginData= await logs.findOne({LogUserId:id})
    console.log(id)
    console.log(LoginData)
    logs.updateOne({_id:LoginData.id},{$set: {LogPass: newPass}})
    .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot Update Pass in LoginDetails with id=${id}. Maybe Login Details was not found!`
          });
        } else {
          res.send({
            message: "Pass in Login Details updated successfully!",
          });
      
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not Update Login Details pass with id=" + id
        });
      });
    
}


const fetchUserCurrentFolder=async (req,res)=>{
  const {id} = req.body
  const LoginData= await logs.findOne({LogUserId:id})
  console.log(LoginData)
   Folder.find({_id:LoginData._id}).then(
    data=>{
      res.status(200).send({
        data,
        message:"Current folder of user found",
      })
    }
   ).catch(
    err=>{
      res.status(500).send({
        message: "Could not Update Login Details pass with id=" + id,
      
      });
    }
   )
  

}


module.exports = {
  CreateLoginDetails,
  LoginAccountGeneral,
  DeleteLoginDetails,
  UpdateLoginDetails,
  UpdateLoginDetailsPass
}