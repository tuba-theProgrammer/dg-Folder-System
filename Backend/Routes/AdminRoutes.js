const express= require('express')
const app= express()

const AdminController = require('../Controller/AdminController')
app.post('/createAdmin',AdminController.AdminCreateAccount)
app.post('/AdminSignIn',AdminController.AdminSignIn);
app.post('/DeleteAdmin',AdminController.DeleteAdminAccount)
app.post('/UpdateAdmin',AdminController.AdminUpdateAccount)
app.get('/DisplayAdmin',AdminController.ViewAllAdmins)
app.get('/ResetPass',AdminController.AdminResetPass)

module.exports= app
