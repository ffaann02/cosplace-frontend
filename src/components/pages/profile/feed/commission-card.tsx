import React, { useEffect, useState } from "react";
import { Card, Tag, Typography, Space, Image, Button, Modal } from "antd";
import { CommissionPost } from "@/types/commissions";
import { EyeOutlined } from "@ant-design/icons";
import { useRouter, useSearchParams } from "next/navigation";

const { Text, Paragraph } = Typography;
const { PreviewGroup } = Image;

const CommissionCard = ({ commission }: { commission: CommissionPost }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleViewDetails = () => {
    setIsModalVisible(true);
    const newParams = new URLSearchParams(searchParams);
    newParams.set("commission_id", commission.post_id);
    router.push(`?${newParams.toString()}`);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("commission_id");
    router.push(`?${newParams.toString()}`);
  };

  useEffect(() => {
    if (searchParams.get("commission_id")) {
      const portfolio_id = searchParams.get("commission_id");
      if (portfolio_id === commission.post_id) {
        setIsModalVisible(true);
      }
    }
  }, []);

  return (
    <>
      <Card
        title={commission.title}
        extra={
          <Tag color={getStatusColor(commission.status)}>
            {getStatusThai(commission.status)}
          </Tag>
        }
        style={{ width: "100%", paddingBottom: -10 }}
      >
        {commission.custom_ref_images.length > 0 && (
          <PreviewGroup>
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  commission.custom_ref_images.length > 2
                    ? "repeat(2, 1fr)"
                    : "repeat(1, 1fr)",
                gap: "8px",
              }}
            >
              {commission.custom_ref_images.map((image, index) => (
                <Image
                  key={image.commission_image_id}
                  alt={`Reference Image ${index + 1}`}
                  src={image.image_url}
                  style={{
                    height: 150,
                    width: "100%",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              ))}
            </div>
          </PreviewGroup>
        )}

        <Typography style={{ marginTop: 16 }}>
          <Paragraph>
            <Space>
              <Text strong>อนิเมะ ภาพยนตร์ หรือซีรีย์:</Text>
              <Text>{commission.anime_name}</Text>
            </Space>
          </Paragraph>

          <Paragraph>
            <Space>
              <Text strong>ช่วงราคา:</Text>
              <Text>
                ${commission.price_range_start} - ${commission.price_range_end}
              </Text>
            </Space>
          </Paragraph>

          <Paragraph>
            <Text strong>คำอธิบาย:</Text>
            <Paragraph ellipsis={{ rows: 3, expandable: true }}>
              {commission.description}
            </Paragraph>
          </Paragraph>

          {commission.tag && (
            <Paragraph>
              <Text strong>แท็ก:</Text>
              <Tag>{commission.tag}</Tag>
            </Paragraph>
          )}

          <Paragraph
            style={{ textAlign: "right", color: "gray", fontSize: "12px" }}
          >
            <Text type="secondary">
              {`สร้างเมื่อ: ${formatThaiDate(commission.created_at)}`}
            </Text>
          </Paragraph>
        </Typography>

        <Button
          size="large"
          style={{ width: "100%" }}
          type="primary"
          icon={<EyeOutlined />}
          onClick={handleViewDetails}
        >
          ดูรายละเอียด
        </Button>
      </Card>

      {/* Modal for details */}
      <Modal
        title={""}
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={
          <Button type="primary" onClick={handleModalClose}>
            ปิด
          </Button>
        }
        width={800}
      >
        <Typography>
          <Paragraph>
            <Space>
              <Text strong style={{ fontSize: "24px" }}>
                {commission.title}
              </Text>
              {/* <Text>{commission.anime_name}</Text> */}
            </Space>
          </Paragraph>
          <Paragraph>
            <Space>
              <Text strong>อนิเมะ ภาพยนตร์ หรือซีรีย์:</Text>
              <Text>{commission.anime_name}</Text>
            </Space>
          </Paragraph>

          <Paragraph>
            <Space>
              <Text strong>ช่วงราคา:</Text>
              <Text>
                ${commission.price_range_start} - ${commission.price_range_end}
              </Text>
            </Space>
          </Paragraph>

          <Paragraph>
            <Text strong>คำอธิบาย:</Text>
            <Paragraph>{commission.description}</Paragraph>
          </Paragraph>

          {commission.tag && (
            <Paragraph>
              <Text strong>แท็ก:</Text>
              <Tag>{commission.tag}</Tag>
            </Paragraph>
          )}

          {commission.custom_ref_images.length > 0 && (
            <PreviewGroup>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    commission.custom_ref_images.length > 2
                      ? "repeat(2, 1fr)"
                      : "repeat(1, 1fr)",
                  gap: "8px",
                  marginTop: 16,
                }}
              >
                {commission.custom_ref_images.map((image, index) => (
                  <Image
                    key={image.commission_image_id}
                    alt={`Reference Image ${index + 1}`}
                    src={image.image_url}
                    style={{
                      height: 150,
                      width: "100%",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                ))}
              </div>
            </PreviewGroup>
          )}
        </Typography>
      </Modal>
    </>
  );
};

// Helper functions remain unchanged
const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "open":
      return "green";
    case "in progress":
      return "blue";
    case "closed":
      return "red";
    default:
      return "default";
  }
};

const getStatusThai = (status: string) => {
  switch (status.toLowerCase()) {
    case "open":
      return "เปิด";
    case "in progress":
      return "กำลังดำเนินการ";
    case "closed":
      return "ปิด";
    default:
      return status;
  }
};

const formatThaiDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default CommissionCard;
