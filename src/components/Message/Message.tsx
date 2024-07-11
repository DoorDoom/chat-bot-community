import React, { useEffect } from "react";
import { Participant } from "@components/common/participant/Participant";
import { checkPicture, formatAMPM } from "utils/utils";
import { Image } from "antd";
import { useUserStore } from "stores/userStore";
import "./Message.scss";
import { IconButton } from "@components/common/IconButton/IconButton";
import { useMessagesStore } from "stores/messagesStore";

export const Message = ({ id }: Props) => {
  const [deleteMessage, findMessage, setId] = useMessagesStore((state) => [
    state.deleteMessage,
    state.findMessage,
    state.setId,
  ]);

  const name = useUserStore((state) => state.name);
  const msg = findMessage(id);
  const isMine = name === msg!.name;

  const changeMessagesStoreStateD = () => {
    deleteMessage(msg!.id);
  };

  const changeMessagesStoreStateE = () => {
    setId(id);
  };

  return (
    <div className={`message ${isMine && "mine-message"}`}>
      <Participant src={msg!.photo} style="big-participant" isOnline={true} />
      <div className={isMine ? "block right" : "block left"}>
        <div className="message__title">
          <h2>{msg!.name}</h2>
          <span>{msg!.position}</span>
        </div>
        <div className="message__text">
          <p>{msg!.text}</p>
          {msg!.picture && (
            <div className="w-full mt-2">
              <Image src={checkPicture(msg!.picture)} alt="image" />
            </div>
          )}
        </div>
        <div className="message__time">
          {isMine && (
            <>
              <IconButton
                name="pencil"
                style={"mini-icon"}
                onClick={changeMessagesStoreStateE}
                size="small"
              />
              <IconButton
                name="trash"
                size="small"
                style={"mini-icon text-red-300"}
                onClick={changeMessagesStoreStateD}
              />
            </>
          )}

          <span className="pl-2">{msg!.time && formatAMPM(msg!.time)}</span>
          <i className={`bx bx-${msg!.status}`}></i>
        </div>
      </div>
    </div>
  );
};

type Props = {
  id: string;
};
