import React, { useEffect, useState } from "react";
import {
  Table,
  Typography,
  Button,
  Space,
  message,
  Popconfirm,
  Input,
  Form,
} from "antd";
import { apiClientWithAuth } from "@/api";
import { useAuth } from "@/context/auth-context";
import { TableProps } from "antd/es/table";
import ExpandProductCard from "./expand-product-card";
import { Product, ProductImage } from "./products";
import { useForm } from "antd/es/form/Form";
import { useRouter } from "next/navigation";

const { Title } = Typography;

const ProductListTable = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);
  const [deleteConfirmForm] = useForm();
  const router = useRouter();

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const seller_id = user?.seller_id; // Replace with `user?.id` if dynamic
        const response = await apiClientWithAuth.get(
          `/product?seller_id=${seller_id}`
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Toggle row expansion when clicking "ดูข้อมูล"
  const toggleRowExpansion = (product_id: string) => {
    setExpandedRowKeys((prev) =>
      prev.includes(product_id)
        ? prev.filter((id) => id !== product_id)
        : [...prev, product_id]
    );
  };

  const openEditProduct = (product_id: string) => {
    router.push(
      `/myshop?menu=products&action=edit-product&product_id=${product_id}`
    );
  };

  const handleDeleteProduct = async (product_id: string) => {
    if (deleteConfirmForm.getFieldValue("confirm") !== "ลบ") {
      message.warning("กรุณาพิมพ์ 'ลบ' เพื่อยืนยันการลบสินค้า");
      deleteConfirmForm.resetFields();
      return;
    }
    message.success("ลบสินค้าเรียบร้อยแล้ว");
    try {
      await apiClientWithAuth.delete(`/product/${product_id}`);
      setProducts((prev) => prev.filter((p) => p.product_id !== product_id));
      deleteConfirmForm.resetFields();
    } catch (error) {
      console.error("Error deleting product:", error);
      deleteConfirmForm.resetFields();
    }
  };

  // Define columns for the Ant Design Table
  const columns: TableProps<Product>["columns"] = [
    {
      title: "ลำดับ", // Thai for "No."
      key: "index",
      align: "left",
      render: (_: any, __: Product, index: number) => index + 1,
    },
    {
      title: "รูปภาพ", // Thai for "Image"
      dataIndex: "product_images",
      key: "product_images",
      render: (images: ProductImage[]) =>
        images.length > 0 ? (
          <img
            src={images[0].image_url}
            alt="Product"
            style={{ width: "50px", height: "50px", objectFit: "cover" }}
          />
        ) : (
          "ไม่มีรูปภาพ" // Thai for "No Image"
        ),
    },
    {
      title: "ชื่อสินค้า", // Thai for "Product Name"
      align: "left",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "หมวดหมู่", // Thai for "Category"
      align: "center",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "ให้เช่า", // Thai for "Rent"
      align: "center",
      dataIndex: "rent",
      key: "rent",
      render: (rent: boolean) => (rent ? "ใช่" : "ไม่ใช่"), // Thai for "Yes" or "No"
    },
    {
      title: "ราคา (บาท)", // Thai for "Price (Baht)"
      align: "center",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `${price.toLocaleString()}`,
    },
    {
      title: "จัดการ", // Thai for "Manage"
      align: "center",
      key: "actions",
      render: (_: any, product: Product) => (
        <Space>
          <Button
            type="link"
            onClick={() => toggleRowExpansion(product.product_id)}
          >
            {expandedRowKeys.includes(product.product_id) ? "ซ่อน" : "ดูข้อมูล"}
          </Button>
          <Button
            type="link"
            onClick={() => openEditProduct(product.product_id)}
          >
            แก้ไข
          </Button>
          <Popconfirm
            placement="topRight"
            title={
              <Form form={deleteConfirmForm}>
                <Form.Item name="confirm">
                  <Input
                    placeholder="พิมพ์ 'ลบ' เพื่อยืนยัน"
                    style={{ width: "150px" }}
                  ></Input>
                </Form.Item>
              </Form>
            }
            onConfirm={() => handleDeleteProduct(product.product_id)}
            okText="ยืนยัน"
            cancelText="ยกเลิก"
          >
            <Button
              type="link"
              // onClick={() => handleDeleteProduct(product.product_id)}
              danger
            >
              ลบ
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // Expanded row content (simple card with "Hello")
  const expandedRowRender = (product: Product) => (
    <ExpandProductCard product={product} />
  );

  return (
    <div>
      <Title level={4}>รายการสินค้า</Title> {/* Thai for "Product List" */}
      <Table
        columns={columns}
        dataSource={products}
        loading={loading}
        rowKey="product_id"
        pagination={{ pageSize: 5 }}
        expandedRowKeys={expandedRowKeys} // Control expanded rows
        onExpand={(expanded, record) => toggleRowExpansion(record.product_id)}
        expandedRowRender={expandedRowRender} // Display card with "Hello"
        expandRowByClick={false}
        expandIcon={() => null} // Hide default expand icon
      />
    </div>
  );
};

export default ProductListTable;
