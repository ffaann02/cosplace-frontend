import CreateShop from "@/components/pages/myshop/create-shop/create-shop";
import { Breadcrumb } from "antd";

const MyShop = () => {
  return (
    <div className="flex-grow max-w-5xl mx-auto w-full h-full flex mt-12 px-6">
      <div className="w-full">
        <CreateShop />
      </div>
    </div>
  );
};

export default MyShop;
