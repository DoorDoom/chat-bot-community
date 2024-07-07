"use client";

import { Message } from "@components/Message/Message";
import React, { useEffect, useRef } from "react";
import { getHello } from "services/apiService";
import { useMessageStore, useMessagesStore } from "stores/messagesStore";
import { MessageInfo } from "types/dataInterfaces";
import { HttpError } from "types/errors";
// import debounce from 'lodash/debounce';
import "./Chat.scss";
import { toTop } from "utils/utils";

export default function Chat() {
  const {
    msgs: messages,
    addMessage,
    initStorage,
    editStorage,
  } = useMessagesStore((state) => state);
  const container = useRef<HTMLDivElement>(null);

  const changeMessagesStoreState = (result: MessageInfo) => {
    editStorage();

    addMessage(result);

    localStorage.setItem(
      "messages",
      JSON.stringify(useMessagesStore.getState().msgs)
    );
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
        addMessage(newMsg);
        sendMessage();
        localStorage.setItem(
          "messages",
          JSON.stringify(useMessagesStore.getState().msgs)
        );
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => toTop(container.current), [messages]);

  return (
    <div
      className="item-expand overflow-auto"
      ref={container}
      id="scroll-container"
    >
      <div className="item flex flex-col justify-end">
        {messages.map((msg, index) => (
          <Message key={`message-${index}`} msg={msg} />
        ))}
      </div>
    </div>
  );
}
