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
  // Image,
  Breadcrumb,
} from "antd";
import { CreditCardOutlined, HomeOutlined, QrcodeOutlined, ShopOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import axios from "axios"; // Make sure axios is installed
import { apiClientWithAuth } from "@/api";
import { set } from "date-fns";
import { CheckoutProduct, Product } from "@/types/product";
import useCart from "@/hooks/use-cart";
import { useAuth } from "@/context/auth-context";
import Link from "next/link";
import { IoCardOutline } from "react-icons/io5";
import Image from "next/image";
import { useRouter } from "next/navigation";

const { Panel } = Collapse;

const Checkout = () => {
  const { itemCount, updateCart, removeSellerFromCart } = useCart(); // Use the useCart hook
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const { user } = useAuth();
  const [shippingAddress, setShippingAddress] = useState<string>("");

  const [selectedProducts, setSelectedProducts] = useState<CheckoutProduct[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [sellerId, setSellerId] = useState<string>("");
  const router = useRouter();

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

  const handleSubmitPayment = async () => {
    const queryParams = new URLSearchParams(window.location.search);
    const list = queryParams.get("list"); // e.g., "P-11,P-7"
    const quantity = queryParams.get("quantity"); // e.g., "2,1"

    const productIds = list ? list.split(",") : []; // ["P-11", "P-7"]
    const quantities = quantity ? quantity.split(",").map(Number) : []; // [2, 1]

    const products = productIds.map((productId, index) => ({
      product_id: productId,
      quantity: quantities[index] || 0, // Use 0 if quantity is missing
    }));

    const sellerId = selectedProducts[0].seller_id;
    console.log("Seller ID:", sellerId);

    setLoading(true);
    try {
      const response = await apiClientWithAuth.post("/checkout", {
        user_id: user?.user_id,
        seller_id: sellerId,
        products,
      });

      if (response.status === 200) {
        message.success("การชำระเงินสำเร็จ!");
        console.log(response.data);
        const orderId = response.data.order_id;
        // Remove the seller's products from the cart after successful payment
        removeSellerFromCart(sellerId); // Pass the seller ID
        router.push(`/marketplace/purchase`);
      } else {
        message.error("เกิดข้อผิดพลาดในการชำระเงิน");
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      message.error("เกิดข้อผิดพลาดในการชำระเงิน");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="bg-gradient-to-t from-primary-100 to-primary-200 w-full px-4 pt-6 pb-3">
        <div className="w-full lg:max-w-5xl 2xl:max-w-5xl mx-auto px-4 justify-between flex relative h-full flex-grow">
          <div className="text-primary-700 my-auto">
            <div className="flex">
              <ShoppingCartOutlined className="text-3xl mr-3" />
              <h3 className="text-3xl text-primary-800">ชำระเงิน</h3>
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
                    href: "/marketplace/cart",
                    title: (
                      <>
                        <ShoppingCartOutlined />
                        <span>ตะกร้า</span>
                      </>
                    ),
                  },
                  {
                    title: (
                      <div className="flex">
                        <IoCardOutline className="my-auto mr-1" />
                        <span>ชำระเงิน</span>
                      </div>
                    ),
                  }
                ]}
              />
            </div>
          </div>
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
                <Image
                  unoptimized
                  className="h-[40px] w-[40px] object-cover rounded-md"
                  alt="Product Image"
                  src={product?.image_url || ""}
                  width={40}
                  height={40}
                />
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
                  // preview={false}
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
