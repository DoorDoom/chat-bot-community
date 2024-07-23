import React, { useEffect } from "react";
import { Participant } from "@components/common/participant/Participant";
import { checkPicture, formatAMPM } from "utils/utils";
import { Image } from "antd";
import { useUserStore } from "stores/userStore";
import "./Message.scss";
import { IconButton } from "@components/common/IconButton/IconButton";
import { useMessagesStore } from "stores/messagesStore";
import { motion } from "framer-motion";

export const Message = ({ id, animate }: Props) => {
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
    <motion.div
      initial={{ x: `${isMine ? "100%" : "-100%"}` }}
      animate={{ x: 0 }}
      transition={{
        delay: animate && !isMine ? 0.7 : 0,
        duration: animate ? 1 : 0,
      }}
      className={`message flex justify-start pl-4 py-2 max-w-[60%] ${
        isMine && "mine-message"
      }`}
    >
      <Participant src={msg!.photo} style="big-participant" isOnline={true} />
      <div className={isMine ? "block right" : "block left"}>
        <div className="message__title flex gap-2 items-center">
          <h2>{msg!.name}</h2>
          <span>{msg!.position}</span>
        </div>
        <div className="message__text mt-1 mb-3 max-w-full text-wrap min-w-32 sm:min-w-36">
          <p className=" max-w-full text-wrap break-words hyphens-auto">
            {msg!.text}
          </p>
          {msg!.picture && (
            <div className="w-full mt-2">
              <Image src={checkPicture(msg!.picture)} alt="image" />
            </div>
          )}
        </div>
        <div className="absolute bottom-1 right-2 flex gap-1">
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
    </motion.div>
  );
};

type Props = {
  id: string;
  animate: boolean;
};
