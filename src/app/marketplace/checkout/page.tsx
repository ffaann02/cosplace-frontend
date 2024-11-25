"use client";
import React, { useState } from "react";
import { Card, Radio, Button, Space, Input } from "antd";
import { CreditCardOutlined, QrcodeOutlined } from "@ant-design/icons";

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [selectedProducts] = useState([
    { id: 1, name: "สินค้า 1", price: 100, quantity: 2 },
    { id: 2, name: "สินค้า 2", price: 200, quantity: 1 },
  ]);

  const handleSubmitPayment = () => {
    console.log("การชำระเงินถูกส่ง", {
      method: paymentMethod,
      products: selectedProducts,
      totalAmount: selectedProducts.reduce(
        (sum, product) => sum + product.price * product.quantity,
        0
      ),
      shippingAddress,
    });
  };

  return (
    <div>
      <div className="w-full bg-primary-100 py-4">
        <div className="w-full max-w-2xl mx-auto px-4">
          <h1 className="text-2xl font-bold text-primary-400">ชำระเงิน</h1>
        </div>
      </div>
      <div className="max-w-2xl w-full mx-auto p-4 pt-0 space-y-4 mt-6">
        <Card
          style={{ width: "100%" }}
          title="ที่อยู่ในการจัดส่ง"
          className="mb-4"
        >
          <Input.TextArea
            rows={4}
            placeholder="กรอกที่อยู่ในการจัดส่ง"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
          />
        </Card>
        <Card style={{ width: "100%" }} title="การชำระเงิน" className="mb-4">
          <h3>สินค้าที่เลือก</h3>
          {selectedProducts.map((product) => (
            <div key={product.id} className="flex justify-between mb-2">
              <span>
                {product.name} (x{product.quantity})
              </span>
              <span>฿{product.price * product.quantity}</span>
            </div>
          ))}
          <div className="font-bold flex justify-between">
            <span>รวม</span>
            <span>
              ฿
              {selectedProducts.reduce(
                (sum, product) => sum + product.price * product.quantity,
                0
              )}
            </span>
          </div>
        </Card>

        <Card
          style={{ width: "100%" }}
          title="วิธีการชำระเงิน"
          className="mb-4"
        >
          <Radio.Group
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full"
          >
            <Space direction="vertical" className="w-full">
              <Radio value="promptpay" className="w-full">
                <Space>
                  <QrcodeOutlined />
                  พร้อมเพย์ QR Code
                </Space>
              </Radio>
              <Radio value="creditcard" className="w-full">
                <Space>
                  <CreditCardOutlined />
                  บัตรเครดิต
                </Space>
              </Radio>
            </Space>
          </Radio.Group>

          {paymentMethod === "creditcard" && (
            <div className="mt-4 w-full space-y-2">
              <Input placeholder="หมายเลขบัตร" className="mb-2" />
              <Input placeholder="ชื่อผู้ถือบัตร" className="mb-2" />
              <Input.Group compact>
                <Input placeholder="วันหมดอายุ" style={{ width: "50%" }} />
                <Input placeholder="CVV" style={{ width: "50%" }} />
              </Input.Group>
            </div>
          )}
        </Card>

        <Button
          type="primary"
          block
          size="large"
          onClick={handleSubmitPayment}
          disabled={!paymentMethod}
        >
          ยืนยันชำระเงิน
        </Button>
      </div>
    </div>
  );
};

export default Checkout;
