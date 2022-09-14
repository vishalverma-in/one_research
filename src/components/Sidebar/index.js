//Side-Bar Component
//Importing dependencies
import React from "react";
import "./Sidebar.css";
import { Avatar } from "@mui/material";
import { selectUser } from "../../features/userSlice";
import { useSelector } from "react-redux";
import { db } from "../../firebase.js";
import { useEffect, useState } from "react";
import FlipMove from "react-flip-move";
import Org_List from "../Org_List";

const Sidebar = () => {
  const user = useSelector(selectUser);
  const [Role, setRole] = useState([]);
  const [orgs, setOrgs] = useState([]);
  // Fetching posts from the database
  useEffect(() => {
    db.collection("role")
    .where("role","==","organisation")
      .onSnapshot((snapshot) =>
        setOrgs(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);
  // Function for fetching user-role
  function fetchrole() {
    db.collection("role").where("email", "==", user.email)
                  .get()
                  .then(function(querySnapshot) {
                      querySnapshot.forEach(function(doc) {
                          // doc.data() is never undefined for query doc snapshots
                          setRole(doc.get("role"));                    
                      });
                  })
                  .catch(function(error) {
                      console.log("Error getting documents: ", error);
                  });
    
}

  const recentItem = (topic) => {
    return (
      <div className="sidebar__recentItem">
        <span className="sidebar__hash">#</span>
        <p>{topic}</p>
      </div>
    );
  };

  // Get-URL function 
  function getUrl(){
    fetchrole();
    return Role == "student" ? '/edit_profile' :  '/edit_profile_org';
  }

  // Return
  return (
    // Basic HTML
    <div className="sidebar">
      <div className="sidebar__top">
        <img
          src="https://cdn3.vectorstock.com/i/1000x1000/40/87/abstract-molecular-background-for-medical-research-vector-20774087.jpg"
          alt=""
        />
        <Avatar src={user.photoUrl} className="sidebar__avatar">
          {user.displayName[0]}
        </Avatar>
        <h3><a href={getUrl()}>{user.displayName}</a></h3>
        <h4>{user.email}</h4>
      </div>

      <div className="sidebar__stats">
      </div>

      <div className="sidebar__bottom">
        <h6>Organizations</h6>
     
            {/* Mapping contents of the post and displaying them */}
            {orgs.map(({ id, data: { name, email, role} }) => (
              <Org_List
                name = {name}
                email = {email}
                role = {role}
              />
            ))}
     
        
      </div>
    </div>
  );
};

export default Sidebar;
