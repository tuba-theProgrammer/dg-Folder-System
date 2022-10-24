const express= require('express')
const app= express()
const middleware = require('.././Middleware/FileUpload.middleware')
const upload = middleware.upload
const DocumentController = require('../../Controller/DocumentController/Documents.controller')
app.post('/CreateDocument',upload.single('document'),DocumentController.CreateDocument)
app.post('/UpdateDocumentName',DocumentController.UpdateDocumentName)
app.post('/UpdateDocumentLink',upload.single('document'),DocumentController.UpdateDocumentLink)
app.post('/DeleteDocument',DocumentController.DeleteDocument)
app.get('/ViewAllDocuments',DocumentController.ViewAllDocuments)
module.exports= app

