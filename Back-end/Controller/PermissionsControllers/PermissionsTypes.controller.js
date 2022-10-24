const PermissionType_schema = require('../../Model/PermissionModel/PermissionType.model')
const PermissionType = PermissionType_schema.PermissionType_schema


const CreatePermissionType=async (req,res)=>{
    // create Permission
    const {
        PermissionID,
        PermissionName
     
    } = req.body
        
        if (!req.body.PermissionName) {
            res.status(400).send({ message: "Content can not be empty!" });
            return;
          }
            console.log("Create Permission Type req body data ",req.body)
               const permissionType= new PermissionType({
                PermissionID,
                PermissionName
              })
          
              // save Permission into database   
          permissionType.save(permissionType)
            .then(data => {
              console.log(data)
             
             res.status(200).send({    
              data
             }
             )
        
            })
            .catch(err => {
              res.status(500).send({
                message:
                  err.message || "Some error occurred while creating permissions Type"
              });
            });
    
    

}


const UpdatePermissionType= async (req,res) =>{
    const {
        id,  
        PermissionName,
    } = req.body
        
        PermissionType.updateOne({_id:id}, {
          $set:{PermissionName:PermissionName}
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
    
}

const DeletePermissionType= async (req,res) =>{
  console.log("delete permissions called")
    const {id} = req.body;
    console.log(id)
  
    PermissionType.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Permission Type with id=${id}. Maybe Permission Type was not found!`
          });
        } else {
          res.send({
            message: "Permission  Type deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Permission Type with id=" + id
        });
      });
}


const ViewAllPermissionType = async (req,res)=>{
    const Data =  await PermissionType.find();
    console.log(Data)
    res.status(200).send(
       Data) 
}

const ViewPermissionType = async (req,res)=>{
    const {id} = req.body
    const Data = await PermissionType.findById(id)
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




module.exports = {
    CreatePermissionType,
    UpdatePermissionType,
    DeletePermissionType,
    ViewAllPermissionType,
    ViewPermissionType
}