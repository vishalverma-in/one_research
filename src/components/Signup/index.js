// Signup Component
// Importing necessary dependencies
import React, { useState } from "react";
import "./Login.css";
import { auth } from "../../firebase";
import { useDispatch } from "react-redux";
import { login } from "../../features/userSlice";
import { db } from "../../firebase.js";
import drdo from "./images/drdo.png";
import aerb from "./images/aerb.png";
import brns from "./images/brns.png";
import csir from "./images/csir.jpg";
import dbt from "./images/dbt.jpg";

const Signup = ({}) => {
  const [name, setName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const dispatch = useDispatch();

  function sendEmailVerification() {
    // [START auth_send_email_verification]
    auth.currentUser.sendEmailVerification()
      .then(() => {
        // Email verification sent!
        // ...
      });
    // [END auth_send_email_verification]
  }
  // Signup Function
  const register = (e) => {
    e.preventDefault();
    if (!name) {
      return alert("Please enter a full name");
    }

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userAuth) => {
        userAuth.user
          .updateProfile({
            displayName: name,
            photoURL: profilePic,
          })
          .then(() => {
            sendEmailVerification(userAuth.user);
            window.alert("A mail is sent on your registered email-id. Kindly click on the link to verify it.");
            if(userAuth.user.emailVerified){
            dispatch(
              login({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: name,
                photoURL: profilePic,
              })
            );
            }
          });
      })
      .catch((error) => alert(error));

    db.collection("role").doc(email).set({
      name : name,
      email: email,
      role: role,
    });
  };
  // Return Component

  return (
    // Basic HTML
    <div className="login">
      <a
        href="/"
        style={{ color: "white" }}
        type="button"
        class="home-btn btn btn-primary"
      >
        Home
      </a>
      <div className="login-img">
        <a href="https://oneresearch.netlify.app/">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1162/1162914.png"
            alt="Research Grant"
          />
        </a>
        <h1 style={{ color: "#667292", fontSize: "10vh" }}>OneResearch</h1>
      </div>
      <br></br>
      <div className="login1">
        {/* Login Input Form */}
        <form>
          <input
            type="text"
            placeholder={"Name of Student/Organisation"}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label class="labels" style={{color: "white" }}>Role</label>
          <select
            name="role"
            id="role"
            class="form-control"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{margin: "5px" }}
            required
          >
            <option>Select-Role</option>
            
            <option value="student">Student</option>
            <option value="organisation">Organisation</option>
          </select>
          <br />
          <button onClick={register} type="submit" class="btn btn-primary">
            Sign In
          </button>
        </form>
      </div>

      <br></br>
      {/* Organisation Images */}
      <h3 style={{ margin: "10vh 0 0 0",color: "whitesmoke" }}>
        Top Organizations Providing Grants on OneResearch
      </h3>
      <div className="orgs" style={{ margin: "3vh 0 10vh 0" }}>
        <a href="#">
          <img className="orgimages" src={drdo} />
        </a>
        <a href="#">
          <img className="orgimages" src={aerb} />
        </a>
        <a href="#">
          <img className="orgimages" style={{ borderRadius: 100 }} src={brns} />
        </a>
        <a href="#">
          <img className="orgimages" style={{ borderRadius: 100 }} src={csir} />
        </a>
        <a href="#">
          <img className="orgimages" style={{ borderRadius: 100 }} src={dbt} />
        </a>
      </div>

      <div className="right-side"></div>
    </div>
  );
};
export default Signup;
