
import { useState,useMemo } from "react";


// @mui material components
import Card from "@mui/material/Card";


// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDDropDown from "components/MDDropDown"
import TimezoneSelect from 'react-timezone-select'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/Profile/Component/BasicLayout";
import {UPDATE_LOG_DETAILS} from '../../../RequestManager/RequestUrls/LoginDetails'

function Basic() {
    const [selectedTimezone, setSelectedTimezone] = useState({})
    const [getLanguage,setLanguage] = useState()
    const [getDateFormat,setDateFormat] = useState()
    const [getTimeFormat,setTimeFormat] = useState()


    const LanguagehandleChange = (event) => {
        setLanguage(event.target.value);
      };

      const DateFormatHandleChange = (event) => {
        setDateFormat(event.target.value);
      };
    

      const TimeFormatHandleChange = (event) => {
        setTimeFormat(event.target.value);
      };


      const UpdateProfile = ()=>{
           // fetch call to get Data of current user in profile
           
      }


  return (
    <BasicLayout>
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
            Manage Profile
          </MDTypography>
        
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="email" label="Email" fullWidth/>
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="text" label="Display Name" fullWidth/>
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Password" fullWidth/>
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Confirm Password" fullWidth/>
            </MDBox>
             <MDBox mb={3}>
                <MDTypography  mb={1}
                 fontWeight="regular"
                 fontSize='1rem'
                  color="text">
                    Time Zone
                </MDTypography>
             <TimezoneSelect
              value={selectedTimezone}
               onChange={setSelectedTimezone}
        />
             </MDBox>
          <MDBox mb={3}>
          <FormControl fullWidth >
        <InputLabel id="demo-simple-select-label">Language</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={getLanguage}
          label="Language"
          style={{ height: 50 }}
          onChange={LanguagehandleChange}
        >
          <MenuItem value={0}>English (United State)</MenuItem>
          <MenuItem value={1}>Spanish (Latin America)</MenuItem>
          <MenuItem value={2}>Portuguese (Brazil)</MenuItem>
          <MenuItem value={3}>Chinese (Simplified)</MenuItem>
        </Select>
      </FormControl>
          </MDBox>


          <MDBox mb={3}>
          <FormControl fullWidth >
        <InputLabel id="demo-simple-select-label">Time Format</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={getTimeFormat}
          label="Time Format"
          style={{ height: 50 }}
          onChange={TimeFormatHandleChange}
        >
          <MenuItem value={0}>HH:MM:SS,AM/PM (05:06:07 PM)</MenuItem>
          <MenuItem value={1}>H:M:S (3:4:5 PM)</MenuItem>
          <MenuItem value={2}>HH:MM:SS (15:04:05)</MenuItem>
          <MenuItem value={3}>H:M:S(15:4:5)</MenuItem>
        </Select>
      </FormControl>
          </MDBox>


          <MDBox mb={3}>
          <FormControl fullWidth >
        <InputLabel id="demo-simple-select-label">Date Format</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={getDateFormat}
          label="Date Format"
          style={{ height: 50 }}
          onChange={DateFormatHandleChange}
        >
          <MenuItem value={0}>MM/DD/YYYY (10/1/1999)</MenuItem>
          <MenuItem value={1}>DD/MM/YYYY (1/10/1999)</MenuItem>
          <MenuItem value={2}>YY/MM/DD (1999/10/01)</MenuItem>
          <MenuItem value={3}>Month D, Yr (2/17/2009)</MenuItem>
        </Select>
      </FormControl>
          </MDBox>

          <MDBox mt={3} mb={1}  display="flex" justifyContent="space-between">
            <MDButton sx={{ m: '1rem' }} variant="gradient" color="info" fullWidth>
                Cancel
              </MDButton>
              <MDButton sx={{ m: '1rem' }}  variant="gradient" color="info" fullWidth >
               Update
              </MDButton>
              
            
              </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
