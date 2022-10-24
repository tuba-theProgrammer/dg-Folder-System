const express= require('express')
const app= express()

const FolderController = require('../../Controller/FolderPermissionController/Folder_Permission.controller')
app.post('/CreateFolder',FolderController.CreateFolder)
app.post('/UpdateFolder',FolderController.UpdateFolder)
app.post('/DeleteFolder',FolderController.DeleteFolder)
app.get('/ViewAllFolders',FolderController.ViewAllFolders)
app.post('/ViewAllNextFolders',FolderController.ViewAllNextFolders) // not implemented yet
module.exports= app

