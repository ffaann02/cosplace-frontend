"use client";
import CreateShop from "@/components/pages/myshop/create-shop/create-shop";
import ShopDashboard from "@/components/pages/myshop/shop-dashboard/shop-dashboard";
import { useAuth } from "@/context/auth-context";
import { Breadcrumb } from "antd";

const MyShop = () => {

  const { user } = useAuth();

  return (
    <div className="flex-grow max-w-5xl mx-auto w-full h-full flex mt-12 px-6">
      <div className="w-full">
        {user?.role === "seller" ? (
          <ShopDashboard />
        ) : (
          <CreateShop />
        )
        }
      </div>
    </div>
  );
};

export default MyShop;
