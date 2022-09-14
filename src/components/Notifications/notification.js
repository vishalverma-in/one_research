import React from "react";
// const handleDelete = () => {
  
// };

const Notification = ({ name, message, timestamp }) => {
  var utcSeconds = timestamp.toDate();
  
  return (
    <>
      <a className="notification-1" href="/feed">
        <div className="notification">
          <div class="list-group-item py-4" style={{ borderRadius: "10px", margin: "5px" }}>
            <p>
              <strong>{name}</strong>
              <em> posted </em>
              <a href="/feed">
                <>{message}</>
              </a>
            </p>
            <p class="text-black-50" style={{ fontSize: 12 }}>
              on {utcSeconds.getDate()}/{utcSeconds.getMonth()}/
              {utcSeconds.getFullYear()}{" "}
            </p>
            {/* <button onClick={handleDelete} class="btn btn-outline-danger btn-sm">
            Delete
          </button> */}
          </div>
        </div>
      </a>
    </>
  );
};

export default Notification;