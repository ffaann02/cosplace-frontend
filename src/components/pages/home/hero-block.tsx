"use client";
import MascotImage from "@/public/images/mascot.png";
import Image from "next/image";
import HeroButton from "@/components/button";
import { FaUserFriends } from "react-icons/fa";
import { MdEventAvailable } from "react-icons/md";
const HeroBlock = () => {
  const click = () => {
    console.log("click");
  };

  return (
    <div className="w-full flex min-h-[56vh] bg-gradient-to-l from-primary-100 to-secondary-500 overflow-hidden relative">
      <div className="grid grid-cols-8 lg:grid-cols-12 w-full h-full max-w-7xl m-auto lg:px-12 2xl:px-0 z-10
      overflow-hidden">
        <div className="w-full h-full flex pt-6 px-8 md:px-16 pb-6  md:pb-0 col-span-8">
          <div className="w-full flex flex-col h-full">
            {/* <h1 className="w-fit text-6xl font-semibold tracking-wider flex flex-col">
              <span className="text-secondary-600 -mb-2">คอสบ้าน</span>
              <div className="border-t border-2 border-white my-3"></div>
              <span className="-mt-2 text-secondary-700">เดียวกัน</span>
            </h1> */}
            <div className="my-auto">
              <h1 className="text-neutral-50 font-semibold text-outline [text-shadow:_0_3px_4px_#e2c799] mt-6">
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
                  {/* <div className="pl-4">
                    <FaUserFriends className="text-4xl text-primary-600" />
                    <h4 className="text-primary-600"></h4>
                    <a className="text-sm text-primary-500">
                      Lorem ipsum dolor sit amet consectetur adipisicing.
                    </a>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-full hidden lg:flex items-center justify-center my-auto col-span-4">
          <Image src={MascotImage} alt="hero-mascot" width={500} height={500} />
        </div>
        <Image src={MascotImage} alt="hero-mascot" width={400} height={400} 
            className="lg:hidden absolute -right-10 md:right-0 bottom-2 md:-bottom-0 -z-10 opacity-10 sm:opacity-30 md:opacity-60" />
      </div>
    </div>
  );
};

export default HeroBlock;
