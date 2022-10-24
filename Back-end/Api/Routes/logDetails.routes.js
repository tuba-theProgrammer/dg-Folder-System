const express= require('express')
const app= express()

const LogDetailsController = require('../../Controller/LoginDetailControllers/LoginDetails.controller')
app.post('/LogsSignIn',LogDetailsController.LoginAccountGeneral)
app.post('/LogsCreateAccount',LogDetailsController.CreateLoginDetails)
app.post('/UpdateLoginDetails',LogDetailsController.UpdateLoginDetails)
app.post('/UpdateLoginDetailPass',LogDetailsController.UpdateLoginDetailsPass)
app.post('/DeleteLoginDetail',LogDetailsController.DeleteLoginDetails)
module.exports= app