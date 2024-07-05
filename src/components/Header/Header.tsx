import React from "react";
import "./Header.scss";
import { Participants } from "@components/Participants/Participants";
import { Button } from "antd";
import { IconButton } from "@components/common/IconButton/IconButton";

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
