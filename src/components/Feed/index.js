// Backend part of View-Post component
// Importing the necessary dependencies
import React, { useEffect, useState } from "react";
import "./Feed.css";
import Post from "../Post";
import { db } from "../../firebase.js";
import firebase from "firebase/compat/app";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import FlipMove from "react-flip-move";
import spinner from '../images/spinner.gif';

const Feed = () => {
  const user = useSelector(selectUser);
  const [posts, setPosts] = useState([]);
  // Fetching posts from the database
  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);
  
  var size = posts.length;
  return (
    <div className="feed">
    {
      !size ? (
        <>
          <span>Loading <img src={spinner} alt="" style={{width: "40px"}} /></span>
        </>
      ) :
      (
        <>
          <FlipMove>
            {/* Mapping contents of the post and displaying them */}
            {posts.map(({ id, data: { postId, name, description, message,link, timestamp, photoUrl } }) => (
              <Post
                key={id}
                postId={postId}
                name={name}
                description={description}
                message={message}
                link={link}
                timestamp={timestamp}
                photoUrl={photoUrl}
              />
            ))}
          </FlipMove>
        </>
      )
    }
    </div>
  );
};
export default Feed;