const express= require('express')
const app= express()

const OrgController = require('../../Controller/OrganizationControllers/Org.controller')
app.post('/CreateOrg',OrgController.CreateOrganizationAccount)
app.post('/LoginOrg',OrgController.OrganizationLogin)
app.post('/OrgChangePass',OrgController.Organization_ChangePassword)
app.post('/OrgResetPass',OrgController.Organization_ResetPassword)
app.post('/OrgDlt',OrgController.DeleteOrganizationAccount)
app.get('/DisplayAllOrg',OrgController.DisplayAllOrganizationData)
app.post('/updateOrgProfile',OrgController.UpdateProfileData)
app.post('/SetOrgStatus',OrgController.SetOrganizationStatus)
app.post('/LogOutOrg',OrgController.LogOutOrganization)
app.post('/viewOrgProfile',OrgController.ViewProfileData)

module.exports= app