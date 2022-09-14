import React, { useEffect } from "react";
import "./App.css";
import { db } from "./firebase.js";
import Feed from "./components/Feed";
import Header from "./components/Header";
import Header_Org from "./components/Header_Org";
import Login from "./components/Login";
import Forgot from "./components/Login/Forgot";
import Home_Org from "./components/Home_Org";
import Signup from "./components/Signup";
import Sideabar from "./components/Sidebar";
import { login, logout, selectUser } from "./features/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "./firebase";
import Widgets from "./components/Widgets";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from "react";
import Notifications from './components/Notifications/Notifications';
import View_Profile from './components/Profile/View_Profile';
import View_Profile_Org from './components/Profile_Org/View_Profile_Org';
import Edit_Profile from './components/Profile/Edit_Profile';
import Edit_Profile_Org from './components/Profile_Org/Edit_Profile_Org';
import Homepage from "./components/Homepage";
import News from "./components/News";


function App() {
  const user = useSelector(selectUser);
  const [Role, setRole] = useState([]);
  const dispatch = useDispatch();
  var user_role;

  function fetchrole() {
      db.collection("role").where("email", "==", user.email)
                    .get()
                    .then(function(querySnapshot) {
                        querySnapshot.forEach(function(doc) {
                            // doc.data() is never undefined for query doc snapshots
                            setRole(doc.get("role"));
                            console.log(doc.id, " => ", doc.data()," =>",user_role);
                            
                        });
                    })
                    .catch(function(error) {
                        console.log("Error getting documents: ", error);
                    });
      return user_role;
  }
  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        //user is logged in
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
            photoUrl: userAuth.photoURL,
          })
        );
      } 
      if(!userAuth) {
        dispatch(logout({}));
      }
    })
  }, []);
  return (
    <div className="app">
      {!user ? (
        <>
          <div className="app__body">

            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Homepage />}></Route>
                <Route path="/login" element={<Login  />} />
                <Route path="/forgot_password" element={<Forgot  />} />
                <Route path="/signup" element={<Signup   />} />
              </Routes>

            </BrowserRouter>

          </div>
        </>
      ) : (
        <>
        {fetchrole()}
        {(Role === "organisation" ) ? (
          <>
          <Header_Org />
          <div className="app__body">

            <Sideabar />

            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home_Org />}></Route>
                <Route path="/login" element={<Home_Org />} />
                <Route path="/signup" element={<Home_Org />} />
                <Route path="/home" element={<Home_Org />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/view_profile_org" element={<View_Profile_Org />} />
                <Route path="/edit_profile_org" element={<Edit_Profile_Org />} />
                <Route path="/news" element={<News />} />
                
              </Routes>

            </BrowserRouter>

            <Widgets />
          </div>
        </>
        ) : (
          <>
          <Header />
          <div className="app__body">

            <Sideabar />

            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Feed />}></Route>
                <Route path="/feed" element={<Feed />} />
                <Route path="/login" element={<Feed />} />
                <Route path="/signup" element={<Feed />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/view_profile" element={<View_Profile />} />
                <Route path="/edit_profile" element={<Edit_Profile />} />
                <Route path="/news" element={<News />} />
              </Routes>

            </BrowserRouter>

            <Widgets />
          </div>
        </>

        )}
        </>
        
      )}
    </div>
  );
}

export default App;