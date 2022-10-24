const express= require('express')
const app= express()

const PackageController = require('../../Controller/PackageController/Package.controller')
app.post('/CreatePackage',PackageController.CreatePackage)
app.post('/DltPackage',PackageController.DeletePackage)
app.get('/DisplayAllPackages',PackageController.DisplayAllPackage)
app.post('/updatePackages',PackageController.UpdatePackage)

module.exports= app