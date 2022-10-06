const {Site_schema} = require('../Model/SubdomainsModel')
const {Otp_schema} = require('../Model/OtpModel')
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

        const SiteAccount=await Site_schema.create({sitename,site_email,site_username,site_pass,site_storage_limit})
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
    const AllSiteData =  await Site_schema.find();
    console.log(AllSiteData)
    res.status(200).send(
        AllSiteData) 
    


}

const setSiteStatus = async (req,res)=>{
   
}



const SiteResetPass = async (req,res)=>{
    let data = await Site_schema.findOne({site_email:req.body.site_email})
    const responseType = {}

    if(data){
        let otpCode = Math.floor((Math.random()*10000+1))
        let otpData = new Otp_schema({
            email:req.body.site_email,
            code:otpCode,
            expireIn: new Data().getTime() + 300*1000
        })

         await otpData.save();
        responseType.statusText = 'Success'
        responseType.message= "Please check your email for otp verification"

    }else{
        responseType.statusText = 'error'
        responseType.message= "Email id does not exits"

    }

    res.status(200).json(responseType)
}


const SiteChangePassword = async(req,res)=>{
    let data = await Otp_schema.find({email:req.body.email,code: req.body.otpCode})
    const response={}
     
    if(data){
       let currentTime = new Date().getTime()
       let diff = data.expireIn - currentTime
        
       if(diff<0){
        response.message = "Token Expire"
        response.statusText= 'error'

       }else{
         await Site_schema.findOne({
            site_email:req.body.site_email
         })
       }

    }else{
        response.message = "Invalid Otp"
        response.statusText = "error"
    }


    res.status(200).json(response)

}




module.exports = {SiteSignIn,SiteCreateAccount,setSiteStatus,SiteSelfUpdateSettings,EditSite,ViewOneSite,ViewAllSites,SiteResetPass,SiteChangePassword}






