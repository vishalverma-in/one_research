// View-Profile Component
// Importing dependencies
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Profile.css";
import { selectUser } from "../../features/userSlice";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { db } from "../../firebase.js";

// Fetching data-items from database
const View_Profile = () => {
  const user = useSelector(selectUser);
  const [profile, setProfile] = useState([]);
  useEffect(() => {
    db.collection("profile")
      .where("email", "==", user.email)
      .onSnapshot((snapshot) =>
        setProfile(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);
  // Return
  return (
    <div class="container rounded bg-white mt-5 mb-5">
      <div class="row">
        <div class="col-md-5 border-right">
          <div class="p-3 py-5">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h4 class="title">PROFILE SETTINGS</h4>
            </div>
            {/* Mapping data-items in order to display them on the page */}
            {profile.map(
              ({
                id,
                data: { mobile, postcode, state, education, about, specialization, college, degree, year },
              }) => (
                <form>
                  <h4 class="heading-1">Personal Details</h4>
                  <div class="row mt-2"> </div>
                  <div class="row mt-3">
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
                      />
                    </div>
                    <div class="col-md-12">
                      <label class="labels">Postcode</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Postcode"
                        value={postcode}
                      />
                    </div>
                    <div class="col-md-12">
                      <label class="labels">State</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="State"
                        value={state}
                      />
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
                      <label class="labels">Education</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Education"
                        value={education}
                      />
                    </div>
                  </div>
                  <h4 class="heading-2">Academic Details</h4>
                  <div class="col-md-12">
                    <label class="labels">College/University</label>
                    <input
                      type="text"
                      class="form-control"
                      value={college}

                    />
                  </div>
                  <div class="col-md-12">
                    <label class="labels">Degree</label>
                    <input
                      type="text"
                      class="form-control"
                      value={degree}

                    />
                  </div>
                  <div class="col-md-12">
                    <label class="labels">Year of graduation(expected)</label>
                    <input
                      type="text"
                      class="form-control"
                      value={year}

                    />
                  </div>
                  <div class="col-md-12">
                    <label class="labels">Specialization</label>
                    <input
                      type="text"
                      class="form-control"
                      value={specialization}

                    />
                  </div>
                  <div class="col-md-12">
                    <label class="labels">About</label>
                    <textarea
                      id="about"
                      type="text"
                      class="form-control"
                      value={about}

                    />
                  </div>
                  <div class="mt-5 text-center">
                    {/* Redirect to edit-profile */}
                    <a href="/edit_profile">
                      <button
                        class="btn btn-primary profile-button"
                        type="button"
                      >
                        Edit Profile
                      </button>
                    </a>
                  </div>
                </form>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default View_Profile;
