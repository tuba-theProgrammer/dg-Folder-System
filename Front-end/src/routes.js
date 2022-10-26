// import Dashboard from "layouts/dashboard";
// import Tables from "layouts/tables";
// import Billing from "layouts/billing";
// import RTL from "layouts/rtl";
// import Notifications from "layouts/notifications";
// import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import CreateUserStep1 from "layouts/authentication/CreateUser-Step1";
import CreateUserStep2 from "layouts/authentication/CreateUser-Step2";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
 
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "Create User Step1",
    key: "sign-up1",
    icon: <Icon fontSize="small">assignment</Icon>,
    //route: "/authentication/sign-up",
    route: "/",
    component: <CreateUserStep1 />,
  },
  {
    type: "collapse",
    name: "Create User step2",
    key: "sign-up2",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/step2",
    component: <CreateUserStep2 />,
  },
];

export default routes;
