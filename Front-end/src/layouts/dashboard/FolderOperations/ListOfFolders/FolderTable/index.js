
import { useState } from "react";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";


import {
  
  navbarIconButton,

} from "examples/Navbars/DashboardNavbar/styles";


// Images
import FileImage from "assets/images/File-Image.jpg";
import FolderImage from "assets/images/Folder-Image.jpg";

import NotificationItem from "examples/Items/NotificationItem";

import Icon from "@mui/material/Icon";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";

export default function Data() {

  const [openMenu, setOpenMenu] = useState(false);



  const FolderData  = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1} >
      
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
      

      </MDBox>
      <MDBox  justifyContent="space-between"  >
               <IconButton
                size="small"
                disableRipple
                color="inherit"
                
              >
                <Icon >download</Icon>
              </IconButton>

              <IconButton
                size="small"
                disableRipple
                color="inherit"
              >
                <Icon >edit</Icon>
              </IconButton>
          </MDBox>
    </MDBox>
  );

    const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);

 



  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
      <NotificationItem icon={<Icon>contacts</Icon>} title="Contact Support" />
      <NotificationItem icon={<Icon>help</Icon>} title="Help Docs" />
       </Menu>
  );



  return {
    columns: [
      { Header: "Name", accessor: "Name", align: "left" },
      { Header: "Author", accessor: "Author", align: "left" },
      { Header: "Date", accessor: "CreatedAt", align: "center" },
      { Header: "Info", accessor: "Info", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: [
      { 
        Name: (<FolderData image={FolderImage} name="Home"  />),
        Author: (
        <MDBox>
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          Tuba Asif
       </MDTypography>
       </MDBox>),
        CreatedAt: (
          <MDBox>
           <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            23/04/18
          </MDTypography>
          </MDBox>
        ),
         Info: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            0
          </MDTypography>
        ),
        action: (
          <MDBox  justifyContent="space-between"  >
               <IconButton
                size="small"
                disableRipple
                color="inherit"
              >
                <Icon >share</Icon>
              </IconButton>

              <IconButton
                size="small"
                disableRipple
                color="inherit"
              >
                <Icon >local_activity</Icon>
              </IconButton>

              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                aria-controls="notification-menu"
                aria-haspopup="true"
                variant="contained"
                onClick={handleOpenMenu}
              >
                <Icon >settings</Icon>
              </IconButton>
              {renderMenu()}
          </MDBox>

        ),
      },


      { 
        Name: (<FolderData image={FileImage} name="Home/file.txt"  />),
        Author: (
        <MDBox>
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          Tuba Asif
       </MDTypography>
       </MDBox>),
        CreatedAt: (
          <MDBox>
           <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            23/04/18
          </MDTypography>
          </MDBox>
        ),
        Info: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            0
          </MDTypography>
        ),
        action: (
          <MDBox  justifyContent="space-between"  >
               <IconButton
                size="small"
                disableRipple
                color="inherit"
              >
                <Icon >share</Icon>
              </IconButton>

              <IconButton
                size="small"
                disableRipple
                color="inherit"
              >
                <Icon >local_activity</Icon>
              </IconButton>

              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                aria-controls="notification-menu"
                aria-haspopup="true"
                variant="contained"
                onClick={handleOpenMenu}
              >
                <Icon >settings</Icon>
              </IconButton>
          </MDBox>

          
        ),
      },
     
     
    ],
  };
}
