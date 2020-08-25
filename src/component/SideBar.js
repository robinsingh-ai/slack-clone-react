import React, { useState, useEffect } from "react";
import Database from "../firebase";
import "./SideBar.css";
import CreateIcon from "@material-ui/icons/Create";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import SideBarOptions from "./SideBarOptions";
import InsertCommentIcon from "@material-ui/icons/InsertComment";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import AppsIcon from "@material-ui/icons/Apps";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import DescriptionIcon from "@material-ui/icons/Description";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useStateValue } from "./StateProvider";
function SideBar() {
  const [Channels, SetChannel] = useState([]);
  const [{ user }] = useStateValue();

  useEffect(() => {
    //Run This code when side bar componnent  loads
    Database.collection("rooms").onSnapshot((snapshot) =>
      //so when ever anything in the database changes or modified then this will take a snapshot with realtime to get us upaated
      SetChannel(
        snapshot.docs.map((doc) => ({
          //Can loop to each document in the rooms database which is served as channel with the help of docs.map :25
          id: doc.id, //with this line it will give the document's id like "XERout26DDYnfhfucfmcsiq"
          name: doc.data().name, // this line will give all the data in that document with that documents collection and the name of that data in our case it has been consdered as the channel name
        }))
      )
    );
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__info">
          <h2>{user?.displayName}</h2>
          <h3 className="sidebar__info__class">
            <FiberManualRecordIcon />

            {user?.email}
          </h3>
        </div>
        <CreateIcon />
      </div>
      <SideBarOptions Icon={InsertCommentIcon} title="Comment" />
      <SideBarOptions Icon={InboxIcon} title="Inbox" />
      <SideBarOptions Icon={DraftsIcon} title="Saved" />
      <SideBarOptions Icon={BookmarkBorderIcon} title="Saved Channels" />
      <SideBarOptions Icon={PeopleOutlineIcon} title="Peoples" />
      <SideBarOptions Icon={AppsIcon} title="Apps" />
      <SideBarOptions Icon={DescriptionIcon} title="File Browser" />
      <SideBarOptions Icon={ExpandLessIcon} title="Shows Less" />
      <hr className="horizonrtalline" />
      <SideBarOptions Icon={ExpandMoreIcon} title="Channels" />

      <hr className="horizonrtalline" />
      <SideBarOptions
        Icon={AddCircleOutlineIcon}
        addChannelOption
        title="Add Channel"
      />

      {Channels.map((channel) => (
        <SideBarOptions title={channel.name} id={channel.id} />
      ))}

      {/* Connecting  DB for adding Channels name and infos */}
    </div>
  );
}

export default SideBar;
