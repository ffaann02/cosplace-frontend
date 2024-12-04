import Image from "next/image";
import React from "react";

const Finding = () => {
  return (
    <div className="w-full h-full bg-primary-200/80 absolute z-[50] left-0 top-0 rounded-xl flex items-center justify-center">
      <div className="text-center -mt-6">
        <Image
          priority
          unoptimized={true}
          src={"/images/tanukiLoading.gif"}
          alt="hero-mascot"
          width={300}
          height={300}
          className="z-50 mx-auto scale-125 md:scale-175"
        />
        <h3 className="text-primary-800 mt-6">
          กำลังค้นหา Cosplayer ที่ตรงใจคุณ <span className="loading-dot" />
        </h3>
      </div>
    </div>
  );
};

export default Finding;