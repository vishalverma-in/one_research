// User-Login Component
// Importing necessary dependencies
import React, {useState } from "react";
import "./Login.css";
import { auth } from "../../firebase";
import { useDispatch } from "react-redux";
import { login } from "../../features/userSlice";

const Login = ({}) => {
  const [name, setName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  // Login
  const loginToApp = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userAuth) => {
        if(userAuth.user.emailVerified){
        dispatch(
          login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            displayName: userAuth.user.displayName,
            photoUrl: userAuth.user.photoURL,
          })
        );
        }
      })
      .catch((error) => alert(error));
  };

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
      <div className="login-imgs">
        <a href =  "https://oneresearch.netlify.app/">
        <img
          src="https://cdn-icons-png.flaticon.com/512/1162/1162914.png"
          alt="Research Grant" 
        />
        </a>
        <h1 style={{ color: "#667292", fontSize: "10vh" }}>OneResearch</h1>
      </div>
      
      <div className="right-side">
                         
                        <img src="https://flowcite.com/wp-content/uploads/2021/04/Business-Marketing-1-1.png"></img>
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
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={loginToApp} type="submit" class="btn btn-primary" >
            Sign In
          </button>

          </form>
        {/* Form Ends */}
        <br></br>
        <div className="forgot"><a href="/forgot_password" style={{color: "#667292"}}> <br></br>Forgot Password ?</a></div>
      
      </div>
    </div>
  );
};
export default Login;
