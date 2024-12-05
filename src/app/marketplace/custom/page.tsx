"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { PiShootingStar } from "react-icons/pi";
import CreateCustomPostForm from "@/components/pages/custom/form";
import {
  HomeOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Button, Tabs } from "antd";
import { apiClient } from "@/api";
import { CommissionPost } from "@/types/commissions";
import CommissionCard from "@/components/pages/profile/feed/commission-card";

const CustomPost = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Default to 'find' tab if not specified
  const tab = searchParams.get("tab") || "find";

  // State to store the commission data
  const [commissions, setCommissions] = useState<CommissionPost[]>([]);

  // Function to handle tab change
  const handleTabChange = (key: string) => {
    // Update the URL with the new tab query parameter
    const newParams = new URLSearchParams();
    newParams.set("tab", key);
    router.push(`?${newParams.toString()}`);
  };

  // Fetch commissions on component mount
  useEffect(() => {
    const fetchCommissions = async () => {
      try {
        const response = await apiClient.get("/custom"); // Assuming /custom returns the commissions list
        console.log(response.data); // Log the commissions data
        setCommissions(response.data.commissions); // Store the commissions data
      } catch (error) {
        console.error("Failed to fetch commissions:", error);
      }
    };

    if (tab === "find") {
      fetchCommissions();
    }
  }, [tab]);

  return (
    <div className="w-full h-full gap-x-2 lg:gap-x-6">
      <div className="bg-gradient-to-t from-primary-100 to-primary-200 w-full px-4 py-6">
        <div className="w-full sm:max-w-5xl mx-auto px-4">
          <div className="flex text-primary-700 my-auto">
            <ShopOutlined className="text-3xl mr-3" />
            <h3 className="text-3xl text-primary-800">
              โพสต์จ้างชุดและอุปกรณ์
            </h3>
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
                  href: "/select-service",
                  title: (
                    <>
                      <ShopOutlined />
                      <span>บริการ</span>
                    </>
                  ),
                },
                {
                  title: (
                    <>
                      <ShoppingCartOutlined />
                      <span>จ้างร้านค้า</span>
                    </>
                  ),
                },
              ]}
            />
          </div>
        </div>
      </div>
      <div className="w-full mt-4 max-w-4xl mx-auto px-4">
        <Tabs
          size="large"
          defaultActiveKey={tab === "find" || tab === "form" ? tab : "find"}
          onChange={handleTabChange}
          activeKey={tab}
        >
          <Tabs.TabPane tab="ประกาศจ้าง" key="find">
          </Tabs.TabPane>

          <Tabs.TabPane tab="เขียนโพสต์จ้าง" key="form">
          </Tabs.TabPane>
        </Tabs>
        {tab === "find" && (
          <div>
            <h3 className="mb-2 text-primary-800">ประกาศจ้างร้านค้า</h3>
            <div className="space-y-4">
              {commissions.map((commission) => (
                <CommissionCard
                  key={commission.title}
                  commission={commission}
                />
              ))}
            </div>
          </div>
        )}
        {tab === "form" && (
          <div>
            <h3 className="text-center mb-3 text-primary-800 font-light">
              เขียนโพสต์จ้างร้านค้า และบริการ
            </h3>
            <CreateCustomPostForm isRedirect={true} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomPost;
