import React, { useState } from "react";
import "./ChatInput.css";
import { Button, Input } from "@material-ui/core";
import { useStateValue } from "./StateProvider";
import Database from "../firebase";
import firebase from "firebase";

function ChatInput({ channelName, channelId }) {
  const [input, setinput] = useState("");
  const [{ user }] = useStateValue();

  const sendMessage = (event) => {
    event.preventDefault();

    if (channelId) {
      Database.collection("rooms").doc(channelId).collection("messages").add({
        message: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        user: user.displayName,
        userimg: user.photoURL,
      });
    }
  };
  return (
    <div className="Chatinput">
      <form>
        <Input
          className="chatinput__input"
          value={input}
          onChange={(event) => {
            setinput(event.target.value);
          }}
          placeholder="Enter message here"
        />
        <Button type="submit" onClick={sendMessage}>
          Send
        </Button>
      </form>
    </div>
  );
}

export default ChatInput;
