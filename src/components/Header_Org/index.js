// Header Component for organisations
// Importing Dependencies
import React from "react";
import "./Header.css";
import HeaderOption from "../HeaderOption";
import HomeIcon from "@mui/icons-material/Home";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useDispatch } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "../../features/userSlice";
import { auth } from "../../firebase";
import AssignmentIcon from '@mui/icons-material/Assignment';

// Header Function
const Header_Org = () => {
  const dispatch = useDispatch();
  const logoutOfApp = () => {
    dispatch(logout());
    auth.signOut();
  };
  // Return
  return (
    // Basic HTML
    <div className="header">
      <div className="header__left">
        <img
          src="https://cdn-icons-png.flaticon.com/512/1162/1162914.png"
          alt="Research Grant"
        />
        <h2 className="heading">OneResearch</h2>
      </div>

      <div className="header__right">
        <a href="/login">
          <HeaderOption screen={false} Icon={HomeIcon} title="Home" />
        </a>
        <HeaderOption
          screen={false}
          Icon={AssignmentIcon}
          title="Applications"
        />
        <a href="/">
          <HeaderOption
            onClick={logoutOfApp}
            Icon={LogoutIcon}
            title="Logout"
            avatar={false}
          />
        </a>
      </div>
    </div>
  );
};

export default Header_Org;