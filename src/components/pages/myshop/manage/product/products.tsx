import { Breadcrumb, Button, Input, Typography } from "antd";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AddProduct from "./add-product";
import ProductListTable from "./product-list-table";
import EditProduct from "./edit-product";
import { ShoppingOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const Products = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const action = searchParams.get("action");

  const handleAddProduct = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("action", "add-product");
    router.push(`?${newParams.toString()}`);
  };

  const handleBreadcrumbClick = () => {
    router.push("/myshop?menu=products");
  };

  const renderBreadcrumb = () => {
    switch (action) {
      case "add-product":
        return (
          <Breadcrumb>
            <Breadcrumb.Item
              onClick={handleBreadcrumbClick}
              className="cursor-pointer"
            >
              สินค้า
            </Breadcrumb.Item>
            <Breadcrumb.Item>เพิ่มสินค้าใหม่</Breadcrumb.Item>
          </Breadcrumb>
        );
      case "edit-product":
        return (
          <Breadcrumb>
            <Breadcrumb.Item
              onClick={handleBreadcrumbClick}
              className="cursor-pointer"
            >
              สินค้า
            </Breadcrumb.Item>
            <Breadcrumb.Item>แก้ไขสินค้า</Breadcrumb.Item>
          </Breadcrumb>
        );
      default:
        return null;
    }
  };

  const renderContent = () => {
    switch (action) {
      case "add-product":
        return <AddProduct />;
      case "edit-product":
        return <EditProduct />;
      default:
        return <ProductListTable />;
    }
  };

  return (
    <div className="text-primary-700 p-4 lg:p-6">
      <Title level={3} className="text-primary-700 mb-4">
        <ShoppingOutlined className="mr-2" />
        สินค้าในร้าน
      </Title>
      <div className="mt-6">
        {renderBreadcrumb()}
        {action !== "add-product" && action !== "edit-product" && (
          <div id="header" className="flex justify-between">
            <Button onClick={handleAddProduct}>เพิ่มสินค้าใหม่</Button>
            <div id="filter">
              <Input
                type="text"
                placeholder="ค้นหาชื่อสินค้า"
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
