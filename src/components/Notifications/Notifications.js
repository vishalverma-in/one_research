import React from "react";
import "./notifications.css";
import { db } from "../../firebase.js";
import { useEffect, useState } from "react";
import Notification from "./notification.js";

const Notifications = () => {
  // Fetches posts from the last 12 hours only
  let before1day = new Date().getTime() - (12 * 3600 * 1000 );
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .where("timestamp",">",new Date(before1day))
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);

  return (
    <div className="notification list-group list-group-flush" style={{borderRadius: 10}}>
      {posts.map(({ data: { name, message, timestamp } }) => (
        <Notification name={name} message={message} timestamp={timestamp} />
      ))}
      
    </div>
  );
};

export default Notifications;
