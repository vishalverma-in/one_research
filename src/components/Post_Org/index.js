// Frontend part of the View-Post Component
// Importing the required dependencies
import React, { forwardRef, useState, useEffect } from "react";
import InputOption from "../InputOption";
import CreateIcon from "@mui/icons-material/Create";
import "./Post_Org.css";
import { db } from "../../firebase.js";
import firebase from "firebase/compat/app";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import FlipMove from "react-flip-move";
import Comment from "./Comment";

const Post = forwardRef(
  ({ doc_id, postId, name, description, message, timestamp }, ref) => {
    const user = useSelector(selectUser);
    const [comments, setComments] = useState([]);
    const [input, setInput] = useState("");
    const [show, setShow] = useState(false);
    const [val, setVal] = useState("Comments under this post.");

    // delete post
    const clearData = () => {
      db.collection("posts").doc(doc_id).delete()
    }
    // User-defined function to share some message on WhatsApp
    function share(e) {
      // e.preventDefault();
      // collet the user input
      const msg = { message };
      // JavaScript function to open URL in new window
      window.open("whatsapp://send?text=" + msg.message, "_blank");
    }

    // Fetching comments from the database
    useEffect(() => {
      db.collection("comments")
        .where("postId", "==", postId)
        // .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setComments(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    });

    const sendComment = (e) => {
      e.preventDefault();

      db.collection("comments").add({
        postId: postId,
        name: user.displayName,
        description: user.email,
        message: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setInput("");
    };
     var utcSeconds = timestamp.toDate();
    // Return
    return (
      // Basic HTML
      <div ref={ref} className="post">
        <div className="post__header">
          <div className="post__info">
            <h2>
              <b>{name} &nbsp; </b>
              <button
                style={{
                  padding: "2px 5px",
                  border: "none",
                  backgroundColor: "whitesmoke",
                  borderRadius: "5px",
                  color: "#667292",
                  fontWeight: "bold",
                }}
              >
                Following
              </button>
            </h2>
            <p>{description}</p>
          </div>
        </div>

        <div className="post__body">
          <p>{message}</p>
        </div>
        <p class="text-black-50" style={{fontSize: 12}}>posted on {utcSeconds.getDate()}/{utcSeconds.getMonth()}/{utcSeconds.getFullYear()} </p>


        <div className="post__buttons">
          {/* Another color option (blue) #667292 */}
          <button
            class="btn btn-light"
            title="Comment"
            onClick={() => {
              setShow((prev) => !prev);
              if(comments.length === 0) {
                setVal("Be the first to write a comment under this post.")
              }
              else {
                setVal("Comments under this post.")
              }
            }}
          >
            Comments
          </button>
          <button class="btn btn-light" title="Share" onClick={share}>
            {" "}
            Share
          </button>
          <button class="btn btn-outline-danger" title="Delete" onClick={clearData}>Delete</button>
        </div>

        {show && (
          <div>
            <hr />
            {val}
            <div className="feed__inputContainer">
              <div className="feed__input" style={{ borderRadius: "5px" }}>
                <CreateIcon />
                <form>
                  <input
                    // style={{height: "10vh"}}
                    type="text"
                    placeholder="Write a comment"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                  <button onClick={sendComment} type="submit">
                    Send
                  </button>
                </form>
              </div>
            </div>
            <div style={{ margin: "1vw" }}>
              {console.log(comments.length)}
              <FlipMove
                class="list-group list-group-flush"
                style={{ borderRadius: "5px", marginBottom: "2px" }}
              >
                {/* Mapping contents of the comments under this post and displaying them */}
                {comments.map(
                  ({ id, data: { postId, name, description, timestamp, message } }) => (
                    <Comment
                      key={id}
                      postId={postId}
                      name={name}
                      description={description}
                      timestamp={timestamp}
                      message={message}
                    />
                  )
                )}
              </FlipMove>
            </div>
          </div>
        )}
      </div>
    );
  }
);

export default Post;
