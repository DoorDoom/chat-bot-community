"use client";

import { Message } from "@components/Message/Message";
import React, { useEffect, useRef, useState } from "react";
import { getHello } from "services/apiService";
import { useMessagesStore } from "stores/messagesStore";
import { HttpError } from "types/errors";
import { formatAMPM, getDate, toTop } from "utils/utils";
import { Footer } from "@components/Footer/Footer";
import { Header } from "@components/Header/Header";
import { useUserStore } from "stores/userStore";
import { Alert } from "antd";

import "./Chat.scss";
import { MessageInfo } from "types/dataInterfaces";

export default function Chat() {
  const {
    msgs: messages,
    editStorage,
    addMessage,
    setId,
  } = useMessagesStore((state) => state);
  const name = useUserStore((state) => state.name);
  const [error, setError] = useState<string | null>(null);

  const container = useRef<HTMLDivElement>(null);

  const sendMessage = async () => {
    try {
      const response = await getHello();

      if (!response.ok)
        throw new HttpError(response.status, "Error occures in telegram bot");

      const newMessage: MessageInfo = await response.json();
      editStorage();
      addMessage({ ...newMessage, time: new Date().toISOString() });
      console.log(
        formatAMPM({ ...newMessage, time: new Date().toISOString() }.time)
      );
    } catch (error) {
      setError((error as HttpError).message);
    }
  };

  useEffect(() => {
    return setId("");
  }, []);

  useEffect(() => {
    toTop(container.current);
    const lastMessageResult = messages.slice(-1)[0];
    if (lastMessageResult && lastMessageResult.name === name) {
      sendMessage();
    }
  }, [messages]);

  return (
    <>
      <Header />
      <div className="item-expand chat-container" ref={container}>
        <div className="chat item">
          {messages.map((msg, index) => (
            <div key={`message-${index}`} className="max-w-full grid">
              {(index == 0 ||
                getDate(messages[index - 1].time) !== getDate(msg.time)) && (
                <span className="date">{getDate(msg.time)}</span>
              )}
              <Message id={msg.id} />
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
        />
      )}
      <Footer />
    </>
  );
}
