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
  const [roomMessage, SetroomMessgae] = useState([]); //this should always been arrauy

  useEffect(() => {
    //so here use effect function will get all the deatklas of the selcted channel from the given id that has been passed from the sidebar .js in form of [roomId]
    if (roomId) {
      Database.collection("rooms")
        .doc(roomId) //doc function will get the room by passing the [roomId] to get desired room info
        .onSnapshot(
          (snapshot) =>
            //here we wil fetch that room id's detals using snapshot and will store all the detals in the roomDetals
            setroomDetals(snapshot.data()) //here data is a inbulit function of firebase where when we have all the details from that room then data will store all the collection and fields data in setroomDetals in form of an objectfor more info hover over data
        );
    }
    //below function is the most imp function
    //this function is using the room id to get all the info in terms of object array that has been there in the data base
    Database.collection("rooms")
      .doc(roomId)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) =>
        SetroomMessgae(snapshot.docs.map((doc) => doc.data()))
      );
  }, [roomId]);

  console.log(roomDetals); //for printing to check if details are right or wrong
  console.log(roomMessage);
  return (
    <div className="chat">
      {/* <h1>You Are In the {roomId} room</h1> */}
      <div className="chat__header">
        <div className="chat__headerleft">
          <h3 className="chat__channelname">
            <strong># {roomDetals?.name}</strong>
            {/* always use ? when using objects to protect code from crashing */}
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
