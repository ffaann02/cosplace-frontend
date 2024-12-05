import { apiClient, apiClientWithAuth } from "@/api";
import { useAuth } from "@/context/auth-context";
import { Seller } from "@/types/seller";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  HomeOutlined,
  ShopOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { Card, Empty, Image, Statistic, Tag, Typography } from "antd";
import { set } from "date-fns";
import React, { useEffect, useState } from "react";

const { Title, Text } = Typography;

const Overview = () => {
  const [shopInfo, setShopInfo] = useState<Seller | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchShopInfo = async () => {
      try {
        const response = await apiClient.get("/shop/" + user?.seller_id);
        console.log(response.data);
        setShopInfo(response.data.seller);
      } catch (error) {
        console.error("Error fetching shop info:", error);
      }
    };

    fetchShopInfo();
  }, []);

  return (
    <div className="p-2 lg:p-6 text-primary-700">
      <Title level={3} className="mb-4">
        <ShopOutlined className="mr-2" />
        ภาพรวมร้านค้า
      </Title>
      <h5 className="mt-8">ธุรกิจ และการขาย</h5>
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
        <Card bordered={false}>
          <Statistic
            title="ผู้เข้าชมร้านค้า"
            value={11.28}
            precision={2}
            valueStyle={{ color: "#3f8600" }}
            prefix={<ArrowUpOutlined />}
            suffix="%"
          />
        </Card>
        <Card bordered={false}>
          <Statistic
            title="ยอดขายรวม"
            value={9.3}
            precision={2}
            valueStyle={{ color: "#cf1322" }}
            prefix={<ArrowDownOutlined />}
            suffix="%"
          />
        </Card>
        <Card bordered={false}>
          <Statistic
            title="ความพึงพอใจต่อสินค้า"
            value={3.5}
            prefix={<StarOutlined />}
          />
        </Card>
      </div>
      <h5 className="mt-8">โปรไฟล์ร้านค้า</h5>
      <div className="mt-2">
        {shopInfo ? (
          <div className="w-full bg-white px-3 py-6 rounded-lg shadow-md flex flex-col md:flex-row gap-6">
            {/* Left Section: Profile Image and Basic Info */}
            <div className="flex flex-col items-center md:w-1/3">
              {/* Profile Image */}
              <Image
                src={shopInfo.profile_image_url}
                alt={shopInfo.shop_name}
                width={200}
                height={200}
                className="rounded-lg object-cover mb-4"
              />

              {/* Shop Name */}
              <Title level={4} className="text-center">
                {shopInfo.shop_name || "ไม่มีชื่อร้าน"}
              </Title>
            </div>

            {/* Right Section: Shop Details */}
            <div className="md:w-2/3 text-left">
              <Text strong>ประเภท:</Text> {shopInfo.shop_type || "ไม่ระบุ"}
              <br />
              <Text strong>คำอธิบาย:</Text>{" "}
              {shopInfo.shop_desc || "ไม่มีคำอธิบาย"}
              <br />
              <Text strong>การชำระเงิน:</Text>{" "}
              {shopInfo.accept_credit_card ? "บัตรเครดิต, " : ""}
              {shopInfo.accept_qr_promptpay ? "QR PromptPay" : ""}
              {!shopInfo.accept_credit_card &&
                !shopInfo.accept_qr_promptpay &&
                "ไม่มี"}
              <br />
              <Text strong>ธนาคาร:</Text>{" "}
              {shopInfo.bank_name
                ? `${shopInfo.bank_name} (${shopInfo.bank_account_number})`
                : "ไม่ระบุ"}
              <br />
              <Text strong>ลิงก์ร้านค้า:</Text>{" "}
              {shopInfo.external_link ? (
                <a
                  href={shopInfo.external_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {shopInfo.external_link}
                </a>
              ) : (
                "ไม่มีลิงก์"
              )}
              <br />
              <Text strong>สถานะ:</Text>{" "}
              <Tag color={shopInfo.verify ? "green" : "red"}>
                {shopInfo.verify ? "ยืนยันแล้ว" : "ยังไม่ได้ยืนยัน"}
              </Tag>
              <br />
              <Text strong>สร้างเมื่อ:</Text>{" "}
              {new Date(shopInfo.created_at).toLocaleDateString() || "ไม่ระบุ"}
              <br />
              <Text strong>อัปเดตล่าสุด:</Text>{" "}
              {new Date(shopInfo.updated_at).toLocaleDateString() || "ไม่ระบุ"}
            </div>
          </div>
        ) : (
          <Card bordered={false}>
            <Empty description="ไม่มีข้อมูลโปรไฟล์ร้านค้า" />
          </Card>
        )}
      </div>
    </div>
  );
};

export default Overview;
