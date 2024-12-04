import React, { useState } from "react";
import {
  Card,
  Avatar,
  Typography,
  Space,
  Tag,
  Tooltip,
  Button,
  Carousel,
} from "antd";
import {
  UserOutlined,
  EditOutlined,
  EyeOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { Portfolio, PortfolioImage } from "@/types/portfolios";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const { Title, Text, Paragraph } = Typography;

const PortfolioCard = ({
  portfolioData,
  setIsPortModalVisible,
  setSelectedPortfolio,
}: {
  portfolioData: Portfolio;
  setIsPortModalVisible: (value: boolean) => void;
  setSelectedPortfolio: (value: Portfolio) => void;
}) => {
  const [localPortfolio, setLocalPortfolio] = useState<Portfolio | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();


  const handleViewDetails = () => {
    console.log("HELLO")
    setSelectedPortfolio(portfolioData); // Update parent state
    setLocalPortfolio(portfolioData); // Local state for immediate feedback
    setIsPortModalVisible(true);
    const newParams = new URLSearchParams(searchParams);
    newParams.set("portfolio_id", portfolioData.portfolio_id);
    router.push(`?${newParams.toString()}`);
  };

  return (
    <Card
      id="card-body-portfolio"
      hoverable
      className="w-full h-fit shadow-xs rounded-t-xl"
      cover={
        <div className="flex">
          <Carousel arrows infinite={false} autoplay autoplaySpeed={200}>
            {portfolioData.portfolio_images.map((image, index) => (
              <Image
                key={index}
                src={image.image_url}
                alt={portfolioData.title}
                className="object-cover h-64 w-full rounded-t-lg"
                unoptimized
                width={500}
                height={300}
              />
            ))}
          </Carousel>
        </div>
      }
    >
      <div className="p-4 flex flex-col">
        <Title style={{ marginTop: -6, marginBottom: -2 }} level={3}>
          {portfolioData.title}
        </Title>
        <p className="text-primary-600 mb-4">{portfolioData.description}</p>
        <Button
          type="primary"
          icon={<EyeOutlined />}
          onClick={handleViewDetails}
        >
          ดูรายละเอียด
        </Button>
      </div>
    </Card>
  );
};

export default PortfolioCard;
