import React from "react";
import "./Header.css";
import { Avatar } from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import SearchIcon from "@material-ui/icons/Search";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import { useStateValue } from "./StateProvider";

function Header() {
  const [{ user }] = useStateValue();

  return (
    <div className="header">
      <div className="header__left">
        <Avatar
          className="header__avatar"
          alt={user?.displayName}
          src={user?.photoURL}
        />
        <AccessTimeIcon />
        {/* avatar icon */}
        {/* timeicon */}
      </div>

      <div className="header__middle">
        {/* search icon */}
        <SearchIcon />
        {/* input tag */}
        <input placeholder="Hello Robin Singh" />
      </div>

      <div className="header__right">
        {/* help icon */}
        <HelpOutlineIcon />
        {/* last section of hearer */}
      </div>
    </div>
  );
}

export default Header;
