const OrgTheme_schema = require('../../Model/OrgThemeModel/OrgTheme.model')
const Theme = OrgTheme_schema.OrganizationTheme_schema

const CreateTheme = async (req,res)=>{
    const {
        themeTitle,
        themeColor,
        theme_createdBy,
        theme_createBy_ID
        } = req.body
        
        if (!req.body.themeColor) {
            res.status(400).send({ message: "Content can not be empty!" });
            return;
          }
          console.log('here is logo ',req.file.path)
            console.log("create theme req body data ",req.body)
               const theme= new Theme({
                themeLogo:req.file.path,
                themeTitle,
                themeColor,
                theme_createdBy,
                theme_createBy_ID
              })
          
              // save theme into database   
          theme.save(theme)
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
                  err.message || "Some error occurred while creating the Theme."
              });
            });
      
}


const ViewTheme =  async (req,res)=>{
    const {id} = req.body
    const Data = await Theme.findById(id)
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


const DeleteTheme=  async (req,res)=>{
    const {id} = req.body;
    console.log(id)
  
    Theme.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Theme with id=${id}. Maybe Theme was not found!`
          });
        } else {
          res.send({
            message: "Theme deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Theme with id=" + id
        });
      });
  
}


const UpdateTheme =  async (req,res)=>{
    const {
        id,  
        themeLogo,
        themeTitle,
        themeColor,
       } = req.body
        
        Theme.findByIdAndUpdate(id, {
            themeLogo,
            themeTitle,
            themeColor,
        })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update Theme data with id=${id}. Maybe Theme was not found!`
            });
          } else {
          
            res.send(
            {
            
             message: "Theme data was updated successfully.",
            
         });
        }
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating Theme with id=" + id
          });
        });
    
}

const ViewAllThemes = async (req,res)=>{
    const Data =  await Theme.find();
    console.log(Data)
    res.status(200).send(
       Data)  
}


module.exports = {CreateTheme,ViewAllThemes,ViewTheme,DeleteTheme,UpdateTheme}
