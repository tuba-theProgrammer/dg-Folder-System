
import Dashboard from "layouts/dashboard";
import Profile from 'layouts/Profile/ManageProfile'
// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Folders/Files",
    key: "Folder-Files",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Folders",
    component: <Dashboard />,

  },
  {
    type: "collapse",
    name: "Users",
    key: "Users",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Users",
    component: <Profile />,

  },
  {
    type: "collapse",
    name: "Activity",
    key: "Activity",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Activity",
    component: <Profile />,

  },

  {
    type: "collapse",
    name: "Settings",
    key: "Settings",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/Settings",
    component: <Profile />,

  },
  
 
  {
    type: "collapse",
    name: "Update Profile",
    key: "Update-Profile",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/profile",
    component: <Profile />,

  },
 
];

export default routes;
