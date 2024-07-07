import React from "react";
import { Participant } from "@components/common/participant/Participant";
import { MessageInfo } from "types/dataInterfaces";
import { fileToString, formatAMPM } from "utils/utils";
import { Image } from "antd";
import { useUserStore } from "stores/userStore";
import "./Message.scss";

export const Message = ({ msg }: Props) => {
  const name = useUserStore((state) => state.name);
  const isMine = name === msg.name;

  const checkPicture = (picture: string | File): string => {
    if (typeof picture === "string") return picture;
    let newPicture = "";
    fileToString(picture, (file: string) => (newPicture = file));
    return newPicture;
  };

  return (
    <div className={`message ${isMine ? "mine-message" : ""}`}>
      <Participant src={msg.photo} style="big-participant" />
      <div className={isMine ? "block right" : "block left"}>
        <div className="message__title">
          <h2>{msg.name}</h2>
          <span>{msg.position}</span>
        </div>
        <div className="message__text">
          <p>{msg.text}</p>
          {msg.picture ? (
            <div className="w-full mt-2">
              <Image src={checkPicture(msg.picture)} alt="image" />
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="message__time">
          <span>{msg.time ? formatAMPM(msg.time) : "00:00 AM"}</span>
          <i className={`bx bx-${msg.status}`}></i>
        </div>
      </div>
    </div>
  );
};

type Props = {
  msg: MessageInfo;
};
