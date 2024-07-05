"use client";

import React, { useState } from "react";
import { Input } from "antd";
import "./Footer.scss";
import { IconButton } from "@components/simple/IconButton/IconButton";
import { useMessageStore, useMessagesStore } from "stores/messagesStore";

export const Footer = () => {
  const [message, setMessage] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setMessage(e.target.value);

  const onClick = () => {
    useMessageStore.setState({ text: message, time: new Date() });
    setMessage("");
  };

  return (
    <div className="footer">
      <IconButton name="smile" />
      <div className="item-expand">
        <Input
          placeholder="Start typing..."
          variant="borderless"
          onChange={onChange}
          value={message}
        />
      </div>
      <IconButton name="at" />
      <IconButton
        name="send"
        style={message ? "text-azure-radiance" : ""}
        disabled={!message}
        onClick={onClick}
      />
    </div>
  );
};
