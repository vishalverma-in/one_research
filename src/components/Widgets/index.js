import React from "react";
import {useState} from 'react';
import "./Widgets.css";
import InfoIcon from "@mui/icons-material/Info";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const Widgets = () => {
  const newArticle = (heading, subtitle) => (
    <div className="widgets__article">
      <div className="widgets__articleLeft">
        <FiberManualRecordIcon />
      </div>
      <div className="widgets__articleRight">
        <h4>{heading}</h4>
        <p>{subtitle}</p>
      </div>
    </div>
  );
  const [hasClicked, setHasClicked] = useState(false);
 const[isHovering, setIsHovering] = useState(false);
  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const handleClick = () =>
    {
    setHasClicked(true);
    }

  return (
    <div className="widgets">
      <div className="widgets__header">
      <div class=" text-center" >
                    {/* Redirect to News */}
                    <a href="../news">
                    <button class="btn btn-primary" style={{backgroundColor: "#0074b1"}}  title="Research News">News</button>
                    </a>
      </div>
      <div onClick = {handleClick} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}><InfoIcon /></div>

      </div>

      {newArticle("ISRO gave Ankit Singh a research grant worth Rs 55000", "Top news - 9299 readers")}
      {newArticle(
        "DRDO gave Sumit Singh a research grant worth Rs 42000",
        "Top news - 8027 readers"
      )}
      {newArticle(
        "IISC gave Nikhil Sharma a research grant worth Rs 21000",
        "Top news - 19498 readers"
      )}
      
    </div>
  );
};

export default Widgets;
