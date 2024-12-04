import React, { useState } from "react";
import MatchedUserCard from "./matched-user-card";
import { Cosplayer } from "@/types/profile";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { IoHeartDislikeOutline, IoHeartOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
// import { HeartOutlined } from "@ant-design/icons";

const FadeEffect = ({ type }: { type: string }) => (
  <div
    className={`z-[200] w-full h-full ${
      type === "ignore" ? "bg-red-200/50" : "bg-green-200/50"
    } absolute left-0 top-0 rounded-lg flex items-center justify-center`}
  >
    {type === "ignore" ? (
      <IoHeartDislikeOutline className="text-red-500 text-[100px] animate-swing" />
    ) : (
      <IoHeartOutline className="text-green-500 text-[100px] animate-heartBeat" />
    )}
  </div>
);

const Result = ({
  cosplayerList,
  setCosplayerList,
}: {
  cosplayerList: Cosplayer[];
  setCosplayerList: React.Dispatch<React.SetStateAction<Cosplayer[]>>;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [fadeType, setFadeType] = useState<string | null>(null);
  const router = useRouter();

  const handlePrevious = () => {
    setIsFading(true);
    setFadeType(null);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : cosplayerList.length - 1
      );
      setIsFading(false);
    }, 500); // 1-second delay for fade
  };

  const handleNext = () => {
    setIsFading(true);
    setFadeType(null);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex < cosplayerList.length - 1 ? prevIndex + 1 : 0
      );
      setIsFading(false);
    }, 500); // 1-second delay for fade
  };

  const handleIgnore = (username: string) => {
    setIsFading(true);
    setFadeType("ignore");
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex < cosplayerList.length - 1 ? prevIndex + 1 : 0
      );
      setIsFading(false);
      const newCosplayerList = cosplayerList.filter(
        (cosplayer) => cosplayer.username !== username
      ); 
      setCosplayerList(newCosplayerList);
    }, 1000); // 1-second delay for fade
  };

  const handleInterest = (username: string) => {
    setIsFading(true);
    setFadeType("interest");
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex < cosplayerList.length - 1 ? prevIndex + 1 : 0
      );
      setIsFading(false);
      router.push(`/profile/${username}`);
    }, 1000); // 1-second delay for fade
  };

  return (
    <div
      className="relative flex flex-col justify-center bg-primary-50 rounded-lg border border-primary-200 px-4 pt-2 
      pb-6 text-primary-700"
    >
      {isFading && fadeType && <FadeEffect type={fadeType} />}
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
              onIgnore={handleIgnore}
              onInterest={handleInterest}
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
