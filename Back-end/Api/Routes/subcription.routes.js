const express= require('express')
const app= express()

const SubController = require('../../Controller/SubcriptionController/Subcription.controller')
app.post('/AddSubcription',SubController.SubcribeToPackage)
app.post('/UnSubcribePackage',SubController.UnSubcribePackage)
app.get('/DisplaySubcription',SubController.ViewSubcription)
app.post('/RenewSubcription',SubController.RenewSubcription)
app.post('/setSubcriptionStatus',SubController.SetSubcriptionStatus)
module.exports= app