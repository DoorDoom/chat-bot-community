"use client";

import React, { SyntheticEvent, useState } from "react";
import Image from "next/image";
import "./Participant.scss";

const anonimusUser = "./users/anonimus.jpg";

export const Participant = ({ src, style, isOnline }: Props) => {
  const [imgSrc, setImgSrc] = useState(src ?? anonimusUser);

  return (
    <div className={`relative h-8 ${style}`}>
      <div className={`participant`}>
        <Image
          unoptimized
          src={imgSrc}
          loader={() => imgSrc}
          alt="user"
          width={500}
          height={500}
          className="w-full h-full"
          onError={() => setImgSrc(anonimusUser)}
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
