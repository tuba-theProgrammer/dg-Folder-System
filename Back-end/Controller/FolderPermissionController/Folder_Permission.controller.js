 const FolderPermissionSchema = require('../../Model/FolderPermissionModel/Folder_Permission.model')
 const FolderPer = FolderPermissionSchema.FolderPermission_Schema

const CreateFolder = async(req,res)=>{
    const { User_ID,FolderName,Previous_Folder_ID} = req.body;
    if (!req.body.FolderName) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
      }
        console.log("create Folder req body data ",req.body)
       
              const folder= new FolderPer({
                User_ID,
                FolderName,
                Previous_Folder_ID
          })
      
          // save Folder into database   
      folder.save(folder)
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
              err.message || "Some error occurred while creating the Document"
          });
        });
}


const UpdateFolder= async(req,res)=>{
    console.log(req.body)
    console.log("in Update Folder call ")
    const {id,FolderName} = req.body
       
    FolderPer.updateOne({_id:id},{$set: {FolderName:FolderName}})
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Folder Name with id=${id}. Maybe Folder was not found!`
        });
      } else{ res.send(
        {
         message: "Folder updated successfully.",
         data
     
     });
    }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Folder with id=" + id
      });
    });
}

const DeleteFolder= async(req,res)=>{
    const {id} = req.body;
    console.log(id)
  
    FolderPer.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Folder with id=${id}. Maybe Folder was not found!`
          });
        } else {
          res.send({
            message: "Folder was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Folder with id=" + id
        });
      });
  
}

const ViewAllFolders = async(req,res)=>{
    const Data =  await FolderPer.find();
    console.log(Data)
    res.status(200).send(
       Data)  
}

const ViewAllNextFolders = async(req,res)=>{
    
}


module.exports = {
    CreateFolder,
    UpdateFolder,
    DeleteFolder,
    ViewAllFolders,
    ViewAllNextFolders
}
