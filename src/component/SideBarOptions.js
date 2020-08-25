import React from "react";
import "./SIdebarOption.css";
import { useHistory } from "react-router-dom";
import Database from "../firebase";

// SO 1. changes url when we click on the channel itself coz when we click it changes id and that id is we are using here

//2.then it coonnets to the database
// 3.uses URL param (room id) to fetch room details fromfrom the database

function SideBarOptions({ Icon, title, id, addChannelOption }) {
  const history = useHistory();

  const selectChannel = () => {
    if (id) {
      history.push(`/room/${id}`);
    } else {
      history.push(title);
    }
  };

  const AddChannel = () => {
    const channelName = prompt("Enter The Channel Name");

    if (channelName) {
      Database.collection("rooms").add({
        name: channelName,
      });
    }
  };
  return (
    <div
      className="sidebaroptions"
      onClick={addChannelOption ? AddChannel : selectChannel}
    >
      {Icon && <Icon className="sidebaroptions__icon"></Icon>}
      {Icon ? (
        <h3>{title}</h3>
      ) : (
        <h3 className="sidebaroptions__channel">
          <span className="sidebaroption__chaanelicon">#</span> {title}
        </h3>
      )}
    </div>
  );
}

export default SideBarOptions;
