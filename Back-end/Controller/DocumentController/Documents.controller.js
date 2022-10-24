const DocumentSchema = require('../../Model/DocumentModel/Document.model')
const Document = DocumentSchema.Document_Schema
const upload = require('../../Api/Middleware/FileUpload.middleware')


const CreateDocument = async(req,res)=>{
    
   const { User_ID,DocumentName,Folder_ID} = req.body;
   if (!req.body.FolderName) {
       res.status(400).send({ message: "Content can not be empty!" });
       return;
     }
       console.log("create Document req body data ",req.body)
      
             const document= new Document({
                User_ID,
                DocumentName,
                Folder_ID,
                DocumentLink:req.file.path
         })
     
         // save document into database   
     document.save(document)
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


const UpdateDocumentName= async(req,res)=>{
   console.log(req.body)
   console.log("in Update Folder call ")
   const {id,DocumentName} = req.body
      
   Document.updateOne({_id:id},{$set: {DocumentName:DocumentName}})
   .then(data => {
     if (!data) {
       res.status(404).send({
         message: `Cannot update Document Name with id=${id}. Maybe Document was not found!`
       });
     } else{ res.send(
       {
        message: "Document Name updated successfully.",
        data
    
    });
   }
   })
   .catch(err => {
     res.status(500).send({
       message: "Error updating Document Name with id=" + id
     });
   });
}



const UpdateDocumentLink= async(req,res)=>{
    console.log(req.body)
    console.log("in Update Document Link call ")
    const {id} = req.body
       
    Document.updateOne({_id:id},{$set: {DocumentLink:req.file.path}})
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Document Link with id=${id}. Maybe Document was not found!`
        });
      } else{ res.send(
        {
         message: "Document Link updated successfully.",
         data
     
     });
    }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Document Link with id=" + id
      });
    });
 }



const DeleteDocument= async(req,res)=>{
   const {id} = req.body;
   console.log(id)
 
   Document.findByIdAndRemove(id)
     .then(data => {
       if (!data) {
         res.status(404).send({
           message: `Cannot delete Document with id=${id}. Maybe Document was not found!`
         });
       } else {
         res.send({
           message: "Document was deleted successfully!"
         });
       }
     })
     .catch(err => {
       res.status(500).send({
         message: "Could not delete Document with id=" + id
       });
     });
 
}

const ViewAllDocuments = async(req,res)=>{
   const Data =  await Document.find();
   console.log(Data)
   res.status(200).send(
      Data)  
}

module.exports = {
   CreateDocument,
   DeleteDocument,
   UpdateDocumentName,
   UpdateDocumentLink,
   ViewAllDocuments
}
