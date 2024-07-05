"use client";

import { Message } from "@components/Message/Message";
import React, { useEffect, useRef } from "react";
import { getHello } from "services/apiService";
import { useMessageStore, useMessagesStore } from "stores/messagesStore";
import { MessageInfo } from "types/dataInterfaces";
import { HttpError } from "types/errors";

export default function RootPage() {
  const messages = useMessagesStore((state) => state.msgs);
  const addMessage = useMessagesStore((state) => state.addElement);
  const initStorage = useMessagesStore((state) => state.initStorage);
  const editStorage = useMessagesStore((state) => state.editStorage);

  const container = useRef<HTMLDivElement | null>(null);

  const toTop = () => {
    const c: HTMLDivElement = container.current as HTMLDivElement;
    if (c) c.scrollTop = c.scrollHeight;
  };

  const sendMessage = async () => {
    try {
      const response = await getHello();

      if (!response.ok)
        throw new HttpError(response.status, "Error occures in telegram bot");

      const result: MessageInfo = await response.json();

      editStorage();

      addMessage({
        ...result,
        time:
          typeof result.time === "string" ? new Date(result.time) : result.time,
      });

      localStorage.setItem(
        "messages",
        JSON.stringify(useMessagesStore.getState().msgs)
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const storagedMessagesString = localStorage.getItem("messages");

    if (storagedMessagesString) {
      const storagedMessages: MessageInfo[] = JSON.parse(
        storagedMessagesString
      );

      const correctStoragedMessages = storagedMessages.map(
        (elem: MessageInfo) => ({
          ...elem,
          time: typeof elem.time === "string" ? new Date(elem.time) : elem.time,
        })
      );
      initStorage(correctStoragedMessages);
    } else {
      initStorage([]);
    }

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

  useEffect(() => toTop(), [messages]);

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
