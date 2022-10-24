const express= require('express')
const app= express()

const SuperAdminController = require('../../Controller/AdminControllers/Admin.controller')
app.get('/CreateAdmin',SuperAdminController.createSuperAdmin)
app.post('/LoginAdmin',SuperAdminController.AdminSignIn)
app.post('/AdminChangePass',SuperAdminController.Admin_ChangePassword)
app.post('/AdminResetPass',SuperAdminController.Admin_ResetPassword)
app.post('/UpdateAdminData',SuperAdminController.UpdateAdminProfile)
app.post('/LogoutAdmin',SuperAdminController.LogOutAdmin)
app.post('/viewAdminProfile',SuperAdminController.ViewProfileData)
module.exports= app