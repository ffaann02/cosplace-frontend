"use client";
import { apiClient, apiClientWithAuth } from "@/api";
import FilterBar from "@/components/pages/marketplace/filter-bar";
import SearchResult from "@/components/pages/marketplace/search-result";
import { Product } from "@/types/product";
import {
  HomeOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Button } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IoShirtOutline } from "react-icons/io5";

const Marketplace = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      const response = await apiClient.get("/product");
      console.log(response.data);
      setProducts(response.data);
    };
    getProducts();
  }, []);

  return (
    <div className="flex-grow min-h-screen flex flex-col">
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
                    title: (
                      <>
                        <ShoppingCartOutlined />
                        <span>ซื้อสินค้าคอสเพลย์</span>
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
      <div className="mt-8 lg:mt-12  w-full lg:max-w-[80rem] 2xl:max-w-[86rem] section-container grid grid-cols-10 gap-x-2 pl-0 lg:pl-4 flex-grow relative">
        <FilterBar />
        <SearchResult products={products} showMenu />
      </div>
    </div>
  );
};
export default Marketplace;
