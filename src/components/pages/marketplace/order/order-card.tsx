import React from 'react';
import { Card, Tag, Typography, Divider } from 'antd';
import { 
  ClockCircleOutlined, 
  CheckCircleOutlined, 
  DollarCircleOutlined 
} from '@ant-design/icons';
import { Order } from '@/types/orders';

const { Text, Title } = Typography;

// Status mapping to Thai and icons
type OrderStatus = 'pending' | 'paid' | 'received';

const STATUS_MAP: Record<OrderStatus, { thai: string; color: string; icon: JSX.Element }> = {
  'pending': { 
    thai: 'รอดำเนินการ', 
    color: 'orange', 
    icon: <ClockCircleOutlined /> 
  },
  'paid': { 
    thai: 'ชำระเงินแล้ว', 
    color: 'green', 
    icon: <DollarCircleOutlined /> 
  },
  'received': { 
    thai: 'ได้รับสินค้าแล้ว', 
    color: 'blue', 
    icon: <CheckCircleOutlined /> 
  }
};

interface OrderCardProps {
  order: Order;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  // Format date to Thai-friendly format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Calculate total items
  const totalItems = order.order_lists.reduce((sum, item) => sum + item.quantity, 0);
  const statusDetails = STATUS_MAP[order.status.toLowerCase() as OrderStatus] || STATUS_MAP.pending;
  // Get status details

  return (
    <Card 
      title={
        <div className="flex justify-between items-center">
          <Title level={5} className="m-0">
            หมายเลขคำสั่งซื้อ: {order.order_id}
          </Title>
          <Tag 
            icon={statusDetails.icon} 
            color={statusDetails.color}
          >
            {statusDetails.thai}
          </Tag>
        </div>
      }
      extra={
        <Text type="secondary">
          {formatDate(order.created_at)}
        </Text>
      }
      className="mb-4 shadow-md"
    >
      {/* Products in the order */}
      {order.products.map((product) => (
        <div key={product.product_id} className="flex items-center mb-3 last:mb-0">
          {/* Product Image */}
          <div className="w-20 h-20 mr-4">
            <img 
              src={
                product.product_images.length > 0 
                  ? product.product_images[0].image_url 
                  : '/placeholder-image.png'
              } 
              alt={product.name}
              className="w-full h-full object-cover rounded"
            />
          </div>
          
          {/* Product Details */}
          <div className="flex-grow">
            <Text strong>{product.name}</Text>
            <div className="flex justify-between">
              <Text type="secondary">
                {product.rent ? 'ให้เช่า' : 'ขาย'} | 
                จำนวน: {order.order_lists.find(ol => ol.product_id === product.product_id)?.quantity || 0} ชิ้น
              </Text>
              <Text strong>
                {product.price.toLocaleString('th-TH', { style: 'currency', currency: 'THB' })}
              </Text>
            </div>
          </div>
        </div>
      ))}

      <Divider />

      {/* Order Summary */}
      <div className="flex justify-between">
        <Text>จำนวนสินค้าทั้งหมด</Text>
        <Text strong>{totalItems} ชิ้น</Text>
      </div>
      <div className="flex justify-between">
        <Text>ยอดรวม</Text>
        <Title level={5} className="m-0">
          {order.amount.toLocaleString('th-TH', { style: 'currency', currency: 'THB' })}
        </Title>
      </div>
    </Card>
  );
};

export default OrderCard;