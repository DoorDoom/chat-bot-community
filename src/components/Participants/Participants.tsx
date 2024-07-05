import React from "react";
import "./Participants.scss";
import { Participant } from "@components/common/participant/Participant";
import { users } from "constants/constants";

export const Participants = () => {
  return (
    <div className="participants header-part">
      {users.map((name: string) => (
        <div key={`participant_${name}`} className="w-5">
          <Participant src={name} />
        </div>
      ))}
    </div>
  );
};
