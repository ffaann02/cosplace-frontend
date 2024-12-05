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
  CheckCircleOutlined,
} from "@ant-design/icons";
import { apiClient } from "@/api";
import { Product } from "@/types/product";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

const { Text } = Typography;

interface CartItem {
  product_id: string;
  quantity: number;
}

interface CartData {
  [sellerId: string]: {
    [productId: string]: CartItem;
  };
}

interface Seller {
  seller_id: string;
  shop_name: string;
  shop_desc: string;
  verify?: boolean;
}

interface CartComponentProps {
  onClose: () => void;
}

const CartList: React.FC<CartComponentProps> = ({ onClose }) => {
  const [cartData, setCartData] = useState<CartData>({});
  const [productData, setProductData] = useState<{ [key: string]: Product }>(
    {}
  );
  const [sellerData, setSellerData] = useState<{ [key: string]: Seller }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

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

        const sellers: { [key: string]: Seller } = {};
        sellerResponses.forEach((res) => {
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

  const updateQuantity = (
    sellerId: string,
    productId: string,
    newQuantity: number
  ) => {
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

  const removeProduct = (sellerId: string, productId: string) => {
    const updatedCart = { ...cartData };
    delete updatedCart[sellerId][productId];
    if (Object.keys(updatedCart[sellerId]).length === 0) {
      delete updatedCart[sellerId];
    }
    setCartData(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const calculateSellerTotal = (sellerId: string) => {
    return Object.values(cartData[sellerId] || {}).reduce((total, item) => {
      const product = productData[item.product_id];
      return total + (product?.price || 0) * item.quantity;
    }, 0);
  };

  const handleCheckout = (sellerId: string) => {
    console.log(sellerId);
    // Construct query params dynamically for the specific seller's products and quantity
    const productList = [];
    const quantityList = [];

    // Loop through the cart data for the specific seller
    for (const productId in cartData[sellerId]) {
      productList.push(cartData[sellerId][productId].product_id);
      quantityList.push(cartData[sellerId][productId].quantity);
    }

    // Redirect to checkout page with the query string for this specific seller
    const queryString = `list=${productList.join(
      ","
    )}&quantity=${quantityList.join(",")}`;
    router.push(`/marketplace/checkout?${queryString}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-6">
      {Object.keys(cartData).map((sellerId) => {
        const seller = sellerData[sellerId];
        return (
          <Card
            key={sellerId}
            title={
              <Space>
                <ShopOutlined />
                <Text strong>{seller?.shop_name}</Text>
                {seller?.verify && (
                  <CheckCircleOutlined className="text-blue-500" />
                )}
              </Space>
            }
          >
            {Object.keys(cartData[sellerId]).map((productId) => {
              const item = cartData[sellerId][productId];
              const product = productData[productId];
              return (
                <div
                  key={productId}
                  className="flex items-center justify-between py-3"
                >
                  <div className="flex  gap-x-2">
                    <Image
                      src={product?.product_images[0]?.image_url}
                      alt={product?.name}
                      width={50}
                      height={50}
                      unoptimized
                      className="object-cover h-[50px] w-[50px] rounded-md my-auto"
                    />
                    <div className="my-auto">
                      <Text strong>{product?.name}</Text>
                      <div>฿{product?.price.toFixed(2)}</div>
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

            <div className="mt-4 text-right">
              <strong>รวม: </strong> ฿
              {calculateSellerTotal(sellerId).toFixed(2)}
            </div>
            <div className="text-right w-full">
              <Button
                type="primary"
                className="mt-4"
                onClick={() => handleCheckout(sellerId)}
              >
                สั่งซื้อสินค้า
              </Button>
            </div>
          </Card>
        );
      })}
      <Button
        type="default"
        size="large"
        style={{ width: "100%" }}
        onClick={onClose}
      >
        ปิดแถบตะกร้า
      </Button>
      <Link href="/marketplace/cart">
        <Button
          type="primary"
          size="large"
          style={{ width: "100%",marginTop:12 }}
          //   onClick={onClose}
        >
          ไปยังหน้าตะกร้าสินค้า
        </Button>
      </Link>
    </div>
  );
};

export default CartList;
