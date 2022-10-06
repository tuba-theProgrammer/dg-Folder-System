const express = require('express')
const app = express()
const { PORT,MONGODB} = require('./config');
const bodyParser=require('body-parser');
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());


var mongoose = require('mongoose')

 const adminRoute = require('./Routes/AdminRoutes')
 app.use('/adminApi',adminRoute)


 const sitesRoute = require('./Routes/SiteRoutes')
 app.use('/siteApi',sitesRoute)



 const BannerRoute = require('./Routes/bannersRoutes')
 app.use('/bannerApi',BannerRoute)


 const UserRoute = require('./Routes/UserRoutes')
 app.use('/UserApi',UserRoute)



 const SuperAdminRoute = require('./Routes/SuperAdminRoutes')
 app.use('/superAdminApi',SuperAdminRoute)


app.get('/', (req, res) => {
  res.send('Hello World!')
})


mongoose.connect(MONGODB, /*We place this to remove warning*/{ useNewUrlParser:
  true, useUnifiedTopology: true }).then(()=>{
  console.log("Connected to MongoDB database")
  }).catch((e)=>{console.log(e.message)})


app.listen(PORT, () => {
  console.log(`gd Folder System listening on port ${PORT}`)
})