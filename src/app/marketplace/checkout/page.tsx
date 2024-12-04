"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  Radio,
  Button,
  Space,
  Input,
  Collapse,
  message,
  Image,
} from "antd";
import { CreditCardOutlined, QrcodeOutlined } from "@ant-design/icons";
import axios from "axios"; // Make sure axios is installed
import { apiClientWithAuth } from "@/api";
import { set } from "date-fns";
import { Product } from "@/types/product";
import useCart from "@/hooks/use-cart";

const { Panel } = Collapse;

const Checkout = () => {
  const { itemCount, updateCart,removeSellerFromCart } = useCart(); // Use the useCart hook
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [shippingAddress, setShippingAddress] = useState<string>("");

  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [sellerId, setSellerId] = useState<string>("");

  const fetchProducts = async () => {
    const queryParams = new URLSearchParams(window.location.search);
    const list = queryParams.get("list");
    const quantity = queryParams.get("quantity");

    if (list && quantity) {
      try {
        const response = await apiClientWithAuth.get("/checkout", {
          params: {
            list: list,
            quantity: quantity,
          },
        });

        console.log(response);

        // Assuming the response contains a product list in the form:
        // [{ id: 1, name: "สินค้า 1", price: 100, quantity: 1 }, ...]
        setSelectedProducts(response.data.products);
        console.log(response.data.products);
        setTotalAmount(response.data.totalAmount);
        setSellerId(response.data.products[0].seller_id);
      } catch (error) {
        console.error("Error fetching products:", error);
        message.error("เกิดข้อผิดพลาดในการดึงข้อมูลสินค้า");
      }
    }
  };

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmitPayment = () => {
    if (paymentMethod === "creditcard") {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        message.success("การชำระเงินด้วยบัตรเครดิตสำเร็จ!");
        // Remove the seller's products from the cart after successful payment
        console.log(sellerId);
        removeSellerFromCart(sellerId);  // Pass the seller ID
      }, 3000);
    } else if (paymentMethod === "promptpay") {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        message.success("การชำระเงินด้วยพร้อมเพย์สำเร็จ!");
        console.log(sellerId);
        // Remove the seller's products from the cart after successful payment
        removeSellerFromCart(sellerId);  // Pass the seller ID
      }, 3000);
    }

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
            <div key={product.product_id} className="flex justify-between mb-2">
              <div className="flex">
                <Image src={product?.product_images?.[0]?.image_url || ''} width={40} height={40} />
                <span className="my-auto ml-2">
                  {product.name} (x{product.quantity})
                </span>
              </div>
              <span className="my-auto">
                ฿{(Number(product.price) * Number(product.quantity)).toFixed(2)}
              </span>
            </div>
          ))}
          <div className="font-bold flex justify-between text-lg">
            <span>รวม</span>
            <span className="flex">
              <p className="mr-2">฿</p>
              <p>{totalAmount}</p>
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

          <Collapse activeKey={paymentMethod} style={{ marginTop: 12 }}>
            <Panel header="พร้อมเพย์ QR Code" key="promptpay">
              <p>สแกน QR Code เพื่อชำระเงิน</p>
              <div className="mx-auto w-full flex justify-center mt-4">
                <Image
                  src={
                    "https://www.blognone.com/sites/default/files/externals/255750d05125fccbe1d06e2b2ac1fa23.jpg"
                  }
                  alt="PromptPay QR Code"
                  width={200}
                  height={240}
                  preview={false}
                />
              </div>
            </Panel>
            <Panel header="บัตรเครดิต" key="creditcard">
              <div className="mt-4 w-full space-y-2">
                <Input placeholder="หมายเลขบัตร" className="mb-2" />
                <Input placeholder="ชื่อผู้ถือบัตร" className="mb-2" />
                <Input.Group compact>
                  <Input placeholder="วันหมดอายุ" style={{ width: "50%" }} />
                  <Input placeholder="CVV" style={{ width: "50%" }} />
                </Input.Group>
              </div>
            </Panel>
          </Collapse>
        </Card>

        <Button
          type="primary"
          block
          size="large"
          onClick={handleSubmitPayment}
          disabled={!paymentMethod}
          loading={loading}
        >
          ยืนยันชำระเงิน
        </Button>
      </div>
    </div>
  );
};

export default Checkout;
