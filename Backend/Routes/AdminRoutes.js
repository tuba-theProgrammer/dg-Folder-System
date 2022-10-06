const express= require('express')
const app= express()

const AdminController = require('../Controller/AdminController')
app.post('/createAdmin',AdminController.AdminCreateAccount)
app.post('/AdminSignIn',AdminController.AdminSignIn);
app.post('/DeleteAdmin',AdminController.DeleteAdminAccount)
app.post('/AdminSelfUpdate',AdminController.AdminSelfUpdateSettings)
app.post('/EditAdmin',AdminController.EditAdminAccount)
app.get('/DisplayAllAdmin',AdminController.ViewAllAdmins)
app.get('/DisplayOneAdmin',AdminController.ViewOneAdmin)
app.get('/ResetPass',AdminController.AdminResetPass)
app.get('/SetNewPass',AdminController.AdminChangePassword)

module.exports= app
