const OrgBanner_schema = require('../../Model/OrgBannerModel/OrgBanner.model')
const Banner = OrgBanner_schema.OrgBanner_schema
const CreateOrgBanner = async (req,res)=>{
    const {
        OrgID,
        OrgBannerTitle,
        OrgBanner_description
    } = req.body
        
        if (!req.body.OrgBannerTitle) {
            res.status(400).send({ message: "Content can not be empty!" });
            return;
          }
          const logo= req.files['bannerLogo'][0].path
          const image = req.files['bannerImage'][0].path
          const video =req.files['bannerVideo'][0].path
            console.log("create Banner req body data ",req.body)
               const banner= new Banner({
                OrgID,
                OrgBannerLogo:logo,
                OrgBannerTitle,
                OrgBanner_image:image,
                OrgBanner_video:video,
                OrgBanner_description
              })
          
              // save Package into database   
          banner.save(banner)
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
                  err.message || "Some error occurred while creating the Banner."
              });
            });
    
}

const UpdateOrgBanner=  async (req,res)=>{
     
 const {
    id,  
    OrgBannerTitle,
    OrgBanner_description
} = req.body
    
    Banner.findByIdAndUpdate(id, {
      OrgBannerLogo:req.files['bannerLogo'][0].path,
      OrgBannerTitle,
      OrgBanner_image:req.files['bannerImage'][0].path,
      OrgBanner_video:req.files['bannerVideo'][0].path,
      OrgBanner_description
    })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Banner data with id=${id}. Maybe  Banner was not found!`
        });
      } else res.send(
        {
        
         message: "Banner data was updated successfully.",
         data
     });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Banner with id=" + id
      });
    });

}

const DeleteOrgBanner =  async (req,res)=>{
    const {id} = req.body;
    console.log(id)
  
    Banner.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Banner with id=${id}. Maybe Banner was not found!`
          });
        } else {
          res.send({
            message: "Banner deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Banner with id=" + id
        });
      });
}

const ViewAllBanner =  async (req,res)=>{
    const Data =  await Banner.find();
    console.log(Data)
    res.status(200).send(
       Data) 
}

const ViewBanner =  async (req,res)=>{
    const {id} = req.body
    const Data = await Banner.findById(id)
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

module.exports ={
CreateOrgBanner,
UpdateOrgBanner,
DeleteOrgBanner,
ViewAllBanner,
ViewBanner}