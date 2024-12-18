"use client";
import Image from "next/image";

const Loading = () => {
  return (
    <div className="fixed w-full h-dvh z-[100] flex flex-col bg-primary-600/25 backdrop-blur-sm">
      <div className="w-full h-4/5 flex">
        <div className="m-auto text-center">
          <Image
            src={"/images/tanukiLoading.gif"}
            alt="Loading"
            width={400}
            height={400}
            className="scale-110 mr-6"
          />
          <h1 className="text-3xl mt-4 text-primary-800">
            กำลังโหลดข้อมูล
            <span className="loading-dot text-3xl" />
          </h1>
        </div>
      </div>
    </div>
  );
};
export default Loading;
