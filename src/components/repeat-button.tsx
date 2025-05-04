import React from "react";
import Image from "next/image";

const RepeatButton = () => {
  return (
    /* From Uiverse.io by catraco */
    <div
      title="Repeat"
      className="group cursor-pointer outline-none hover:rotate-90 duration-300"
    >
      <Image
        src="/repeat.svg"
        width={50}
        height={50}
        alt="Repeat"
        className="group-hover:brightness-75 group-active:brightness-50 transition duration-300"
      />
    </div>
  );
};

export default RepeatButton;
