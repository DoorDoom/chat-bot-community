import React from "react";
import { Participants } from "@components/Participants/Participants";
import { IconButton } from "@components/common/IconButton/IconButton";

import { getDate } from "utils/utils";

export const Header = () => {
  return (
    <div className="relative">
      <div className="centered-flex shadow-[0_1px_0_0_#E5E5EA] h-17 px-14p mb-1p">
        <Participants />
        <div className="flex-col gap-1 centered-flex header-part">
          <h2>🦄 Team Unicorns</h2>
          <span>last seen 45 minutes ago</span>
        </div>
        <div className="flex justify-end header-part">
          <IconButton name="dots-horizontal-rounded" />
        </div>
      </div>
      <div className="flex justify-center w-full absolute z-10">
        <div className="bg-white px-2 py-1 mt-1p sm:mt-1 rounded-md w-fit">
          <span>{getDate(new Date().toISOString())}</span>
        </div>
      </div>
    </div>
  );
};
