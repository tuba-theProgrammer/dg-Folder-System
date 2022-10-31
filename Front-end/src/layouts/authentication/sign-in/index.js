
import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";


// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";


// import Login Urls 
import {LOG_SIGNIN_URL} from '../../../RequestManager/RequestUrls/LoginDetails'
import {SERVER_URL} from '../../../RequestManager/RequestUrls/generalUrls'
import {SendRequestToBackend} from '../../../RequestManager/Request-manager'
import { LOGIN_ADMIN_URL } from "RequestManager/RequestUrls/AdminUrls";
import { LOGIN_ORG_URL } from "RequestManager/RequestUrls/OganizationUrls";
import { LOGIN_SITE_URL } from "RequestManager/RequestUrls/SiteUrls";
import { LOGIN_USER_URL } from "RequestManager/RequestUrls/UsersUrls";
import {
  DATA_NOT_FOUND,
  CONTENT_NOT_FOUND,
  ERROR_MESSAGE,
  INCORECT_EMAIL_PASS,
  LOGIN_SUCCESSFULL
}from '../../../RequestManager/RequestCode'

function Basic() {
  const [rememberMe, setRememberMe] = useState(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const [getEmail,setEmail] = useState('Email')
  const [getPass,setPass] = useState('Pass')
  const [getResponseData,setResponseData] = useState('data')

 function SignInAccount(){
    
          const requestData={
        "username":getEmail,
        "pass":getPass
       }
       const result = SendRequestToBackend(SERVER_URL,"POST",LOG_SIGNIN_URL,requestData)
       result.then(
        data=>{
          setResponseData(data)
        }
       )

      if(getResponseData.message){
        alert(getResponseData.message)
      }else{
        alert("please enter Data First")
      }

      if(getResponseData.resCode == DATA_NOT_FOUND){
             

      }else if(getResponseData.resCode ==LOGIN_SUCCESSFULL){
          
           const loginDetailsData = getResponseData.user
           console.log(loginDetailsData)
           localStorage.setItem("Folder_ID",loginDetailsData.Folder_ID)
           localStorage.setItem("User_ID",loginDetailsData.LogUserId)
           if(loginDetailsData.Log_TableName=="Admin"){
             
            const result = SendRequestToBackend(SERVER_URL,"POST",LOGIN_ADMIN_URL,requestData)
            result.then(
             data=>{
               console.log(data)
             }
            )
           }
           else if(loginDetailsData.Log_TableName=="organization"){
            const result = SendRequestToBackend(SERVER_URL,"POST",LOGIN_ORG_URL,requestData)
            result.then(
             data=>{
               console.log(data)
             }
            )
           }
           else if(loginDetailsData.Log_TableName=="user"){
            const result = SendRequestToBackend(SERVER_URL,"POST",LOGIN_USER_URL,requestData)
            result.then(
             data=>{
               console.log(data)
             }
            )
           }
           else if(loginDetailsData.Log_TableName=="site"){
            const result = SendRequestToBackend(SERVER_URL,"POST",LOGIN_SITE_URL,requestData)
            result.then(
             data=>{
               console.log(data)
             }
            )
            
          }

      }else if(getResponseData.resCode ==CONTENT_NOT_FOUND){

      }
      else if(getResponseData.resCode ==ERROR_MESSAGE){
       
      }
      else if(getResponseData.resCode == INCORECT_EMAIL_PASS){

      }
 
     
      
  }   
   
  const PassOnchange=(e)=>{
        console.log(e.target.value)
        setPass(e.target.value)
  }
  
  const EmailOnchange = (e)=>{
    console.log(e.target.value)
    setEmail(e.target.value)

  } 


  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
           
          </Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="email" label="Email" fullWidth onChange={EmailOnchange}/>
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Password" fullWidth onChange={PassOnchange}/>
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={
                SignInAccount
              }>
                sign in
              </MDButton>
            </MDBox>
         
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
