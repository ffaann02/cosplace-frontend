import Image from "next/image";
import React from "react";

const Result = ({ 
  cosplayerList 
} : {
  cosplayerList: any[]
}) => {

  console.log(cosplayerList);

  return (
    <div className="flex flex-col justify-center">
      <Image
        priority
        unoptimized={true}
        src={"/images/mascot.gif"}
        alt="hero-mascot"
        width={400}
        height={400}
        className="z-50 mx-auto"
      />
      <h3 className="text-primary-600 text-center">
        กำลังค้นหา Cosplayer ที่ตรงใจคุณ <span className="loading-dot" />
      </h3>
    </div>
  );
};

export default Result;
