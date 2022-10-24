const express= require('express')
const app= express()
const  middleware  = require('../Middleware/FileUpload.middleware')
const upload = middleware.upload
const OrgController = require('../../Controller/OrganizationBanner/OrgBanner.controller')
app.post('/CreateBanner',upload.fields([{ name: 'bannerImage', maxCount: 1 }, { name: 'bannerVideo', maxCount: 1 },{ name: 'bannerLogo', maxCount: 1 }]),OrgController.CreateOrgBanner)
app.post('/DltBanner',OrgController.DeleteOrgBanner)
app.get('/DisplayAllBanner',OrgController.ViewAllBanner)
app.post('/updateBanner',upload.fields([{ name: 'bannerImage', maxCount: 1 }, { name: 'bannerVideo', maxCount: 1 },{ name: 'bannerLogo', maxCount: 1 }]),OrgController.UpdateOrgBanner)
app.post('/DisplayBanner',OrgController.ViewBanner)

module.exports= app