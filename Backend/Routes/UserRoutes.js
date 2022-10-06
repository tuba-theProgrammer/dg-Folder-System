const express= require('express')
const app= express()

const UserController = require('../Controller/UserController')
app.post('/createUser',UserController.UserCreateAccount)
app.post('/UserSignIn',UserController.UserSignIn);
app.post('/setUserStatus',UserController.setUserStatus)
app.post('/UpdateUser',UserController.EditUser)
app.post('/SelfUpdateUser',UserController.UserSelfUpdateSettings)
app.get('/DisplayAllUser',UserController.ViewAllUsers)
app.get('/DisplayOneUser',UserController.ViewOneUser)
app.get('/ResetUserPass',UserController.UserResetPass)
app.get('/setNewUserPass',UserController.UserChangePassword)


module.exports= app
