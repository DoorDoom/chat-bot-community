import React from "react";
import { Participants } from "@components/Participants/Participants";
import { IconButton } from "@components/common/IconButton/IconButton";
import "./Header.scss";

export const Header = () => {
  return (
    <div className="header">
      <Participants />
      <div className="header__naming header-part">
        <h2>🦄 Team Unicorns</h2>
        <span>last seen 45 minutes ago</span>
      </div>
      <div className="header__panel header-part">
        <IconButton name="dots-horizontal-rounded" />
      </div>
    </div>
  );
};
