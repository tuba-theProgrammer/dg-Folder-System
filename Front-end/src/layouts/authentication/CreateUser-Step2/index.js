
// react-router-dom components
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import { ButtonGroup } from "@mui/material";

import React from "react";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";


import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

function Cover(props) {
  
    useEffect(()=>{
        console.log(props.state)
    },[])

   
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

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
            CREATE USER (Step2)
          </MDTypography>
        
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
                <Box   display="flex" justifyContent="space-between">
                <MDInput type="text" label="Home Directory"  variant="standard" fullWidth  />
                <MDButton sx={{ mx: 'auto' }}  variant="gradient" color="info" fullWidth 
              > 
                Change Folder
              </MDButton>
                </Box>
             
            </MDBox>

            <MDBox mb={2}>
      <div>
   
      <MDButton mt={2} sx={{ mx: 'auto' }}  variant="info" color="info" 
      fullWidth 
      aria-controls={open ? 'demo-positioned-menu' : undefined}
      aria-haspopup="true"
      aria-expanded={open ? 'true' : undefined}
      onClick={handleClick}
              > 
             Role
              </MDButton>


      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
            </MDBox>
       
           
         

       
        
            <Box sx={{ m: '2rem' }}  mt={3} mb={1}  display="flex" justifyContent="space-between">
            <MDButton sx={{ m: '1rem' }} variant="gradient" color="info" fullWidth>
                Back
              </MDButton>
              <MDButton sx={{ m: '1rem' }}  variant="gradient" color="info" fullWidth 
              > 
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
