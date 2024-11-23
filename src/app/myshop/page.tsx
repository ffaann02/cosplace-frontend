"use client";
import CreateShop from "@/components/pages/myshop/create-shop/create-shop";
import MyShopBoard from "@/components/pages/myshop/manage";
import { useAuth } from "@/context/auth-context";
import { Breadcrumb } from "antd";

const MyShop = () => {
  // const { user } = useAuth();
  const user = {
    user_id: 1,
    username: "admin1",
    role: "seller",
  };

  return (
    <div
      className={`flex-grow ${
        user?.role === "seller" ? "max-w-7xl" : " max-w-5xl"
      } mx-auto w-full h-full flex mt-12 px-6`}
    >
      <div className="w-full">
        {user?.role === "seller" ? <MyShopBoard /> : <CreateShop />}
      </div>
    </div>
  );
};

export default MyShop;
