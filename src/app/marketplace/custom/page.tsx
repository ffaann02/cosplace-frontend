import { FaChevronRight } from "react-icons/fa";
import { PiShootingStar } from "react-icons/pi";
import CreateCustomPostForm from "@/components/pages/custom/form";
import { ShopOutlined } from "@ant-design/icons";
import { Button } from "antd";

const CustomPost = () => {
  return (
    <div className="w-full h-full gap-x-2 lg:gap-x-6">
      <div className="bg-gradient-to-t from-primary-100 to-primary-200 w-full px-4 py-6">
        <div className="w-full lg:max-w-[80rem] 2xl:max-w-[86rem] mx-auto px-4 justify-between flex">
          <div className="flex text-primary-700 my-auto">
            <ShopOutlined className="text-3xl mr-3" />
            <h3 className="text-3xl text-primary-800">โพสต์หาร้านคอสเพลย์</h3>
          </div>
          {/* <div className="flex flex-col text-left">
            <span className="text-primary-700">สินค้าไม่ตรงใจ ?</span>
            <Link href="/marketplace/custom">
              <Button className="ml-2" size="small" type="default">
                จ้างร้าน
              </Button>
            </Link>
          </div> */}
        </div>
      </div>
      <div
        className="w-full mt-8 max-w-4xl mx-auto px-4"
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
