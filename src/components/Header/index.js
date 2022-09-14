import React, { useState } from "react";
import "./Header.css";
import HeaderOption from "../HeaderOption";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SchoolIcon from "@mui/icons-material/School";
import { useDispatch, useSelector } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout, selectUser } from "../../features/userSlice";
import { auth } from "../../firebase";
import { Link, useHistory, useLocation, useNavigate } from "react-router-dom";
import AssignmentIcon from '@mui/icons-material/Assignment';
import data from "../Search/Data.json"


const Header = () => {
  const dispatch = useDispatch();

  const [filteredData, setFilteredData] = useState([]);

  

  // const navigate = useNavigate();

  
  const logoutOfApp = () => {
    dispatch(logout());
    auth.signOut();
  };
  return (
    <div className="header">
      <div className="header__left">
        <img
          src="https://cdn-icons-png.flaticon.com/512/1162/1162914.png"
          alt="Research Grant"
        />

        <div className="header__search">
          {/* <SearchIcon />
          <input onChange={(event) => {setFilteredData(event.target.value)}} placeholder="Search Organizations" type="text" />
          <div className="searchResult">
            <p>{
              data.filter((val) => {
                if (filteredData == "")
                  {
                  return val;
                  }
                else if(val.name.toLowerCase().includes(filteredData.toLowerCase()))
                {
                  return val;
                  }
              }).map((val, key) => 
              {
                return { key };
                
              })
            }
            </p>
            
          </div> */}
        </div> 
      </div>

      <div className="header__right">
        <a href="/feed">
          <HeaderOption screen={false} Icon={HomeIcon} title="Home" />
        </a>
        <HeaderOption
          screen={false}
          Icon={AssignmentIcon}
          title="My-Applications"
        />
        <a href="/notifications">
          <HeaderOption
            // onClick={() => navigate(-1)}
            // component={Link} to="/notifications"
            screen={false}
            Icon={NotificationsIcon}
            title="Notifications"
          />
        </a>
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

export default Header;