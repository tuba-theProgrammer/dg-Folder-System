const express= require('express')
const app= express()

const PermissionTypeController = require('../../Controller/PermissionsControllers/PermissionsTypes.controller')
app.post('/CreatePermissionType',PermissionTypeController.CreatePermissionType)
app.post('/UpdatePermissionType',PermissionTypeController.UpdatePermissionType)
app.post('/DeletePermissionType',PermissionTypeController.DeletePermissionType)
app.get('/ViewAllPermissionsType',PermissionTypeController.ViewAllPermissionType)
app.post('/ViewPermissionType',PermissionTypeController.ViewPermissionType)
module.exports= app

