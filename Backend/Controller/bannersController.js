const {Banner_schema} = require('../Model/BannersModel')



const BannerCreateAccount = async (req,res)=>{
    const {bannerTitle,bannerImage,bannerVideo,bannerDescription} = req.body 
    console.log('Banner Create Data', req.body)
    try{

        const BannerAccount=await Banner_schema.create({bannerTitle,bannerImage,bannerVideo,bannerDescription})
        res.status(200).send({
             status:1,
             data:BannerAccount,
             message:"Banner Account created successfully"
            })

    }
    catch(error){
        res.send(error.message)
    }

}



const EditBanner= async (req,res)=>{

}

const ViewAllBanner = async (req,res)=>{
    const AllBannerData =  await Banner_schema.find();
    console.log(AllBannerData)
    res.status(200).send(
        {
       data: AllBannerData
    }) 
    


}


const DeleteBanner = async (req,res)=>{
    const {bannerId} = req.body
    console.log(req.body)
    await Banner_schema.findOneAndRemove(bannerId)
    const BannerData=await Banner_schema.find()
    res.status(200).send({
        data: BannerData,
    }
    )

    
}

module.exports = {BannerCreateAccount,EditBanner,DeleteBanner,ViewAllBanner}






