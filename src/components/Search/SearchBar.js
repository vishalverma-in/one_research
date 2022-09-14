import React from "react";
import "./SearchBar.css";
import SearchIcon from "@mui/icons-material/Search";
import data from "./Data.json";

const SearchBar = ({ placeholder, value }) => {
  return (
    <>
      <div className="search">
        <div className="searchInput">
          <input className="input" type="text" placeholder={placeholder} />
          <div className="searchIcon">
            <SearchIcon />
          </div>
        </div>
      </div>
      <div className="dataResult">

      </div>
    </>
  );
};

export default SearchBar;
