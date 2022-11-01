const Roles_schema = require('../../Model/RolesModel/Roles.model')
const Role = Roles_schema.Roles_schema


const CreateRoles= async (req,res)=>{
    const {
        RoleName,
        Roles_TableName,
        Roles_AddedBy_ID,
        ListOfPermissions} = req.body
     
    
        
        if (!req.body.RoleName) {
            res.status(400).send({ message: "Content can not be empty!" });
            return;
          }
            console.log("Create Role req body data ",req.body)
               const role= new Role({
                RoleName,
                Roles_TableName,
                Roles_AddedBy_ID,
              })
          
              // save Permission into database   
          role.save(role)
            .then(data => {
              console.log(data)
              
              Role.findOneAndUpdate(
                { _id: data._id },
                {$push : {  RoleType :   ListOfPermissions }}
            ).then(data=>{
                   console.log("Roles permission Data ",data)
            }).catch(err=>{
                res.status(500).send({
                    message:
                      err.message || "Some error occurred while creating Roles Permissions"
                  });
            })

             res.status(200).send({    
              data
             }


             )
        
            })
            .catch(err => {
              res.status(500).send({
                message:
                  err.message || "Some error occurred while creating Roles"
              });
            });
    
}


const DeleteRoles = async (req,res)=>{
    const {id} = req.body;
    console.log(id)
  

    if (!req.body.id) {
      res.status(400).send({ message: "Role Id required to delete data" });
      return;
    }

    Role.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Role with id=${id}. Maybe Role was not found!`
          });
        } else {
          res.send({
            message: "Role deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Role with id=" + id
        });
      });
}

const UpdateRoles = async(req,res)=>{
    const {id,ListOfPermissions}  = req.body
    Role.findOneAndUpdate(
        { _id: id },
        {$set : {  RoleType :   ListOfPermissions }}
    ).then(data=>{
      res.status(200).send({
        message:" Roles updated successfully",

      });
           console.log("Roles permission Data ",data)
    }).catch(err=>{
        res.status(500).send({
            message:
              err.message || "Some error occurred while updating Roles Permissions"
          });
    })

}

const ViewRole = async(req,res)=>{
  const {id} = req.body
  const Data = await Role.findById(id)
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
const ViewAllRoles = async(req,res)=>{

  const Data =  await Role.find();
  console.log(Data)
  res.status(200).send(
     Data) 
}



module.exports = {CreateRoles,DeleteRoles,UpdateRoles,ViewRole,ViewAllRoles}