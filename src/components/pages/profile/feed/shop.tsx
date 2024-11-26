import { apiClient } from "@/api";
import { message } from "antd";
import React, { useEffect } from "react";
import ProductHeader from "../../marketplace/product/product-header";
import SearchResult from "../../marketplace/search-result";
import { set } from "date-fns";

const FeedShop = ({ sellerId }: { sellerId?: string }) => {
  const [sellerData, setSellerData] = React.useState<any>(null);
  const [products, setProducts] = React.useState<any[]>([]);
  useEffect(() => {
    if (!sellerId) return; // Ensure seller_id is available

    const fetchSellerData = async () => {
      try {
        const response = await apiClient.get(`/shop/${sellerId}`);
        setSellerData(response.data.seller);
      } catch (e) {
        console.log(e);
        message.error("เกิดข้อผิดพลาดในการดึงข้อมูลร้านค้า");
      }
    };
    fetchSellerData();
  }, []); // Re-run when `productData.seller_id` changes

  useEffect(() => {
    if (!sellerId) return; // Ensure seller_id is available

    const fetchProductsBySeller = async () => {
      try {
        const response = await apiClient.get(`/product/seller/${sellerId}`);
        setProducts(response.data);
      } catch (e) {
        console.log(e);
        message.error("เกิดข้อผิดพลาดในการดึงข้อมูลสินค้า");
      }
    }
    fetchProductsBySeller();
  }, []);

  return (
    <div className="mt-4 px-4 xl:px-0">
      <ProductHeader seller={sellerData} showButton={false} />
      <div className="bg-neutral-50 pt-4 rounded-lg border border-primary-100">
        <SearchResult products={products} showMenu={false} />
      </div>
    </div>
  );
};

export default FeedShop;
