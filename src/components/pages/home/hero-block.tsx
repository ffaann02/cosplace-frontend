"use client";
import MascotImageGif from "../../../public/images/mascot.gif";
import Image from "next/image";
import HeroButton from "@/components/button";
import { FaUserFriends } from "react-icons/fa";
import { RiScissors2Line } from "react-icons/ri";
import { MdEventAvailable } from "react-icons/md";
import BackgroundFloatItem from "./bg-float-item";
const HeroBlock = () => {
  const click = () => {
    console.log("click");
  };

  return (
    <div className="w-full flex min-h-[56vh] bg-gradient-to-l from-primary-100 to-secondary-500 
    relative rounded-bl-[6rem] border-b-4 border-dotted border-secondary-600">
      <RiScissors2Line className="absolute -bottom-2.5 left-12 text-3xl rotate-[120deg]"/>
      <div
        className="grid grid-cols-8 lg:grid-cols-12 w-full h-full max-w-7xl m-auto 
        lg:px-12 2xl:px-0 z-10 overflow-hidden"
      >
        <BackgroundFloatItem/>
        <div className="w-full h-full flex pt-6 px-8 md:px-16 pb-6  md:pb-0 col-span-8 z-[50]">
          <div className="w-full flex flex-col h-full">
            <div className="my-auto">
              <h1 className="text-neutral-50 font-semibold text-outline [text-shadow:_0_3px_4px_#e2c799]">
                ซื้อ เช่า ขาย สั่งตัดพิเศษ
              </h1>
              <h3 className="text-white">
                ชุด เสื้อผ้า อุปกรณ์ตกแต่ง และอื่น ๆ ที่เกี่ยวกับคอสเพลย์
              </h3>
              <div className="mt-2">
                <HeroButton text="เริ่มค้นหาใน Marketplace" onClick={click} />
              </div>
            </div>
            <div className="mt-auto mb-0">
              <p className="mt-6 mb-1 text-white text-lg">บริการอื่น ๆ </p>
              <div className="w-full xl:w-3/4 bg-secondary-100 px-6 py-4 rounded-xl drop-shadow-sm  border border-primary-400">
                <div className="w-full h-full grid grid-cols-2 gap-x-2 divide-x-2 divide-primary-300">
                  <div className="w-full">
                    <FaUserFriends className="text-4xl text-primary-600" />
                    <h4 className="text-primary-600">ค้นหาเพื่อน</h4>
                    <a className="text-sm text-primary-500">
                      Lorem ipsum dolor sit amet
                    </a>
                  </div>
                  <div className="pl-4 ">
                    <MdEventAvailable className="text-4xl text-primary-600" />
                    <h4 className="text-primary-600">ค้นหางานและกิจกรรม</h4>
                    <a className="text-sm text-primary-500">
                      Lorem ipsum dolor sit amet
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="float z-50 w-full h-full hidden lg:flex items-center justify-center my-auto col-span-4">
          <Image
            priority
            unoptimized={true}
            src={MascotImageGif}
            alt="hero-mascot"
            width={500}
            height={500}
            className="z-50"
          />
        </div>
        <div className="float lg:hidden absolute right-0 md:right-0 bottom-8 md:bottom-12 -z-10">
          <Image
            priority
            unoptimized={true}
            src={MascotImageGif}
            alt="hero-mascot"
            width={320}
            height={320}
            className="opacity-10 sm:opacity-30 md:opacity-60"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroBlock;
