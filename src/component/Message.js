import React from "react";
import "./Message.css";
function Message({ message, timestamp, user, userimg }) {
  return (
    <div className="message">
      <img src={userimg} alt="profile pic" />
      <div className="message__data">
        <h4>
          {user}{" "}
          <span className="message__timestamp">
            {new Date(timestamp?.toDate()).toUTCString()}
          </span>
        </h4>
        <p className="message__mess">{message}</p>
      </div>
    </div>
  );
}

export default Message;
