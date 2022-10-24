const PackageSchema = require('../../Model/PackagesModel/Packages.model')
const Package= PackageSchema.Packages_schema


const CreatePackage = async(req,res)=>{
   const {
    PackageName,
    PackagePrice,
    PackageStorage,
    Package_durationTitle,
    Package_durationDays,
    PackageStatus} = req.body
    
    if (!req.body.PackageName) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
      }
        console.log("create Package req body data ",req.body)
           const package= new Package({
                PackageName,
                PackagePrice,
                PackageStorage,
                Package_durationTitle,
                Package_durationDays,
                PackageStatus
          })
      
          // save Package into database   
      package.save(package)
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
              err.message || "Some error occurred while creating the Package."
          });
        });
    
   }

  

const UpdatePackage = async(req,res)=>{
    
 const {
    id,  
    PackageName,
    PackagePrice,
    PackageStorage,
    Package_durationTitle,
    Package_durationDays,
    PackageStatus} = req.body
    
    Package.findByIdAndUpdate(id, {
    PackageName,
    PackagePrice,
    PackageStorage,
    Package_durationTitle,
    Package_durationDays,
    PackageStatus
    })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Package data with id=${id}. Maybe  Package was not found!`
        });
      } else res.send(
        {
        
         message: "Package data was updated successfully.",
         data
     });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Package with id=" + id
      });
    });

}


const DisplayAllPackage= async(req,res)=>{
   const Data =  await Package.find();
    console.log(Data)
    res.status(200).send(
       Data)  
 
}

const DeletePackage = async(req,res)=>{
    const {id} = req.body;
    console.log(id)
  
    Package.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Package with id=${id}. Maybe Package was not found!`
          });
        } else {
          res.send({
            message: "Package deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Package with id=" + id
        });
      });
  
}


module.exports = {
    CreatePackage,
    UpdatePackage,
    DisplayAllPackage,
    DeletePackage
}





