"use client";
import { useState, useEffect, use } from "react";
import { apiClient } from "@/api";
import React from "react";
import ProductDetails from "@/components/pages/marketplace/product/product-details";
import { Product } from "@/types/product";
import ProductHeader from "@/components/pages/marketplace/product/product-header";
import { Seller } from "@/types/seller";
import Link from "next/link";
import { Breadcrumb, Button } from "antd";
import { HomeOutlined, ShopOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

const ProductPage = ({ params }: { params: { product_name: string } }) => {
  const router = useRouter();
  const { product_name } = params;

  // State to store product data
  const [productData, setProductData] = useState<Product>({} as Product);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sellerData, setSellerData] = useState<Seller>({} as Seller); // Optional: Store seller data if needed

  // Fetch product data
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        const decodedProductName = decodeURIComponent(product_name);
        const response = await apiClient.get(
          `/product/name/${decodedProductName}`
        );
        console.log(response.data);
        setProductData(response.data); // Set product data in state
      } catch (e) {
        console.log(e);
        setError("Failed to fetch product data");
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [product_name]);

  // Fetch seller data after product data is available
  useEffect(() => {
    if (!productData.seller_id) return; // Ensure seller_id is available

    const fetchSellerData = async () => {
      try {
        const response = await apiClient.get(`/shop/${productData.seller_id}`);
        console.log(response.data);
        setSellerData(response.data.seller); // Optional: Store seller data if needed
      } catch (e) {
        console.log(e);
        setError("Failed to fetch seller data");
      }
    };

    fetchSellerData();
  }, [productData.seller_id]); // Re-run when `productData.seller_id` changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex-grow flex flex-col">
      <div className="bg-gradient-to-t from-primary-100 to-primary-200 w-full px-4 pt-6 pb-3">
        <div className="w-full lg:max-w-[80rem] 2xl:max-w-[86rem] mx-auto px-4 justify-between flex">
          <div className="text-primary-700 my-auto">
            <div className="flex">
              <ShoppingCartOutlined className="text-3xl mr-3" />
              <h3 className="text-3xl text-primary-800">สินค้าคอสเพลย์</h3>
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
                    href: "/marketplace",
                    // onClick: () => router.push("/marketplace"),
                    title: (
                      <>
                        <ShoppingCartOutlined />
                        <span>ซื้อสินค้าคอสเพลย์</span>
                      </>
                    ),
                  },
                  {
                    title: (
                      <>
                        {/* <ShoppingCartOutlined /> */}
                        <span>ชื่อสินค้า: {decodeURIComponent(product_name)}</span>
                      </>
                    ),
                  },
                ]}
              />
            </div>
          </div>
          <div className="flex flex-col text-right justify-end my-auto">
            <span className="text-primary-700">สินค้าไม่ตรงใจ ?</span>
            <Link href="/marketplace/custom">
              <Button className="ml-2" size="small" type="default">
                จ้างร้าน
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-8 max-w-5xl w-full px-4 xl:px-0">
        <ProductHeader seller={sellerData} />
        <ProductDetails productData={productData} />
      </div>
    </div>
  );
};

export default ProductPage;
