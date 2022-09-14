// Backend part of Organization-Home page
// Importing the necessary dependencies
import React, { useEffect, useState } from "react";
import "./home.css";
import InputOption from "../InputOption";
import CreateIcon from "@mui/icons-material/Create";
import ImageIcon from "@mui/icons-material/Image";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import Post_Org from "../Post_Org";
import { db } from "../../firebase.js";
import firebase from "firebase/compat/app";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import FlipMove from "react-flip-move";
import { NavLink } from "react-bootstrap";

const Home_Org = () => {
  const user = useSelector(selectUser);
  const [posts, setPosts] = useState([]);
  const [input, setInput] = useState("");
  const [link, setLink] = useState("");
  // Fetching posts from the database
  useEffect(() => {
    db.collection("posts")
    .where("description", "==", user.email)
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  });
  // Send-Post function
  const sendPost = (e) => {
    e.preventDefault();
    const id = Date.now(); // number of milliseconds elapsed since January 1, 1970.
    db.collection("posts").add({
      postId: id,
      name: user.displayName,
      description: user.email,
      message: input,
      link: link,
      photoUrl: user.photoUrl || "",
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };
  
  return (
    <div className="feed">
      <div className="feed__inputContainer">
        <div className="feed__input">
          <CreateIcon />
          <form>
            <input 
              type="text"
              placeholder="Application form link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
            <br/>
            <input 
              type="textarea"
              placeholder="Start a Post"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={sendPost} type="submit">
              Send
            </button>
          </form>
        </div>

        <div className="feed_inputOptions">
          <InputOption Icon={ImageIcon} title="Photo" color="#70b5f9" />
          <InputOption Icon={SubscriptionsIcon} title="Video" color="#e7a33e" />
        </div>
      </div>
      <FlipMove>
        {/* Mapping contents of the post and displaying them */}
        {posts.map(({ id, data: { postId, name, description, message, timestamp } }) => (
          <Post_Org
            key={id}
            doc_id={id}
            postId={postId}
            name={name}
            description={description}
            message={message}
            timestamp={timestamp}
          />
        ))}
      </FlipMove>
    </div>
  );
};
export default Home_Org;