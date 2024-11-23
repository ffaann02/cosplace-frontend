import React from "react";
import {
  Card,
  Descriptions,
  Image,
  Tag,
  Typography,
  Divider,
  Space,
} from "antd";
import { Product } from "./products";
// import { divider } from "@/config/theme";

const { Title, Text } = Typography;

export const divider = {
    marginLeft: 0,
    marginRight: 0,
    marginTop: 4,
    marginBottom: 4,
  };

const ExpandProductCard = ({ product }: { product: Product }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
    }).format(price);
  };

  return (
    <Card>
      <div style={{ display: "flex", gap: "24px" }}>
        {/* Image Gallery Section */}
        <div style={{ width: "30%" }}>
          <Image.PreviewGroup>
            <div style={{ marginBottom: "8px" }}>
              <Image
                src={product.product_images[0]?.image_url}
                alt={product.name}
                style={{ width: "100%", borderRadius: "8px" }}
              />
            </div>
            <Space size={8}>
              {product.product_images.slice(1).map((image) => (
                <Image
                  key={image.product_image_id}
                  src={image.image_url}
                  width={120}
                  style={{ borderRadius: "4px" }}
                  alt={product.name}
                />
              ))}
            </Space>
          </Image.PreviewGroup>
        </div>

        {/* Product Details Section */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "16px",
            }}
          >
            <div>
              <Title level={4} style={{ marginBottom: "4px" }}>
                {product.name}
              </Title>
              <Text type="secondary">รหัสสินค้า: {product.product_id}</Text>
            </div>
            <div style={{ textAlign: "right" }}>
              <Title level={4} style={{ margin: 0 }}>
                {formatPrice(product.price)}
              </Title>
              <Tag color={product.rent ? "purple" : "blue"}>
                {product.rent ? "ให้เช่า" : "ขาย"}
              </Tag>
            </div>
          </div>

          <Divider style={divider} />

          <Descriptions title="รายละเอียดสินค้า" column={2}>
            <Descriptions.Item label="หมวดหมู่">
              {product.category}
            </Descriptions.Item>
            <Descriptions.Item label="สภาพ">
              {product.condition}
            </Descriptions.Item>
            <Descriptions.Item label="ขนาด">{product.size}</Descriptions.Item>
            <Descriptions.Item label="พื้นที่">
              {product.region}
            </Descriptions.Item>
            <Descriptions.Item label="จำนวนคงเหลือ">
              {product.quantity}
            </Descriptions.Item>
          </Descriptions>

          {product.rent && (
            <>
              <Divider style={divider} />
              <Descriptions title="ข้อมูลการเช่า" column={2}>
                <Descriptions.Item label="เงินมัดจำ">
                  {formatPrice(product.rent_deposit)}
                </Descriptions.Item>
                <Descriptions.Item label="วันที่คืน">
                  {formatDate(product.rent_return_date)}
                </Descriptions.Item>
              </Descriptions>
            </>
          )}

          <Divider style={divider} />

          <Descriptions title="คำอธิบาย" column={1}>
            <Descriptions.Item>{product.description}</Descriptions.Item>
          </Descriptions>

          {/* <Divider style={divider} /> */}

          {/* <Descriptions column={1} size="small">
            <Descriptions.Item label="สร้างโดย">
              {product.created_by}
            </Descriptions.Item>
            <Descriptions.Item label="วันที่สร้าง">
              {formatDate(product.created_at)}
            </Descriptions.Item>
            <Descriptions.Item label="แก้ไขล่าสุด">
              {formatDate(product.updated_at)}
            </Descriptions.Item>
            {product.deleted_at && (
              <Descriptions.Item label="วันที่ลบ">
                <Text type="danger">{formatDate(product.deleted_at)}</Text>
              </Descriptions.Item>
            )}
          </Descriptions> */}
        </div>
      </div>
    </Card>
  );
};

export default ExpandProductCard;
