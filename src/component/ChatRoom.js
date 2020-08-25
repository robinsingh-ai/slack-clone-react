import React, { useEffect, useState } from "react";
import "./ChatRoom.css";
import { useParams } from "react-router-dom";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import InfoIcon from "@material-ui/icons/Info";
import Database from "../firebase";
import Message from "./Message";
import ChatInput from "./ChatInput";
function ChatRoom() {
  const { roomId } = useParams();
  const [roomDetals, setroomDetals] = useState(null);
  const [roomMessage, SetroomMessgae] = useState([]);

  useEffect(() => {
    if (roomId) {
      Database.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setroomDetals(snapshot.data()));
    }

    Database.collection("rooms")
      .doc(roomId)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) =>
        SetroomMessgae(snapshot.docs.map((doc) => doc.data()))
      );
  }, [roomId]);

  console.log(roomDetals);
  console.log(roomMessage);
  return (
    <div className="chat">
      <div className="chat__header">
        <div className="chat__headerleft">
          <h3 className="chat__channelname">
            <strong># {roomDetals?.name}</strong>

            <StarBorderIcon />
          </h3>
        </div>
        <div className="chat__headerright">
          <p>
            <InfoIcon /> Details
          </p>
        </div>
      </div>

      <div className="chat__data">
        {roomMessage.map(({ message, timestamp, user, userimg }) => (
          <Message
            message={message}
            timestamp={timestamp}
            user={user}
            userimg={userimg}
          />
        ))}
      </div>

      <ChatInput channelName={roomDetals?.name} channelId={roomId} />
    </div>
  );
}

export default ChatRoom;
