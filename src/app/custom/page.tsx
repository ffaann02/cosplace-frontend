import { FaChevronRight } from "react-icons/fa";
import { PiShootingStar } from "react-icons/pi";
import CreateCustomPostForm from "@/components/pages/custom/form";

const CustomPost = () => {

  return (
    <div className="max-w-7xl mx-auto w-full h-full mt-12 grid grid-cols-5 gap-x-2 lg:gap-x-6 px-4">
      <div className="divide-y col-span-full md:col-span-4 bg-neutral-50 rounded-xl pt-4 
        drop-shadow-sm border border-neutral-100">
        <h3 className="text-center mb-3 text-primary-800 font-light">
          เขียนโพสต์จ้างร้านค้า และบริการ
        </h3>
        <CreateCustomPostForm/>
      </div>
      <div
        className="hidden md:block col-span-1 h-fit border border-neutral-100
        rounded-lg px-3 pt-1.5 pb-4 drop-shadow-sm bg-white"
      >
        <div className="text-primary-800 mb-2 flex">
          <span className="text-md lg:text-xl font-light">กำลังมาแรง</span>
          <PiShootingStar className="text-xl ml-1 my-auto" />
        </div>
        <div className="flex flex-col gap-y-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <div className="b-2">
              <div className="text-sm lg:text-lg text-primary-600 flex">
                <p className="font-light">Lorem, ipsum.</p>
                <FaChevronRight
                  className="text-primary-400 text-sm my-auto ml-auto
                cursor-pointer"
                />
              </div>
              <p className="text-xs font-light text-primary-700">
                ถูกพูดถึง 20,000 ครั้ง
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomPost;