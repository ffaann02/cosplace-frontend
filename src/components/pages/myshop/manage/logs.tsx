import React, { useState, useEffect } from "react";
import { Table, Typography, Tag, Button, Empty } from "antd";
import { FileSearchOutlined, ShoppingOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { apiClient, apiClientWithAuth } from "@/api";
import { Order } from "@/types/orders";
import OrderCard from "../../marketplace/order/order-card";
import { CommissionPost } from "@/types/commissions";

const { Title, Text } = Typography;

const Logs: React.FC = () => {
  const router = useRouter();
  const { user } = useAuth();

  // State for commissions, orders, loading, and expanded row key
  const [commissions, setCommissions] = useState<CommissionPost[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);

  // Fetch data on component mount
  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch commissions
        const commissionsResponse = await apiClient.get("/custom");
        const commissionsWithKey = commissionsResponse.data.commissions.map(
          (commission: CommissionPost, index: number) => ({
            ...commission,
            key: index + 1,
          })
        );
        setCommissions(commissionsWithKey);

        // Fetch orders for seller
        const ordersResponse = await apiClientWithAuth.get(
          "/checkout/all/seller/" + user?.seller_id
        );
        // setOrders(ordersResponse.data);
        // Add 'key' to each order
        const ordersWithKey = ordersResponse.data.map(
          (order: Order, index: number) => ({
            ...order,
            key: index + 1,
          })
        );
        setOrders(ordersWithKey);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  // Commission Table Columns
  const commissionColumns = [
    {
      title: "ลำดับ",
      dataIndex: "key",
      key: "key"
    },
    {
      title: "ชื่อหัวข้อ",
      dataIndex: "title",
      key: "title",
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: "คำอธิบาย",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "วันที่โพสต์",
      dataIndex: "created_at",
      key: "created_at",
      render: (date: string) => new Date(date).toLocaleDateString("th-TH"),
    },
    {
      title: "การดำเนินการ",
      key: "actions",
      render: (record: CommissionPost) => (
        <Button
          type="default"
          icon={<FileSearchOutlined />}
          onClick={() =>
            router.push(
              "/marketplace/custom?tab=find&commission_id=" + record.post_id
            )
          }
        >
          ดูรายละเอียด
        </Button>
      ),
    },
  ];

  // Render OrderCard in Collapse
  // const renderOrderExpanded = (record: Order) => <OrderCard order={record} />;

  // Orders Table Columns
  const orderColumns = [
    {
      title: "ลำดับ",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "หมายเลขออเดอร์",
      dataIndex: "order_id",
      key: "order_id",
    },
    {
      title: "จำนวนสินค้า",
      key: "total_items",
      render: (record: Order) =>
        `${record.order_lists.reduce(
          (sum, item) => sum + item.quantity,
          0
        )} ชิ้น`,
    },
    {
      title: "ยอดรวม",
      dataIndex: "amount",
      key: "amount",
      render: (amount: number) =>
        amount.toLocaleString("th-TH", { style: "currency", currency: "THB" }),
    },
    {
      title: "สถานะ",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const statusMap: Record<string, { color: string; text: string }> = {
          pending: { color: "orange", text: "รอดำเนินการ" },
          paid: { color: "green", text: "ชำระเงินแล้ว" },
          received: { color: "blue", text: "ได้รับสินค้าแล้ว" },
        };
        const statusInfo = statusMap[status.toLowerCase()] || {
          color: "default",
          text: status,
        };
        return <Tag color={statusInfo.color}>{statusInfo.text}</Tag>;
      },
    },
  ];

  return (
    <div className="container mx-auto p-4 lg:p-6">
      <div className="mb-8">
        <Title level={3} className="text-primary-700 mb-4">
          <ShoppingOutlined className="mr-2" />
          ติดตามออเดอร์ และประกาศจ้าง
        </Title>

        {/* Orders Table */}
        <div>
          <Title level={4} className="mt-4">
            รายการสั่งซื้อ
          </Title>
          <Table
            columns={orderColumns}
            dataSource={orders}
            pagination={{
              pageSize: 5,
              showSizeChanger: false,
            }}
            expandable={{
              expandedRowRender: (record) => (
                <OrderCard key={record.order_id} order={record} />
              ),
            }}
            locale={{
              emptyText: <Empty description="ไม่มีรายการสั่งซื้อ" />,
            }}
            loading={loading}
          />
        </div>
        {/* Commissions Table */}
        <div className="">
          <Title level={4} className="mb-4">
            ประกาศจ้าง
          </Title>
          <Table
            columns={commissionColumns}
            dataSource={commissions}
            pagination={{
              pageSize: 5,
              showSizeChanger: false,
            }}
            locale={{
              emptyText: <Empty description="ไม่มีประกาศจ้าง" />,
            }}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default Logs;
