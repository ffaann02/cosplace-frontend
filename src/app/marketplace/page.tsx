"use client";
import { apiClient, apiClientWithAuth } from "@/api";
import FilterBar from "@/components/pages/marketplace/filter-bar";
import SearchResult from "@/components/pages/marketplace/search-result";
import { Product } from "@/types/product";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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
    <div className="mt-8 lg:mt-12 flex-grow min-h-screen flex">
      <div className="w-full lg:max-w-[80rem] 2xl:max-w-[86rem] section-container grid grid-cols-10 gap-x-2 pl-0 lg:pl-4 flex-grow relative">
        <FilterBar />
        <SearchResult products={products} />
      </div>
    </div>
  );
};
export default Marketplace;
