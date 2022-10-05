const express= require('express')
const app= express()

const SiteController = require('../Controller/SiteController')
app.post('/createSite',SiteController.SiteCreateAccount)
app.post('/SiteSignIn',SiteController.SiteSignIn);
app.post('/DeleteSite',SiteController.DeleteSiteAccount)
app.post('/SelfUpdateSite',SiteController.SiteSelfUpdateSettings)
app.get('/DisplayAllSite',SiteController.ViewAllSites)
app.get('/DisplayOneSite',SiteController.ViewOneSite)
app.get('/ResetPass',SiteController.SiteResetPass)

module.exports= app