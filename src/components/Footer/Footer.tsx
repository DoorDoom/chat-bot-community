"use client";

import React, { useEffect, useState } from "react";
import { Input, Upload, UploadProps } from "antd";
import { IconButton } from "@components/common/IconButton/IconButton";
import { useMessagesStore } from "stores/messagesStore";
import { MessageStatus } from "constants/enums";
import { fileToString } from "utils/utils";
import { v4 } from "uuid";
import { useUserStore } from "stores/userStore";
import { MessageInfo } from "types/dataInterfaces";
import { initialMessage } from "constants/constants";
import "./Footer.scss";
import { useDebounce } from "hooks/TimeHooks";

export const Footer = () => {
  const { isCreated, findMessage, addMessage, editMessage, id } =
    useMessagesStore((state) => state);
  const [message, setMessage] = useState<MessageInfo>(
    id !== "" ? findMessage(id)! : initialMessage
  );
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const debouncedInputValue = useDebounce(inputValue, 200);
  const debouncedLoading = useDebounce(isLoading, 200);

  const pictureUpload = (file: string) => {
    setMessage((prev) => {
      return { ...prev, picture: file };
    });
  };

  const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if ((event.code === "Enter" && message.text) || message.picture) {
      setIsLoading(true);
    }
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
    if (isCreated(message.id)) {
      editMessage(message);
    } else {
      addMessage({
        ...useUserStore.getState(),
        id: v4(),
        text: message.text,
        time: new Date().toISOString(),
        status: MessageStatus.Sending,
        picture: message.picture,
      });
    }
    toInitialState();
  };

  useEffect(() => {
    if (id !== "") {
      const msg = findMessage(id)!;
      setMessage(msg);
      setInputValue(msg.text);
    }
  }, [id]);

  useEffect(() => {
    if (debouncedInputValue || debouncedInputValue === "") {
      setMessage((prev) => {
        return { ...prev, text: inputValue };
      });
    }
  }, [debouncedInputValue]);

  useEffect(() => {
    if (debouncedLoading) {
      onClick();
      setIsLoading(false);
    }
  }, [debouncedLoading]);

  return (
    <div className="footer">
      <IconButton name="smile" />
      <div className="item-expand">
        <Input
          placeholder="Start typing..."
          variant="borderless"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          onKeyDown={keyDownHandler}
        />
      </div>
      <Upload {...props}>
        <IconButton
          name="at"
          style={`${message.picture && "text-azure-radiance"}`}
        />
      </Upload>
      <div className={`${!message.picture && "hidden"}`}>
        <IconButton
          name="trash"
          style={`${message.picture && "text-red-600"}`}
          onClick={() =>
            setMessage((prev) => {
              return { ...prev, picture: "" };
            })
          }
        />
      </div>
      <IconButton
        name="send"
        style={`send-button disabled-button ${
          (message.text || message.picture) && "ready"
        }`}
        disabled={!message.text && !message.picture}
        onClick={() => setIsLoading(true)}
        loading={isLoading}
      />
    </div>
  );
};
