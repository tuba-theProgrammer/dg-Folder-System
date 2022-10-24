const SubcriptionSchema = require('../../Model/SubcriptionsModel/subcriptions.model')
const Subcription = SubcriptionSchema.Subcription_schema
const PackageSchema = require('../../Model/PackagesModel/Packages.model')
const Package= PackageSchema.Packages_schema

const SubcribeToPackage = async (req,res)=>{
   // create subcription
   const {
    sub_packageId,
    org_id,
} = req.body
console.log("In  Add subcription")
console.log(req.body)
    
const PackageData = await Package.findById(sub_packageId)
     var StartDate = new Date(); 
    var EndDate = new Date(); 
    console.log("duration days ",PackageData.Package_durationDays)
     
    EndDate.setDate(StartDate.getDate()+ parseInt(PackageData.Package_durationDays));
   

    if (!req.body.sub_packageId) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
      }
        console.log("Add Subcription req body data ",req.body)
           const subcription= new Subcription({
            sub_packageId,
            org_id,
            sub_startDate: StartDate.toString(),
            sub_EndDate: EndDate.toString(),
          })
      
          // save Subcription into database   
      subcription.save(subcription)
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
              err.message || "Some error occurred while subcribing."
          });
        });

}

const ViewSubcription = async (req,res) =>{
    const {id} = req.body
    const Data = await Subcription.findById(id)
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

const UnSubcribePackage = async (req,res) =>{
    const {id} = req.body;
    console.log(id)
  
    Subcription.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot Unsubcribe with id=${id}. Maybe Subcription was not found!`
          });
        } else {
          res.send({
            message: "Subcription deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Subcription with id=" + id
        });
      });
}


const RenewSubcription = async (req,res) =>{
    const {id} = req.body
     
    const SubcriptionData = await Subcription.findById(id)
    console.log(SubcriptionData)
    const packageId =SubcriptionData.sub_packageId
    const PackageData = await Package.findById(packageId)
  
    
    var Subdate = new Date(SubcriptionData.sub_EndDate); 
    var EndDate = new Date(); 
    console.log("duration days ",PackageData.Package_durationDays)
     
    EndDate.setDate(Subdate.getDate()+ parseInt(PackageData.Package_durationDays));
   


    // here subcription will be updated from stripe as well
    

    Subcription.updateOne({_id:id},{$set: {sub_EndDate:EndDate}})
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot renew Subcription with id=${id}. Maybe Subcription was not found!`
        });
      } else{ res.send(
        {
         message: "Subcription renew successfully.",
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

// this will be set by Admin
const SetSubcriptionStatus =  async (req,res) =>{
  console.log(req.body)
  console.log("in subcription status call ")
  const {id,status} = req.body
     
  Subcription.updateOne({_id:id},{$set: {subStatus:status}})
  .then(data => {
    if (!data) {
      res.status(404).send({
        message: `Cannot update Subcription Status with id=${id}. Maybe Subscription was not found!`
      });
    } else{ res.send(
      {
       message: "Subcription status updated successfully.",
       data
   
   });
  }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error updating SUbscription Status with id=" + id
    });
  });
}



module.exports = {
    SubcribeToPackage,
    ViewSubcription,
    UnSubcribePackage,
RenewSubcription,
SetSubcriptionStatus
}

