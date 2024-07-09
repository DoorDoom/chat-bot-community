"use client";

import { Message } from "@components/Message/Message";
import React, { useEffect, useRef } from "react";
import { getHello } from "services/apiService";
import { useMessageStore, useMessagesStore } from "stores/messagesStore";
import { MessageInfo } from "types/dataInterfaces";
import { HttpError } from "types/errors";
import "./Chat.scss";
import { getDate, save, toTop } from "utils/utils";

export default function Chat() {
  const {
    msgs: messages,
    addMessage,
    initStorage,
    isCreated,
    editStorage,
    editMessage,
  } = useMessagesStore((state) => state);
  const { initialMessage } = useMessageStore((state) => state);
  const container = useRef<HTMLDivElement>(null);

  const changeMessagesStoreState = (result: MessageInfo) => {
    editStorage();
    addMessage(result);
    save(useMessagesStore.getState().msgs);
  };

  const sendMessage = async () => {
    try {
      const response = await getHello();

      if (!response.ok)
        throw new HttpError(response.status, "Error occures in telegram bot");

      changeMessagesStoreState(await response.json());
    } catch (error) {
      console.log(error);
    }
  };

  const initMessagesStoreState = () => {
    const storagedMessagesString = localStorage.getItem("messages");

    if (storagedMessagesString) {
      initStorage(JSON.parse(storagedMessagesString));
    } else {
      initStorage([]);
    }
  };

  useEffect(() => {
    initMessagesStoreState();
    const unsubscribe = useMessageStore.subscribe(
      (state) => state,
      (newMsg) => {
        if (isCreated(newMsg.msg.id)) {
          editMessage(newMsg.msg);
        } else {
          if (newMsg.msg.id !== "0") {
            changeMessagesStoreState(newMsg.msg);
            initialMessage();
            sendMessage();
          }
        }
        save(useMessagesStore.getState().msgs);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => toTop(container.current), [messages]);

  return (
    <div
      className="item-expand overflow-auto flex flex-col justify-end"
      ref={container}
    >
      <div className="chat item">
        {messages.map((msg, index) => (
          <div key={`message-${index}`} className="max-w-full grid">
            {index == 0 ||
            getDate(messages[index - 1].time) !== getDate(msg.time) ? (
              <span className="date">{getDate(msg.time)}</span>
            ) : (
              <></>
            )}
            <Message msg={msg} />
          </div>
        ))}
      </div>
    </div>
  );
}
