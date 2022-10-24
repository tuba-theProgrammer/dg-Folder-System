const express = require('express')
const app = express()
const { PORT,MONGODB} = require('./config');
const bodyParser=require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const cors = require("cors");
app.use(cors());


var mongoose = require('mongoose')


app.get('/', (req, res) => {
  res.send('Hello World!')
})


const AdminRoute = require('./Api/Routes/Admin.routes')
app.use('/adminApi',AdminRoute)



const OrganizationRoute = require('./Api/Routes/Organization.routes')
app.use('/OrgApi',OrganizationRoute)



const LogDetailsRoute = require('./Api/Routes/logDetails.routes')
app.use('/LogApi',LogDetailsRoute)



const SitesRoute = require('./Api/Routes/Site.routes')
app.use('/SiteApi',SitesRoute)




const UserRoute = require('./Api/Routes/User.routes')
app.use('/UserApi',UserRoute)



const PackageRoute = require('./Api/Routes/Package.routes')
app.use('/PackageApi',PackageRoute)



const ThemeRoute = require('./Api/Routes/Orgtheme.routes')
app.use('/OrgThemApi',ThemeRoute)


const SubscriptionRoute = require('./Api/Routes/subcription.routes')
app.use('/SubApi',SubscriptionRoute)


const InvoiceRoute = require('./Api/Routes/Invoice.routes')
app.use('/InvoiceApi',InvoiceRoute)




const PermissionRoute = require('./Api/Routes/Permissions.routes')
app.use('/PermissionApi',PermissionRoute)



const PermissionTypeRoute = require('./Api/Routes/PermissionType.routes')
app.use('/PermissionTypeApi',PermissionTypeRoute)




const RoleRoute = require('./Api/Routes/Role.routes')
app.use('/RoleApi',RoleRoute)



const ManageStorageRoute = require('./Api/Routes/ManageStorage.route')
app.use('/ManageStorageApi',ManageStorageRoute)


const OrgBannerRoute = require('./Api/Routes/OrgBanner.routes')
app.use('/OrgBanner',OrgBannerRoute)





const FolderRoute = require('./Api/Routes/Folders.routes')
app.use('/FolderApi',FolderRoute)





 const DocumentRoute = require('./Api/Routes/Document.routes')
 app.use('/DocumentApi',DocumentRoute)





mongoose.connect(MONGODB, /*We place this to remove warning*/{ useNewUrlParser:
  true, useUnifiedTopology: true }).then(()=>{
  console.log("Connected to MongoDB database")
  }).catch((e)=>{console.log(e.message)})


app.listen(PORT, () => {
  console.log(`gd Folder System listening on port ${PORT}`)
})