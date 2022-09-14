// Frontend part of the Organisation List Component
// Importing the required dependencies
import React, { forwardRef, useState, useEffect } from "react";
import CreateIcon from "@mui/icons-material/Create";
// import "./Org_List.css";
import { db, onChildRemoved  } from "../../firebase.js";
import firebase from "firebase/compat/app";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import FlipMove from "react-flip-move";

const Org_List = forwardRef(
  ({ name, email, role}, ref) => {

    // Return
    return (
        <ul class="list-group list-group-flush">
          <li class="list-group-item">{email}</li>
        </ul>
    );
  }
);

export default Org_List;