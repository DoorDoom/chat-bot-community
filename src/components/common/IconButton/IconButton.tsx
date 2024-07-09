import React from "react";
import { Button } from "antd";

import "./IconButton.scss";
import { SizeType } from "antd/es/config-provider/SizeContext";

export const IconButton = ({
  name,
  style,
  disabled,
  onClick,
  size = "large",
}: Props) => {
  return (
    <Button
      type="text"
      size={size}
      disabled={disabled}
      icon={<i className={`bx bx-${name} icon-button ${style}`}></i>}
      onClick={onClick}
      className={size}
    />
  );
};

type Props = {
  name: string;
  style?: string;
  size?: SizeType;
  disabled?: boolean;
  onClick?: () => void;
};
