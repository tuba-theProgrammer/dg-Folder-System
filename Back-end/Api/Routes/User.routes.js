const express= require('express')
const app= express()

const UserController = require('../../Controller/UsersControllers/users.controllers')
app.post('/CreateUser',UserController.CreateUser)
app.post('/LoginUser',UserController.LoginUser)
app.post('/UserChangePass',UserController.UserChangePass)
app.post('/UserResetPass',UserController.UserResetPass)
app.post('/UserDlt',UserController.DeleteUser)
app.get('/DisplayAllUsers',UserController.displayAllUser)
app.post('/updateUserProfile',UserController.UpdateUserProfile)
app.post('/logOutUser',UserController.LogOutUser)
app.post('/viewUserProfile',UserController.ViewProfileData)
app.post('/ManageUserRole',UserController.ManageUserRole)

module.exports= app