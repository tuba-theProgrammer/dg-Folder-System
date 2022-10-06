const express= require('express')
const app= express()

const SuperAdminController = require('../Controller/SuperAdminController')
app.post('/SuperAdminSignIn',SuperAdminController.superAdminSignIn);
app.get('/ResetSuperAdminPass',SuperAdminController.SuperAdminResetPass)
app.get('/setNewSuperAdminPass',SuperAdminController.SuperAdminChangePassword)


module.exports= app
