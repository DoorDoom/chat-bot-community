import React from "react";
import { Participant } from "@components/common/participant/Participant";
import { users } from "constants/constants";
import "./Participants.scss";

export const Participants = () => {
  return (
    <div className="flex header-part">
      {users.map((name: string) => (
        <div key={`participant_${name}`} className="w-5">
          <Participant src={name} />
        </div>
      ))}
    </div>
  );
};
