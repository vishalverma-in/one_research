// Frontend part of the View-Post Component
// Importing the required dependencies
import React, { forwardRef } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../features/userSlice";

const Comment = forwardRef(({ postId, name, description,timestamp, message }, ref) => {
  const user = useSelector(selectUser);
  var utcSeconds = timestamp.toDate();
  // Return
  return (
    // Basic HTML
    <div class="mb-1" style={{borderRadius: "5px", fontSize: "0.9em"}}>
      <li class="list-group-item d-flex justify-content-between align-items-start">
        <div class="ms-2 me-auto">
        <div  style={{fontSize: "0.9em"}}><span><b>{name}</b> <em> {description}</em></span></div>
          {message}
        </div>
        <span class="text-black-50" style={{fontSize: 12}}>{utcSeconds.getDate()}/{utcSeconds.getMonth()}/{utcSeconds.getFullYear()} </span>
        <span class="badge bg-primary rounded-pill"></span>
      </li>
    </div>
  );
});

export default Comment;