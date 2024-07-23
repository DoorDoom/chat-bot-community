"use client";

import { Message } from "@components/Message/Message";
import React, { useEffect, useRef, useState } from "react";
import { getHello } from "services/apiService";
import { useMessagesStore } from "stores/messagesStore";
import { HttpError } from "types/errors";
import { getDate, toTop } from "utils/utils";
import { Footer } from "@components/Footer/Footer";
import { Header } from "@components/Header/Header";
import { useUserStore } from "stores/userStore";
import { Alert } from "antd";
import { MessageInfo } from "types/dataInterfaces";
import { v4 } from "uuid";

export default function Chat() {
  const {
    msgs: messages,
    editStorage,
    addMessage,
    setId,
  } = useMessagesStore((state) => state);
  const name = useUserStore((state) => state.name);
  const [error, setError] = useState<string | null>(null);
  const [isInit, setIsInit] = useState(true);
  const container = useRef<HTMLDivElement>(null);

  const sendMessage = async () => {
    try {
      const response = await getHello();

      if (!response.ok)
        throw new HttpError(response.status, "Error occures in telegram bot");

      const newMessage: MessageInfo = await response.json();
      editStorage();
      await addMessage({
        ...newMessage,
        id: v4(),
        time: new Date().toISOString(),
      });
    } catch (error) {
      setError((error as HttpError).message);
    }
  };

  const checkLastMessage = () => {
    const lastMessageResult = messages.slice(-1)[0];
    if (lastMessageResult && lastMessageResult.name === name) {
      sendMessage();
    }
    if (messages.length > 0) setIsInit(false);
  };

  useEffect(() => {
    return setId("");
  }, []);

  useEffect(() => {
    toTop(container.current);
    checkLastMessage();
  }, [messages]);

  return (
    <>
      <Header />
      <div
        className="item-expand overflow-auto flex flex-col-reverse"
        ref={container}
      >
        <div className="flex flex-col justify-end">
          {messages.map((msg, index) => (
            <div
              key={`message-${index}`}
              className="max-w-full grid overflow-hidden"
            >
              {(index == 0 ||
                getDate(messages[index - 1].time) !== getDate(msg.time)) && (
                <span className="w-full text-center py-3">
                  {getDate(msg.time)}
                </span>
              )}
              <Message id={msg.id} animate={!isInit} />
            </div>
          ))}
        </div>
      </div>
      {error && (
        <Alert
          message={error}
          type="error"
          onClose={() => setError(null)}
          closable={true}
          banner
          className="text-cod-gray"
        />
      )}
      <Footer />
    </>
  );
}
