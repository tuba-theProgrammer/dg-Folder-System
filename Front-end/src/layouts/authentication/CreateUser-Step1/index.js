
// react-router-dom components
import { Link } from "react-router-dom";
import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import { ButtonGroup } from "@mui/material";


// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";


import Box from '@mui/material/Box';
// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

function Cover() {
  


  const [getDisplayName,setDisplayName] = useState('Name')
  const [getEmail,setEmail] = useState('Email')
  const [getPass,setPass] = useState('Pass')
  const [getUsername,setUsername]= useState('Username')
  const [getConfirmPass,setConfirmPass] = useState('Confirm Pass')
  const [getData,setData] = useState()
   
  const NameOnchange=(e)=>{
    //console.log(e.target.value)
    setDisplayName(e.target.value)
}

  const PassOnchange=(e)=>{
    //console.log(e.target.value)
    setPass(e.target.value)
}

 const EmailOnchange = (e)=>{
 // console.log(e.target.value)
    setEmail(e.target.value)
} 

const ConfirmPassOnChange = (e)=>{
  // console.log(e.target.value)
     setConfirmPass(e.target.value)
 } 

 const UsernameOnchange = (e)=>{
  // console.log(e.target.value)
     setUsername(e.target.value)
 } 

 const NextStepCall =()=>{
  if(getPass==getConfirmPass){
     setData(
      {
        displayName:getDisplayName,
        username:getUsername,
        pass:getPass,
        Email:getEmail,
      }
     )
    

    }else{

    }

    console.log(getData)
 }
 

  return (
    <CoverLayout>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            CREATE USER (Step1)
          </MDTypography>
        
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="text" label="Display Name"  variant="standard" fullWidth onChange={NameOnchange} />
            </MDBox>

            <MDBox mb={2}>
              <MDInput type="text" label="Username" variant="standard" fullWidth onChange={UsernameOnchange}/>
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="email" label="Email" variant="standard" fullWidth onChange={EmailOnchange}/>
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Password" variant="standard" fullWidth onChange={PassOnchange}/>
            </MDBox>

            <MDBox mb={2}>
              <MDInput type="password" label="Confirm Password" variant="standard" fullWidth onChange={ConfirmPassOnChange}/>
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Checkbox />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Notify User&nbsp;
              </MDTypography>
             
            </MDBox>

       
        
            <Box sx={{ m: '2rem' }}  mt={3} mb={1}  display="flex" justifyContent="space-between">
            <MDButton sx={{ m: '1rem' }} variant="gradient" color="info" fullWidth>
                Back
              </MDButton>
              <MDButton sx={{ m: '1rem' }}  variant="gradient" color="info" fullWidth 
              
              onClick={
                   NextStepCall
              }> 
                Next Step
              </MDButton>
              
            
              </Box>
       
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
