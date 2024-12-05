"use client";
import {
  HomeOutlined,
  ShopOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Tabs, Empty } from "antd";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { apiClientWithAuth } from "@/api";
import { Order } from "@/types/orders";
import OrderCard from "@/components/pages/marketplace/order/order-card";

const { TabPane } = Tabs;

const Purchase = () => {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const router = useRouter();
  const { user } = useAuth();
  
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const activeTab = tab || "all";

  const handleTabChange = (key: string) => {
    const newParams = new URLSearchParams();
    newParams.set("tab", key);
    router.push(`?${newParams.toString()}`);
  };

  useEffect(() => {
    if (!user) return;
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiClientWithAuth.get(`/checkout/all/user/${user?.user_id}`);
        // Filter orders based on the active tab
        const filteredOrders =
          activeTab === "all"
            ? response.data
            : response.data.filter((order: Order) => order.status.toLowerCase() === activeTab);
        
        setOrders(filteredOrders);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("ไม่สามารถโหลดรายการสั่งซื้อได้");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, activeTab]);

  const renderOrderContent = () => {
    if (loading) return <div className="text-center p-4">กำลังโหลด...</div>;
    if (error) return <div className="text-center p-4 text-red-500">{error}</div>;
    
    if (orders.length === 0) {
      return (
        <Empty 
          description="ไม่มีรายการสั่งซื้อ" 
          className="my-8"
        />
      );
    }

    return (
      <div className="space-y-4">
        {orders.map((order) => (
          <OrderCard key={order.order_id} order={order} />
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className="bg-gradient-to-t from-primary-100 to-primary-200 w-full px-4 pt-6 pb-3">
        <div className="w-full lg:max-w-5xl 2xl:max-w-5xl mx-auto px-4 justify-between flex relative h-full flex-grow">
          <div className="text-primary-700 my-auto">
            <div className="flex">
              <ShoppingOutlined className="text-3xl mr-3" />
              <h3 className="text-3xl text-primary-800">รายการคำสั่งซื้อ</h3>
            </div>
            <div className="mt-2">
              <Breadcrumb
                items={[
                  {
                    href: "/",
                    title: (
                      <>
                        <HomeOutlined />
                        <span>หน้าหลัก</span>
                      </>
                    ),
                  },
                  {
                    href: "/marketplace",
                    title: (
                      <>
                        <ShopOutlined />
                        <span>สินค้า</span>
                      </>
                    ),
                  },
                  {
                    title: (
                      <div className="flex">
                        <ShoppingOutlined className="my-auto mr-1" />
                        <span>รายการคำสั่งซื้อ</span>
                      </div>
                    ),
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 w-full lg:max-w-5xl 2xl:max-w-5xl mx-auto px-4 justify-between flex relative h-full flex-grow">
        <Tabs activeKey={activeTab} onChange={handleTabChange} style={{ width: "100%" }}>
          <TabPane tab="ทั้งหมด" key="all">
            {renderOrderContent()}
          </TabPane>
          <TabPane tab="ได้รับแล้ว" key="received">
            {renderOrderContent()}
          </TabPane>
          <TabPane tab="ชำระเงินแล้ว" key="paid">
            {renderOrderContent()}
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default Purchase;