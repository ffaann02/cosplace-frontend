import { Breadcrumb, Button, Input } from "antd";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AddProduct from "./add-product";
import ProductListTable from "./product-list-table";

export interface Product {
  product_id: string;
  name: string;
  price: number;
  quantity: number;
  rent: boolean;
  rent_deposit: number;
  rent_return_date: string;  // Use string to represent time (ISO format) in JS/TS
  description: string;
  category: string;
  condition: string;
  size: string;
  region: string;
  created_by: string;
  created_at: string;  // Same as above for timestamp
  updated_at: string;  // Same as above for timestamp
  deleted_at?: string | null;  // Nullable, depending on whether the record is deleted or not
  product_images: ProductImage[];
}

export interface ProductImage{
  product_image_id: number;
  product_id: string;
  image_url: string;
}

const Products = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const action = searchParams.get("action");

  const handleAddProduct = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("action", "add-product");
    router.push(`?${newParams.toString()}`);
  };

  const renderContent = () => {
    switch (searchParams.get("action")) {
      case "add-product":
        return <AddProduct />;
      case "edit-product":
        return <div>Edit Product</div>;
      default:
        return <ProductListTable />;
    }
  };

  const handleBreadcrumbClick = () => {
    router.push("/myshop?menu=products");
  };

  return (
    <div className="text-primary-700">
      <h3>สินค้า</h3>
      <div className="mt-6">
        {action === "add-product" ? (
          <Breadcrumb >
            <Breadcrumb.Item onClick={handleBreadcrumbClick} className="cursor-pointer">
              สินค้า
            </Breadcrumb.Item>
            <Breadcrumb.Item>เพิ่มสินค้าใหม่</Breadcrumb.Item>
          </Breadcrumb>
        ) : (
          <div id="header" className="flex justify-between">
            <Button onClick={handleAddProduct}>เพิ่มสินค้าใหม่</Button>
            <div id="filter">
              <Input
                type="text"
                placeholder="ค้นหาสินค้า"
                className="border border-primary-200 rounded-md p-1"
              />
            </div>
          </div>
        )}
        <div id="content" className="mt-4">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Products;
