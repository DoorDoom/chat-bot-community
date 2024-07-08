"use client";

import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Input, InputRef, Upload, UploadProps } from "antd";
import { IconButton } from "@components/common/IconButton/IconButton";
import { useMessageStore, useMessagesStore } from "stores/messagesStore";
import { MessageStatus } from "constants/enums";
import { fileToString } from "utils/utils";
import { debounce } from "lodash";
import { v4 } from "uuid";
import { useUserStore } from "stores/userStore";
import { MessageInfo } from "types/dataInterfaces";
import { initialMessage } from "constants/constants";
import "./Footer.scss";

export const Footer = () => {
  const [message, setMessage] = useState<MessageInfo>(initialMessage);
  const isCreated = useMessagesStore((state) => state.isCreated);
  const setMessageState = useMessageStore((state) => state.setMessage);
  const input = useRef<InputRef>(null);
  const props: UploadProps = {
    name: "file",
    accept: "image/png, image/jpg, image/webp",
    onChange(info) {
      fileToString(info.file.originFileObj as File, (file: string) => {
        setMessage((prev) => {
          return { ...prev, picture: file };
        });
      });
    },
    showUploadList: false,
  };

  const updateMessage = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage((prev) => {
      return { ...prev, text: e.target.value };
    });
  };

  const debouncedOnChange = debounce(updateMessage, 200);

  const toInitialState = () => {
    setMessage(initialMessage);
  };

  const onClick = () => {
    if (isCreated(message.id)) {
      setMessageState(message);
    } else
      setMessageState({
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
        }
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    input.current!.input!.value = message.text;
  }, [message]);

  return (
    <div className="footer">
      <IconButton name="smile" />
      <div className="item-expand">
        <Input
          ref={input}
          placeholder="Start typing..."
          variant="borderless"
          onChange={debouncedOnChange}
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
