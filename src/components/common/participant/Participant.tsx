import React from "react";
import { Image } from "antd";

import "./Participant.scss";

const anonimusUser = "../../../../users/anonimus.jpg";

export const Participant = ({ src, style }: Props) => {
  return (
    <div className={`participant style ${style}`}>
      <Image src={src ?? anonimusUser} alt="user" className="w-full h-full" />
    </div>
  );
};

type Props = {
  src?: string;
  style?: string;
};
