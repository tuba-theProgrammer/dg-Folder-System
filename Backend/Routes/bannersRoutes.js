const express= require('express')
const app= express()

const BannerController = require('../Controller/bannersController')
app.post('/createBanner',BannerController.BannerCreateAccount)
app.post('/UpdateBanner',BannerController.EditBanner)
app.get('/DisplayBanners',BannerController.ViewAllBanner)
app.post('/DeleteBanner',BannerController.DeleteBanner)

module.exports= app
