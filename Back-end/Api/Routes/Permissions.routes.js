const express= require('express')
const app= express()

const PermissionController = require('../../Controller/PermissionsControllers/Permission.controller')
app.post('/CreatePermission',PermissionController.CreatePermission)
app.post('/UpdatePermission',PermissionController.UpdatePermission)
app.post('/DeletePermission',PermissionController.DeletePermission)
app.get('/ViewAllPermissions',PermissionController.ViewAllPermission)
app.post('/ViewPermission',PermissionController.ViewPermission)
module.exports= app

