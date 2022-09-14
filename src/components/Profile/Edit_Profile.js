//Script for editing and updating personal and academic details.
// Importing dependencies
import React from "react";
import img from "./altimage.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Profile.css";
import { db } from "../../firebase.js";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

// Defining variables
const Edit_Profile = () => {
  const user = useSelector(selectUser);
  const [profile, setProfile] = useState([]);
  const [state, setstate] = useState("");
  const [postcode, setpostcode] = useState("");
  const [mobile, setmobile] = useState("");
  const [education, seteducation] = useState("");
  const [college, setCollege] = useState("");
  const [year, setYear] = useState();
  const [degree, setDegree] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [about, setAbout] = useState("");

  // Function to update the data-items in the database
  const sendPost = (e) => {
    e.preventDefault();

    db.collection("profile")
      .doc(user.email)
      .set({
        state: state,
        postcode: postcode,
        education: education,
        mobile: mobile,
        email: user.email,
        college: college,
        year: year,
        degree: degree,
        specialization: specialization,
        about: about,
      })
      .then((docRef) => {
        alert("Information updated successfully");
      })
      .catch((error) => {
        console.log();
      });
  };
  // Return
  return (

    <div class="container rounded bg-white mt-5 mb-5">
      <div class="row">
        <div class="col-md-5 border-right">
          <div class="p-3 py-5">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h4 class="title">EDIT PROFILE</h4>
            </div>
            <div><label class = "labels" id="notice">*Enter the necessary details in every
            input field to update the information successfully.</label></div>

            <form>
              <h4 class="heading-1">Personal Details</h4>
              {/* <div class="profile-image">
                <img class="image" src={img} alt="" />
              </div> */}
              {/* <div class="col-md-12">
                <input type="file" id="profile-img" name="img" accept="img" />
              </div> */}
              <div class="row mt-1">
                <div class="col-md-12">
                  <label class="labels">Name</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="First-Name"
                    value={user.displayName}
                  />
                </div>
                <div class="col-md-12">
                  <label class="labels">Mobile Number</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Phone Number"
                    value={mobile}
                    onChange={(e) => setmobile(e.target.value)}
                    required
                  />
                </div>
                <div class="col-md-12">
                  <label class="labels">Postcode</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Postcode"
                    value={postcode}
                    onChange={(e) => setpostcode(e.target.value)}
                    required
                  />
                </div>
                <div class="col-md-12">
                  <label class="labels">State/Union Territory</label>
                  <select
                    name="state"
                    id="state"
                    class="form-control"
                    value={state}
                    onChange={(e) => setstate(e.target.value)}
                    required
                  >
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Andaman and Nicobar Islands">
                      Andaman and Nicobar Islands
                    </option>
                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                    <option value="Assam">Assam</option>
                    <option value="Bihar">Bihar</option>
                    <option value="Chandigarh">Chandigarh</option>
                    <option value="Chhattisgarh">Chhattisgarh</option>
                    <option value="Dadar and Nagar Haveli">
                      Dadar and Nagar Haveli
                    </option>
                    <option value="Daman and Diu">Daman and Diu</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Lakshadweep">Lakshadweep</option>
                    <option value="Puducherry">Puducherry</option>
                    <option value="Goa">Goa</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                    <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                    <option value="Jharkhand">Jharkhand</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Manipur">Manipur</option>
                    <option value="Meghalaya">Meghalaya</option>
                    <option value="Mizoram">Mizoram</option>
                    <option value="Nagaland">Nagaland</option>
                    <option value="Odisha">Odisha</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Sikkim">Sikkim</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Tripura">Tripura</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Uttarakhand">Uttarakhand</option>
                    <option value="West Bengal">West Bengal</option>
                  </select>
                </div>
                <div class="col-md-12">
                  <label class="labels">Email ID</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Email-id"
                    value={user.email}
                  />
                </div>
                <div class="col-md-12">
                  <label class="labels">Highest Educational Qualification</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Education"
                    value={education}
                    onChange={(e) => seteducation(e.target.value)}
                    required
                  />
                </div>
              
                <h4 class="heading-2">Academic Details</h4>
                <div class="col-md-12">
                  <label class="labels">College/University</label>
                  <input
                    type="text"
                    class="form-control"
                    value={college}
                    placeholder = "College/University"
                    onChange={(e) => setCollege(e.target.value)}
                    required
                  />
                </div>
                <div class="col-md-12">
                  <label class="labels">Degree</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Degree"
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    required
                  />
                </div>
                <div class="col-md-12">
                  <label class="labels">Year of graduation(expected)</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Year of Graduation"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    required
                  />
                </div>
                <div class="col-md-12">
                  <label class="labels">Specialization</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Specialization"
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                    required
                  />
                </div>
                <div class="col-md-12">
                  <label class="labels">About</label>
                  <textarea
                    id="about"
                    type="text"
                    class="form-control"
                    placeholder="Something about yourself"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </div>
                <div class="mt-5 text-center">
                  <button
                    onClick={sendPost}
                    class="btn btn-primary profile-button"
                    type="submit"
                  >
                    Save Profile
                  </button>
                  <button
                    class="btn btn-primary profile-button"
                    type="submit"
                    id="profile_button"
                  >
                    <a href="/view_profile" id="view_profile">
                      View Profile
                    </a>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit_Profile;
