// Homepage of the website
// Importing necessary dependencies
import React, { useEffect, useState } from "react";
import "./homepage.css";
import drdo from "./images/drdo.png"
import aerb from "./images/aerb.png"
import brns from "./images/brns.png"
import csir from "./images/csir.jpg"
import dbt from "./images/dbt.jpg"

const Homepage = () => {
  //return
    return (
        <>
        {/*Basic HTML*/}
            <div className="mainDiv">
                <div className="main">
                    <div className="left-side">
                        <div className="login-img">
                           
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/1162/1162914.png"
                                alt="Research Grant"
                            />
                           
                            <h1>OneResearch</h1>
                        </div>
                        <div className="text">Your one-stop access to all research grants</div>
                        <br></br>
                        <a href="/login" style={{ color: 'white', margin: '0 1em 1em 0' }} type="button" class="btn btn-primary">
                            Login 
                        </a>
                        <a href="/signup" style={{ margin: '0 0 1em 0' }} type="button" class="btn btn-outline-primary">
                            Signup
                        </a>
                    </div>
                    <div className="right-sides">
                         <br></br>
                        <img src="https://flowcite.com/wp-content/uploads/2021/04/Business-Marketing-1-1.png"></img>
                    </div>
                </div>
                <div className="container2"> 
                <div className="main2">
                    <h1 style={{color: 'white'}}><b>Top Organizations Providing Grants on OneResearch</b></h1>
                    <hr></hr>
                    <div className="orgs">
                       <a href = "https://www.drdo.gov.in/"> <img className="orgimages" src={drdo}/> 
                       </a>
                        <img className="orgimages" src={aerb}
                        />
                        <img className="orgimages"
                            style={{ borderRadius: 100 }}
                            src={brns}
                        />
                        <img className="orgimages"
                            style={{ borderRadius: 100 }}
                            src={csir}
                        />
                        <img className="orgimages"
                            style={{ borderRadius: 100 }}
                            src={dbt}
                        />
                    </div>
                    <hr></hr>
                </div>
                <div className="main3">
                    <div className="left-text">
                        <h2 style={{color: 'white'}} > Post you grant for millions of researchers to see</h2>
                    </div>
                    <div className="b_left">
                    <div className="right-button">
                        <br></br>
                    <a href="/signup" type="button" class="btn btn-outline-primary">
                            Register
                        </a>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </>
    )
};

export default Homepage;
