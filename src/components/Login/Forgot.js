// Forgot Password Component
// Importing necessary dependencies
import React, {useState } from "react";
import "./Login.css";
import { auth } from "../../firebase";
import { useDispatch } from "react-redux";

const Forgot = ({}) => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const sendPasswordReset = (e) => {
    e.preventDefault();
    // [START auth_send_password_reset]
    auth.sendPasswordResetEmail(email)
      .then(() => {
        // Password reset email sent!
        window.alert("Email for resetting password sent!");
        // ..
      })
      .catch((error) => {

        // ..
      });
    // [END auth_send_password_reset]
  }

  // Return 
  return (
    // Basic HTML
    <div className="login">
      <a
        href="/"
        style={{ color: "white"}}
        type="button"
        class="home-btn btn btn-primary">
        Home
      </a>
      <div className="login-img">
        <a href =  "https://oneresearch.netlify.app/">
        <img
          src="https://cdn-icons-png.flaticon.com/512/1162/1162914.png"
          alt="Research Grant" 
        />
        </a>
        <h1 style={{ color: "#667292", fontSize: "10vh" }}>OneResearch</h1>
      </div>
          <br></br>
      <div className="login1">
        {/* Login Form */}
        <form>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={sendPasswordReset} type="submit" class="btn btn-primary" >
            Confirm
          </button>

        </form>
        {/* Form Ends */}
      </div>
    </div>
  );
};
export default Forgot;
