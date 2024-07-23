import React from "react";
import { Image } from "antd";
import "./Participant.scss";

const anonimusUser = "./users/anonimus.jpg";

export const Participant = ({ src, style, isOnline }: Props) => {
  return (
    <div className={`relative h-8 ${style}`}>
      <div
        className={`w-7 h-7 rounded-full overflow-hidden relative border-white border-[1px] participant`}
      >
        <Image
          src={src}
          fallback={anonimusUser}
          alt="user"
          className="w-full h-full"
        />
      </div>
      {isOnline && <div className="online" />}
    </div>
  );
};

type Props = {
  src?: string;
  style?: string;
  isOnline?: boolean;
};
