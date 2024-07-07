"use client";

import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Input, InputRef, Upload, UploadProps } from "antd";
import "./Footer.scss";
import { IconButton } from "@components/common/IconButton/IconButton";
import { useMessageStore, useMessagesStore } from "stores/messagesStore";
import { MessageStatus } from "constants/enums";
import { fileToString } from "utils/utils";
import { debounce } from "lodash";

export const Footer = () => {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<string>("");
  const [refreash, setRefreash] = useState(false);
  const input = useRef<InputRef>(null);

  const updateMessage = (e: ChangeEvent<HTMLInputElement>) =>
    setMessage(e.target.value);
  const debouncedOnChange = debounce(updateMessage, 200);
  const toInitialState = () => {
    setMessage("");
    setFile("");
    setRefreash(true);
  };

  const props: UploadProps = {
    name: "file",
    accept: "image/png, image/jpg, image/webp",
    onChange(info) {
      fileToString(info.file.originFileObj as File, (file: string) =>
        setFile(file)
      );
    },
    showUploadList: false,
  };

  const onClick = () => {
    useMessageStore.setState({
      text: message,
      time: new Date().toISOString(),
      status: MessageStatus.Sending,
      picture: file,
    });
    toInitialState();
  };

  useEffect(() => {
    if (refreash) input.current!.input!.value = "";
    setRefreash(false);
  }, [refreash]);

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
        <IconButton name="at" style={file ? "text-azure-radiance" : ""} />
      </Upload>
      <IconButton
        name="send"
        style={message || file ? "text-azure-radiance" : ""}
        disabled={!message && !file}
        onClick={onClick}
      />
    </div>
  );
};
