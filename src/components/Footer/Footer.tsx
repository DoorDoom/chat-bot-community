"use client";

import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Input, Upload, UploadProps } from "antd";
import { IconButton } from "@components/common/IconButton/IconButton";
import { useMessageStore, useMessagesStore } from "stores/messagesStore";
import { MessageStatus } from "constants/enums";
import { fileToString } from "utils/utils";
import { v4 } from "uuid";
import { useUserStore } from "stores/userStore";
import { MessageInfo } from "types/dataInterfaces";
import { initialMessage } from "constants/constants";
import "./Footer.scss";
import useDebounce from "hooks/TimeHooks";

export const Footer = () => {
  const [message, setMessage] = useState<MessageInfo>(initialMessage);
  const isCreated = useMessagesStore((state) => state.isCreated);
  const setMessageState = useMessageStore((state) => state.setMessage);
  const [inputValue, setInputValue] = useState("");
  const debouncedInputValue = useDebounce(inputValue, 500);

  const pictureUpload = (file: string) => {
    setMessage((prev) => {
      return { ...prev, picture: file };
    });
  };

  const props: UploadProps = {
    name: "file",
    accept: "image/png, image/jpg, image/webp",
    onChange(info) {
      fileToString(info.file.originFileObj as File, pictureUpload);
    },
    showUploadList: false,
    style: { border: 0 },
  };

  const toInitialState = () => {
    setMessage(initialMessage);
    setInputValue("");
  };

  const onClick = () => {
    isCreated(message.id)
      ? setMessageState(message)
      : setMessageState({
          ...useUserStore.getState(),
          id: v4(),
          text: message.text,
          time: new Date().toISOString(),
          status: MessageStatus.Sending,
          picture: message.picture,
        });
    toInitialState();
  };

  useEffect(() => {
    const unsubscribe = useMessageStore.subscribe(
      (state) => state,
      (newMsg) => {
        if (isCreated(newMsg.msg.id)) {
          setMessage(newMsg.msg);
          setInputValue(newMsg.msg.text);
        }
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (debouncedInputValue) {
      setMessage((prev) => {
        return { ...prev, text: inputValue };
      });
    }
  }, [debouncedInputValue]);

  return (
    <div className="footer">
      <IconButton name="smile" />
      <div className="item-expand">
        <Input
          placeholder="Start typing..."
          variant="borderless"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />
      </div>
      <Upload {...props}>
        <IconButton
          name="at"
          style={message.picture ? "text-azure-radiance" : ""}
        />
      </Upload>
      <div className={message.picture ? "" : "hidden"}>
        <IconButton
          name="trash"
          style={message.picture ? "text-red-600" : ""}
          onClick={() =>
            setMessage((prev) => {
              return { ...prev, picture: "" };
            })
          }
        />
      </div>
      <IconButton
        name="send"
        style={message.text || message.picture ? "text-azure-radiance" : ""}
        disabled={!message.text && !message.picture}
        onClick={onClick}
      />
    </div>
  );
};
