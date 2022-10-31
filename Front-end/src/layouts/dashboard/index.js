
// @mui material components
import Grid from "@mui/material/Grid";
import React from "react";
import { useState,useEffect } from "react";
import UploadIcon from '@mui/icons-material/Upload';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import AddIcon from '@mui/icons-material/Add';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Heading from 'components/MDHeading'
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";

import NotificationItem from "examples/Items/NotificationItem";



// Tabs called components
import ListOfFolders from 'layouts/dashboard/FolderOperations/ListOfFolders'


//  Folders Api called
import {SERVER_URL} from '../../RequestManager/RequestUrls/generalUrls'
import {SendRequestToBackend} from '../../RequestManager/Request-manager'
import {CREATE_FOLDER_URL} from '../../RequestManager/RequestUrls/FolderFileUrls'


// Dialog use components
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { FileUploader } from "react-drag-drop-files";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

function Dashboard() {
  

  // upload file operations
  const [openUpload, setOpenUpload] = React.useState(false);
  const handleOpenUpload = () => setOpenUpload(true);
  const handleCloseUpload = () => setOpenUpload(false);

  
  const fileTypes = ["JPEG", "PNG", "GIF","JPG","TXT","PDF","DOC"];

  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };


  // Add file Operations

  const [openAddFolder, setOpenAddFolder] = React.useState(false);
  const handleOpenAddFolder = () => setOpenAddFolder(true);
  const handleCloseAddFolder = () => setOpenAddFolder(false);

  const [getFolderName,setFolderName] = useState('Name')
  const [getResponseData, setResponseData] = useState('response')
   
  const FolderNameOnchange=(e)=>{
    //console.log(e.target.value)
    setFolderName(e.target.value)
}

   
 function CreateFolderCall(){
  const requestData={
    "User_ID": localStorage.getItem("User_ID"),
    "FolderName":getFolderName,
    "Previous_Folder_ID":localStorage.getItem('Folder_ID')
   }

   const result = SendRequestToBackend(SERVER_URL,"POST",CREATE_FOLDER_URL,requestData)
   result.then(
    data=>{
      setResponseData(data)
    }
   )
   console.log(getResponseData)
 }

 
 function CreateDocumentCall(){
  const requestData={
    "User_ID": localStorage.getItem("User_ID"),
    "FolderName":getFolderName,
    "Previous_Folder_ID":localStorage.getItem('Folder_ID')
   }

   const result = SendRequestToBackend(SERVER_URL,"POST",CREATE_FOLDER_URL,requestData)
   result.then(
    data=>{
      setResponseData(data)
    }
   )
 }



  // Download All
  const [openDownloadMenu, setOpenDownloadMenu] = useState(false);
  const handleOpenDownloaMenu = (event) => setOpenDownloadMenu(event.currentTarget);
  const handleCloseDownloadMenu = () => setOpenDownloadMenu(false);
 
  // Render the Download menu
  const renderDownloaMenu = () => (
    <Menu
      anchorEl={openDownloadMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openDownloadMenu)}
      onClose={handleCloseDownloadMenu}
      sx={{ mt: 2 }}
    >
      <NotificationItem icon={<Icon>contacts</Icon>} title="CSV" onClick={CsvDownloadOnclick} />
      <NotificationItem icon={<Icon>help</Icon>} title="PDF" onClick={PdfFileOnClick}/>
       </Menu>
  );

  function CsvDownloadOnclick(){
    console.log("csv download Call")
  }

  function PdfFileOnClick(){
    console.log("pdf download Call")
  }



  return (
    <DashboardLayout>
      <DashboardNavbar />
      
      <Grid 
        container
        direction="column"
        >
          <Grid item>
              <Grid container direction="row">
              <Grid item xs={8} style={{borderBottom:"1px solid #7ea69f"}}>
                <Heading text={"Folder/Files"} fontSize={"2rem"} fontWeight="bold"/>
                <Heading text={"Here You Can Manager Folder/File and User Roles "} fontSize={"1rem"}/>
           </Grid>
         <Grid item xs={4}  style={{textAlign: "center",borderBottom:"1px solid #7ea69f",borderLeft:"1px solid #7ea69f"}}>
             
         </Grid>
         
              </Grid>
              <Grid item style={{borderBottom:" solid #7ea69f"}}>
             <Grid container direction="row" justifyContent="right">
              <Grid item xs={4}>
              <MDBox  display="flex" justifyContent="space-between">
            <MDButton endIcon={<UploadIcon />} sx={{ m: '1rem',bgcolor:"#5BB318" ,color:"#F6F8FE ",
             '&:hover': {
              background: "#2B7A0B",
              },}} fullWidth
              onClick={
                ()=>{
                  handleOpenUpload()
                }
              }
             >
                Upload
              </MDButton>
              <MDButton endIcon={<AddIcon />} sx={{ m: '1rem',bgcolor:"#5BB318" ,color:"#F6F8FE ",
               '&:hover': {
                background: "#2B7A0B",
                },}} fullWidth
              
                onClick={
                  ()=>{
                    handleOpenAddFolder()
                  }
                }
               >
              
                Folder
              </MDButton>
              <MDButton endIcon={<FileDownloadIcon />} sx={{ m: '1rem',bgcolor:"#5BB318" ,color:"#F6F8FE ",
              '&:hover': {
                background: "#2B7A0B",
                },
              }} fullWidth
              
               onClick={
               
                  handleOpenDownloaMenu
                
              }
                 >
                 Download All
              </MDButton>
              {renderDownloaMenu()}
              </MDBox>
              </Grid>
             </Grid>
          
              </Grid>
          </Grid>
          <Grid item>
          <ListOfFolders/>
          <div>
          <BootstrapDialog
        onClose={handleCloseUpload}
        aria-labelledby="customized-dialog-title"
        open={openUpload}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseUpload}>
        <MDTypography variant="h6" fontWeight="medium" color="Black" mt={1}>
           Upload Folder
          </MDTypography>
        </BootstrapDialogTitle>
        <DialogContent dividers>
        <Grid
      container
  spacing={0}
  direction="column"
  alignItems="center"
  justifyContent="center"
 
      >
 
 <Grid item> 
  <MDBox pt={4} pb={3} px={3}>
  <MDBox
     mb={5}
          textAlign="center"
        >
        </MDBox>
          <MDBox component="form" role="form">

            <MDBox mb={2}>
            <FileUploader
        multiple={true}
        handleChange={handleChange}
        name="file"
        types={fileTypes}
      />
      <MDTypography variant="h6" fontWeight="medium" color="Black" mt={1}
        textAlign="center"
      >
        {file ? `File name: ${file[0].name}` : "no files uploaded yet"}
        </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
 </Grid>
      </Grid>
        </DialogContent>
        <DialogActions>
         <MDBox   mt={3} mb={1}  display="flex" justifyContent="space-between">
         <MDButton sx={{ m: '1rem' ,color:"#C70039"}}  
          autoFocus onClick={handleCloseUpload}>
                Cancel
              </MDButton>
              <MDButton sx={{ m: '1rem',color:"#5BB318" }} fullWidth 
              onClick={CreateDocumentCall}
            > 
                Upload
              </MDButton>
              
            
              </MDBox>
      
        </DialogActions>
      </BootstrapDialog>
      </div>




      <div>
          <BootstrapDialog
        onClose={handleCloseAddFolder}
        aria-labelledby="customized-dialog-title"
        open={openAddFolder}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseAddFolder}>
        <MDTypography variant="h6" fontWeight="medium" color="Black" mt={1}>
           Add Folder
          </MDTypography>
        </BootstrapDialogTitle>
        <DialogContent dividers>
        <Grid
      container
  spacing={0}
  direction="column"
  alignItems="center"
  justifyContent="center"
 
      >
 
 <Grid item> 
  <MDBox pt={4} pb={3} px={3}>
 
          <MDBox component="form" role="form">

            <MDBox mb={2}>
              <MDInput  variant="outlined" type="text" label="Folder Name"  fullWidth onChange={FolderNameOnchange} />
            </MDBox>
         
           
       
          </MDBox>
        </MDBox>
 </Grid>
 
      </Grid>
     
        </DialogContent>
        <DialogActions>
              <MDBox   mt={3} mb={1}  display="flex" justifyContent="space-between">
            <MDButton sx={{ m: '1rem',color:"#C70039"}}  fullWidth   autoFocus onClick={handleCloseAddFolder}>
                Cancel
              </MDButton>
              <MDButton sx={{ m: '1rem',color:"#5BB318" }} fullWidth 
              onClick={CreateFolderCall}
            > 
                ADD
              </MDButton>
              
            
              </MDBox>
        </DialogActions>
      </BootstrapDialog>
      </div>



          </Grid>
      </Grid>
    </DashboardLayout>
  );
}

export default Dashboard;
