import React from "react";
import { Participant } from "@components/common/participant/Participant";
import { MessageInfo } from "types/dataInterfaces";
import { formatAMPM } from "utils/utils";
import { Image } from "antd";

import "./Message.scss";
import { useUserStore } from "stores/userStore";

export const Message = ({ msg }: Props) => {
  const name = useUserStore((state) => state.name);
  const isMine = name === msg.name;

  return (
    <div className={`message ${isMine ? "self-end pr-6" : ""}`}>
      <Participant
        src={msg.photo}
        style={`big-participant ${isMine ? "hidden" : ""}`}
      />
      <div className={`${isMine ? "mine-block" : "block"}`}>
        <div className="message__title">
          <h2>{msg.name}</h2>
          <span>{msg.position}</span>
        </div>
        <div className="message__text">
          <p>{msg.text}</p>
          {msg.picture ? (
            <div className="w-full">
              <Image src={msg.picture} alt="image" />
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="message__time">
          <span>{msg.time ? formatAMPM(msg.time as Date) : "00:00 AM"}</span>
          <i className={`bx bx-${msg.status} ${isMine ? "" : "hidden"}`}></i>
        </div>
      </div>
    </div>
  );
};

type Props = {
  msg: MessageInfo;
};
