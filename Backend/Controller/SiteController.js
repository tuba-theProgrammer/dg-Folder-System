const {Site_schema} = require('../Model/SubdomainsModel')

const SiteSignIn = async (req,res)=>{
    
    const { site_email, site_pass}= req.body
    
    if( site_email.length>0 &&  site_pass.length>0){
       const data = {
        site_email:site_email,
        site_pass: site_pass
        };

    await Site_schema.findOne(data,(err,user)=>{
        if(err){
           res.json({
               status: 0,
               message: "Error finding given Site"
           })
        }
        
        if(!user){
           res.json({
               status: 0,
               msg: "not such Site found"
           });
        }

        res.json({
           status: 1,
           id: user._id,
           message: "Site Account login Successfully"
       });
   }
   
   )
    }else{
        res.json({
            status: 0,
            message: "Data must be greater than zero/ invalid Fields"
        });
    }



}

const SiteCreateAccount = async (req,res)=>{
    const {sitename,site_email,site_username,site_pass,site_storage_limit} = req.body 
    console.log('Site Account Create Data', req.body)
    try{

        const SiteAccount=await Admin_schema.create({sitename,site_email,site_username,site_pass,site_storage_limit})
        res.status(200).send({
             status:1,
             data:SiteAccount,
             message:"Site Account created successfully"
            })

    }
    catch(error){
        res.send(error.message)
    }

}

const SiteSelfUpdateSettings = async (req,res)=>{
   
}

const EditSite= async (req,res)=>{

}

const ViewOneSite = async (req,res)=>{
    const {SiteId} = req.body
    if(SiteId.length>0){
       const data = {
        id:SiteId
       }
    await Site_schema.findOne(data,(err,user)=>{
        if(err){
           res.json({
               status: 0,
               message: "Error finding given Site"
           })
        }
        
        if(!user){
           res.json({
               status: 0,
               msg: "not such Site found"
           });
        }

        res.json({
           status: 1,
           id: user._id,
           message: "Site Account found successfully"
       });
   }
   
   )
}
else{
    res.json({
        status: 0,
        message: "Empty body received"
    });
}
}

const ViewAllSites = async (req,res)=>{
    const AllSiteData =  await Admin_schema.find();
    console.log(AllSiteData)
    res.status(200).send(
        AllSiteData) 
    


}

const DeleteSiteAccount = async (req,res)=>{
    const {SiteId}=req.body;
    console.log(SiteId)
  
    await Site_schema.findOneAndRemove(AdminId)
    const SiteData=await Site_schema.find()
    res.status(200).send(
        SiteData
    )
}

const SiteResetPass = async (req,res)=>{

}



module.exports = {SiteSignIn,SiteCreateAccount,DeleteSiteAccount,SiteSelfUpdateSettings,EditSite,ViewOneSite,ViewAllSites,SiteResetPass}






