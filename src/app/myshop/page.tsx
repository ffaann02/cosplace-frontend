"use client";
import CreateShop from "@/components/pages/myshop/create-shop/create-shop";
import MyShopBoard from "@/components/pages/myshop/manage";
import { useAuth } from "@/context/auth-context";
import { Breadcrumb, Spin } from "antd";

const MyShop = () => {
  const { user } = useAuth();
  if (user?.role === null) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div
      className={`flex-grow ${
        user?.role === "seller" ? "max-w-7xl" : " max-w-5xl"
      } mx-auto w-full h-full flex mt-12 px-6`}
    >
      <div className="w-full">
        {user?.role === "seller" ? (
          <MyShopBoard />
        ) : user === null ? (
          <div className="flex justify-center items-center h-full">
            <Spin size="large" />
          </div>
        ) : (
          <CreateShop />
        )}
      </div>
    </div>
  );
};

export default MyShop;
