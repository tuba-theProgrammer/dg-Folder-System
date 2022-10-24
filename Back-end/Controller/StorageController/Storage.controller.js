const LoginDetailsSchema = require('../../Model/LoginDetailModel/logins.model')
const Logs= LoginDetailsSchema.LoginDetails_schema

const UpdateStorageMemory = async(req,res)=>{
     const {personId,newUseStorage} = req.body
       
     const LogData = await Logs.findOne({ LogUserId:personId})

     let newStorage = LogData.useStorage + newUseStorage

          if(newStorage<LogData.totalStorage){
          
            Logs.updateOne({_id:LogData._id}, {
                set:{useStorage:newStorage}
              })
              .then(data => {
                if (!data) {
                  res.status(404).send({
                    message: `Cannot update Permission Type  data with id=${id}. Maybe  Permission Type was not found!`
                  });
                } else res.send(
                  {
                  
                   message: "Permission Type data was updated successfully.",
                   data
               });
              })
              .catch(err => {
                res.status(500).send({
                  message: "Error updating Permission Type with id=" + id
                });
              });
          }else{
            res.status(500).send({
                message: "No enough storage"
              });
          }
       

}


module.exports = {UpdateStorageMemory}