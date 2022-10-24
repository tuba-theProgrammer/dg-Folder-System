const express= require('express')
const app= express()
const middleware = require('../Middleware/FileUpload.middleware')
const upload = middleware.upload
const ThemeController = require('../../Controller/OrgThemeController/OrgTheme.controller')

app.post('/Createtheme',upload.single('themeImage'),ThemeController.CreateTheme)
app.post('/DltTheme',ThemeController.DeleteTheme)
app.get('/DisplayAllTheme',ThemeController.ViewAllThemes)
app.post('/updateTheme',upload.single('themeImage'),ThemeController.UpdateTheme)
app.post('/DisplayTheme',ThemeController.ViewTheme)

module.exports= app