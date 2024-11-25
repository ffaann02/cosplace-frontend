import { FaChevronRight } from "react-icons/fa";
import { PiShootingStar } from "react-icons/pi";
import CreateCustomPostForm from "@/components/pages/custom/form";

const CustomPost = () => {
  return (
    <div className="max-w-4xl mx-auto w-full h-full mt-12 gap-x-2 lg:gap-x-6 px-4">
      <div
        className="w-full"
      >
        <h3 className="text-center mb-3 text-primary-800 font-light">
          เขียนโพสต์จ้างร้านค้า และบริการ
        </h3>
        <CreateCustomPostForm />
      </div>
    </div>
  );
};

export default CustomPost;
