"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  Typography,
  Button,
  InputNumber,
  Space,
  Tooltip,
  Tag,
} from "antd";
import {
  ShopOutlined,
  DeleteOutlined,
  HeartOutlined,
  ShareAltOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { apiClient } from "@/api";
import Link from "next/link";
import { Product } from "@/types/product";
import { useRouter } from "next/navigation";

const { Text, Title } = Typography;

const Cart = () => {
  const router = useRouter();
  interface CartItem {
    product_id: string;
    quantity: number;
  }

  interface CartData {
    [sellerId: string]: {
      [productId: string]: CartItem;
    };
  }

  const [cartData, setCartData] = useState<CartData>({});
  const [productData, setProductData] = useState<{ [key: string]: Product }>({});
  interface Seller {
    seller_id: string;
    shop_name: string;
    shop_desc: string;
    verify?: boolean;
  }

  const [sellerData, setSellerData] = useState<{ [key: string]: Seller }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const savedCart = localStorage.getItem("cart");
        if (!savedCart) {
          setCartData({});
          setLoading(false);
          return;
        }

        const parsedCart = JSON.parse(savedCart);
        setCartData(parsedCart);

        const productPromises: Promise<any>[] = [];
        const sellerPromises: Promise<any>[] = [];

        for (const sellerId in parsedCart) {
          for (const productId in parsedCart[sellerId]) {
            productPromises.push(apiClient.get(`/product/id/${productId}`));
          }
          sellerPromises.push(apiClient.get(`/shop/${sellerId}`));
        }

        const [productResponses, sellerResponses] = await Promise.all([
          Promise.all(productPromises),
          Promise.all(sellerPromises),
        ]);

        const products: { [key: string]: Product } = {};
        productResponses.forEach((res) => {
          products[res.data.product_id] = res.data;
        });

        const sellers: { [key: string]: any } = {};
        sellerResponses.forEach((res) => {
          console.log(res.data.seller);
          sellers[res.data.seller.seller_id] = res.data.seller;
        });

        setProductData(products);
        setSellerData(sellers);
      } catch (e) {
        setError("Failed to fetch data");
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const updateQuantity = (sellerId:string, productId:string, newQuantity:number) => {
    const updatedCart = {
      ...cartData,
      [sellerId]: {
        ...cartData[sellerId],
        [productId]: {
          ...cartData[sellerId][productId],
          quantity: newQuantity,
        },
      },
    };
    setCartData(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeProduct = (sellerId:string, productId:string) => {
      const updatedCart = { ...cartData };
    delete updatedCart[sellerId][productId];
    if (Object.keys(updatedCart[sellerId]).length === 0) {
      delete updatedCart[sellerId];
    }
    setCartData(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const calculateSellerTotal = (sellerId:string) => {
    return Object.values(cartData[sellerId] || {}).reduce((total, item) => {
      const product = productData[item.product_id];
      return total + (product?.price || 0) * item.quantity;
    }, 0);
  };

  const handleCheckout = () => {
    // Construct query params dynamically for list and quantity
    const productList = [];
    const quantityList = [];

    // Loop through the cart data to create query strings
    for (const sellerId in cartData) {
      for (const productId in cartData[sellerId]) {
        productList.push(cartData[sellerId][productId].product_id);
        quantityList.push(cartData[sellerId][productId].quantity);
      }
    }
    // Redirect to checkout page with the query string
    const queryString = `list=${productList.join(",")}&quantity=${quantityList.join(",")}`;
    router.push(`/marketplace/checkout?${queryString}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6 w-full mt-12">
      <Title level={2} className="text-left">
        <ShopOutlined /> ตะกร้าสินค้า
      </Title>

      {!Object.keys(cartData).length && (
        <div className="w-full p-4 bg-primary-50 rounded-xl border border-primary-100 text-center">
          <h4 className="text-primary-600 text-xl mb-4">ไม่พบสินค้าในตะกร้า</h4>
          <Button type="primary" href="/marketplace">
            เลือกซื้อสินค้า
          </Button>
        </div>
      )}

      {Object.keys(cartData).map((sellerId) => {
        const seller = sellerData[sellerId];
        return (
          <Card
            key={sellerId}
            title={
              <div className="flex justify-between items-center">
                <Space>
                  <ShopOutlined />
                  <Text strong>{seller?.shop_name}</Text>
                  {seller?.verify && (
                    <Tooltip title="Verified Shop">
                      <CheckCircleOutlined className="text-blue-500" />
                    </Tooltip>
                  )}
                </Space>
                <Text type="secondary">{seller?.shop_desc}</Text>
              </div>
            }
            className="shadow-lg"
          >
            {Object.keys(cartData[sellerId]).map((productId) => {
              const item = cartData[sellerId][productId];
              const product = productData[productId];
              return (
                <div
                  key={productId}
                  className="flex items-center justify-between py-3 border-b last:border-b-0"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={
                        product?.product_images[0]?.image_url ||
                        "/placeholder.png"
                      }
                      alt={product?.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <Text strong>{product?.name}</Text>
                      <div className="text-gray-500">
                        ฿{product?.price.toFixed(2)}{" "}
                        <Tag color={product?.rent ? "blue" : "green"}>
                          {product?.rent ? "Rent" : "Sale"}
                        </Tag>
                      </div>
                      <Text type="secondary">{product?.condition}</Text>
                    </div>
                  </div>
                  <Space>
                    <InputNumber
                      min={1}
                      max={product?.quantity || 1}
                      value={item.quantity}
                      onChange={(value) => {
                        if (value !== null) {
                          updateQuantity(sellerId, productId, value);
                        }
                      }}
                    />
                    <Tooltip title="Remove Product">
                      <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => removeProduct(sellerId, productId)}
                      />
                    </Tooltip>
                  </Space>
                </div>
              );
            })}

            <div className="mt-4 flex justify-between">
              <Text strong>ยอดรวมร้านค้า</Text>
              <Text strong>฿{calculateSellerTotal(sellerId).toFixed(2)}</Text>
            </div>
            <div className="text-right w-full">
              <Button type="primary" className="mt-4" onClick={handleCheckout}>
                สั่งซื้อสินค้า
              </Button>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default Cart;
