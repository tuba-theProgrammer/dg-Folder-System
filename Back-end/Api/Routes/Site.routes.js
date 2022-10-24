const express= require('express')
const app= express()

const SiteController = require('../../Controller/SitesControllers/Sites.controller')
app.post('/CreateSite',SiteController.CreateSiteAccount)
app.post('/LoginSite',SiteController.SiteLogin)
app.post('/SiteChangePass',SiteController.Site_ChangePassword)
app.post('/SiteResetPass',SiteController.Site_ResetPassword)
app.post('/SiteDlt',SiteController.DeleteSiteAccount)
app.get('/DisplayAllSite',SiteController.DisplayAllSitesData)
app.post('/updateSiteProfile',SiteController.UpdateSiteProfile)
app.post('/viewSiteProfile',SiteController.ViewProfileData)
module.exports= app