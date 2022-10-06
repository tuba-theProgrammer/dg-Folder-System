const express= require('express')
const app= express()

const SiteController = require('../Controller/SiteController')
app.post('/createSite',SiteController.SiteCreateAccount)
app.post('/SiteSignIn',SiteController.SiteSignIn);
app.post('/setSiteStatus',SiteController.setSiteStatus)
app.post('/UpdateSite',SiteController.EditSite)
app.post('/SelfUpdateSite',SiteController.SiteSelfUpdateSettings)
app.get('/DisplayAllSite',SiteController.ViewAllSites)
app.get('/DisplayOneSite',SiteController.ViewOneSite)
app.get('/ResetPass',SiteController.SiteResetPass)
app.get('/setNewPass',SiteController.SiteChangePassword)


module.exports= app
