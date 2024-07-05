import React from "react";
import { Button } from "antd";

import "./IconButton.scss";

export const IconButton = ({ name, style, disabled, onClick }: Props) => {
  return (
    <Button
      type="text"
      size="large"
      disabled={disabled}
      icon={<i className={`bx bx-${name} icon-button ${style}`}></i>}
      onClick={onClick}
    />
  );
};

type Props = {
  name: string;
  style?: string;
  disabled?: boolean;
  onClick?: () => void;
};
