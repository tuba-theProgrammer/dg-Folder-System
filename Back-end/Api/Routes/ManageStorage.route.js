const express= require('express')
const app= express()

const StorageController = require('../../Controller/StorageController/Storage.controller')
app.post('/UpdateStorage',StorageController.UpdateStorageMemory)

module.exports = app