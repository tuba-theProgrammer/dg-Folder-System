const InvoiceSchema = require('../../Model/InvoiceModel/Invoice.model')
const Invoice = InvoiceSchema.Invoice_Schema
const SubcriptionSchema = require('../../Model/SubcriptionsModel/subcriptions.model')
const Subcription = SubcriptionSchema.Subcription_schema
// const PackageSchema = require('../../Model/PackagesModel/Packages.model')
// const Package= PackageSchema.Packages_schema


const CreateInvoice = async(req,res)=>{
     // create subcription
   const {
    subcription_ID,
    Org_ID,
    Transaction_ID,
} = req.body
    
    if (!req.body.subcription_ID) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
      }
        console.log("Create Invoice req body data ",req.body)
           const invoice= new Invoice({
            subcription_ID,
            Org_ID,
            Transaction_ID,
          })
      
          // save Invoice into database   
      invoice.save(invoice)
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

const ViewInvoice = async(req,res)=>{
   const {id} = req.body
   
   const InvoiceData = await Invoice.findOne({Org_ID:id })
   console.log(InvoiceData)
   const SubscriptionData = await Subcription.findById(InvoiceData.subcription_ID)
    
   // also transaction details from will strip will be return here
   res.status(200).send({
     responseInvoice: InvoiceData,
     responseSuncription:SubscriptionData
   })

}


module.exports={CreateInvoice,ViewInvoice}