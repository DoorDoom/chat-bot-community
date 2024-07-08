import React from "react";
import { Image } from "antd";

import "./Participant.scss";

const anonimusUser = "../../../../users/anonimus.jpg";

export const Participant = ({ src, style, isOnline }: Props) => {
  return (
    <div className={`relative h-8 ${style}`}>
      <div className={`participant`}>
        <Image src={src ?? anonimusUser} alt="user" className="w-full h-full" />
      </div>
      {isOnline ? <div className="online" /> : <></>}
    </div>
  );
};

type Props = {
  src?: string;
  style?: string;
  isOnline?: boolean;
};
