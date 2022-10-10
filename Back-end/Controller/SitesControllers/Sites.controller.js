const Sites_schema = require('../../Model/SitesModel/Sites.model')


const SiteLogin=async (req,res)=>{
    const {AdminEmail,AdminPass}= req.body
    console.log("super admin req body data ",req.body)
     
    const Data={
       AdminEmail:AdminEmail,
       AdminPass:AdminPass
    }

    await SuperAdmin_schema.findOne(Data,(err,user)=>{
        if(err){
           res.json({
               status: 0,
               message: "Error finding given User"
           })
        }
        
        if(!user){
           res.json({
               status: 0,
               msg: "not such user found"
           });
        }

        res.json({
           status: 1,
           id: user._id,
           message: " Account login Successfully"
       });
   }
   
   )

}