import React, { useState } from "react";
import MatchedUserCard from "./matched-user-card";
import { Cosplayer } from "@/types/profile";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Result = ({ cosplayerList }: { cosplayerList: Cosplayer[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const handlePrevious = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : cosplayerList.length - 1
      );
      setIsFading(false);
    }, 500); // 1-second delay for fade
  };

  const handleNext = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex < cosplayerList.length - 1 ? prevIndex + 1 : 0
      );
      setIsFading(false);
    }, 500); // 1-second delay for fade
  };

  return (
    <div
      className="relative flex flex-col justify-center bg-primary-50 rounded-lg border border-primary-200 px-4 pt-2 
      pb-6 text-primary-700"
    >
      <div className="w-full border-b-2 border-primary-100 pb-2 mb-3">
        <h4>ผลลัพธ์การค้นหา</h4>
      </div>
      <div className="flex justify-center">
        <h4 className="text-md mb-2 text-center">
          <strong>{cosplayerList.length}</strong> คนที่ตรงความสนใจคุณ
        </h4>
        <p className="ml-4 mb-2 bg-white px-2 py-1 rounded-md">
          {currentIndex + 1}/{cosplayerList.length}
        </p>
      </div>
      <div className="relative flex justify-center items-center">
        <button
          onClick={handlePrevious}
          className="absolute -left-8 lg:left-0 bg-primary-100 rounded-full w-fit h-fit p-2 border-2 border-primary-300 z-[100]
         hover:bg-primary-200"
        >
          <FaChevronLeft className="text-2xl text-primary-600" />
        </button>
        <div
          className="w-full lg:max-w-4xl bg-white mx-auto p-4 rounded-lg drop-shadow-sm transition-opacity duration-1000"
          style={{ opacity: isFading ? 0 : 1 }}
        >
          {cosplayerList && cosplayerList.length > 0 && (
            <MatchedUserCard
              key={cosplayerList[currentIndex].user_id}
              cosplayer={cosplayerList[currentIndex]}
            />
          )}
        </div>
        <button
          onClick={handleNext}
          className="absolute -right-8 lg:right-0 bg-primary-100 rounded-full w-fit h-fit p-2 border-2 border-primary-300 z-[100]
         hover:bg-primary-200"
        >
          <FaChevronRight className="text-2xl text-primary-600" />
        </button>
      </div>
    </div>
  );
};

export default Result;
