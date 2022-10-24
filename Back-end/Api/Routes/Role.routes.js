const express= require('express')
const app= express()

const RoleController = require('../../Controller/RolesControllers/Roles.controller')
app.post('/CreateRole',RoleController.CreateRoles)
app.post('/UpdateRole',RoleController.UpdateRoles)
app.post('/DeleteRole',RoleController.DeleteRoles)
app.get('/ViewAllRoles',RoleController.ViewAllRoles)
app.post('/ViewRoles',RoleController.ViewRole)
module.exports= app

