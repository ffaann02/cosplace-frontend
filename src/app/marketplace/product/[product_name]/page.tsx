"use client";
import { useState, useEffect } from "react";
import { apiClient } from "@/api";
import React from "react";
import ProductDetails from "@/components/pages/marketplace/product/product-details";
import { Product } from "@/types/product";
// import { Product } from "@/types/product";

const ProductPage = ({ params }: { params: { product_name: string } }) => {
  const { product_name } = params;

  // State to store product data
  const [productData, setProductData] = useState<Product>({} as Product);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
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
  }, [product_name]); // Re-run when `product_name` changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="w-full max-w-5xl mx-auto mt-8 flex-grow p-4 rounded-xl flex">
      <div className="m-auto">
        <ProductDetails productData={productData} />
      </div>
    </div>
  );
};

export default ProductPage;
