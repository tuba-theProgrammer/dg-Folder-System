const Permission_schema = require('../../Model/PermissionModel/Permissions.model')
const Permission = Permission_schema.Permission_schema


const CreatePermission=async (req,res)=>{
    // create Permission
    const {
        PermissionName,
        PermissionAdded_By_Id
     
    } = req.body
        
        if (!req.body.PermissionName) {
            res.status(400).send({ message: "Content can not be empty!" });
            return;
          }
            console.log("Create Permission req body data ",req.body)
               const permission= new Permission({
                PermissionName,
                PermissionAdded_By_Id
              })
          
              // save Permission into database   
          permission.save(permission)
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
                  err.message || "Some error occurred while creating permissions"
              });
            });
    
    

}


const UpdatePermission= async (req,res) =>{
  console.log("User Update Permission")
    const {
        id,  
        PermissionName,
    } = req.body
        console.log(req.body)
        Permission.updateOne({_id:id}, {
          $set:{PermissionName:PermissionName}
        })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update Permission  data with id=${id}. Maybe  Permission was not found!`
            });
          } else res.send(
            {
            
             message: "Permission data was updated successfully.",
             data
         });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating Permission with id=" + id
          });
        });
    
}

const DeletePermission= async (req,res) =>{
    const {id} = req.body;
    console.log(id)
  
    Permission.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Permission with id=${id}. Maybe Permission was not found!`
          });
        } else {
          res.send({
            message: "Permission deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Permission with id=" + id
        });
      });
}


const ViewAllPermission = async (req,res)=>{
    const Data =  await Permission.find();
    console.log(Data)
    res.status(200).send(
       Data) 
}

const ViewPermission = async (req,res)=>{
    const {id} = req.body
    const Data = await Permission.findById(id)
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
    CreatePermission,
    ViewAllPermission,
    UpdatePermission,
    DeletePermission,
    ViewPermission
}