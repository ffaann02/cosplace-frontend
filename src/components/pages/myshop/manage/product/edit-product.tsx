import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  InputNumber,
  Checkbox,
  DatePicker,
  Button,
  Select,
  Row,
  Col,
  Popconfirm,
  message,
  Upload,
  UploadFile,
  Image,
  GetProp,
  UploadProps,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { PlusOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { apiClientWithAuth } from "@/api";
import {
  categories_th,
  sizes,
  conditions,
  locations,
} from "@/components/pages/marketplace/filter-bar-options";
import { default as NextImage } from "next/image";
import moment from "moment";
import { useSearchParams } from "next/navigation";
// import { ProductImage } from "./products";
import { useAuth } from "@/context/auth-context";
import { ProductImage } from "@/types/product";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const { Option } = Select;

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("อัปโหลดเฉพาะไฟล์ JPG/PNG เท่านั้น");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("รูปภาพต้องมีขนาดไม่เกิน 2MB");
  }
  return isJpgOrPng && isLt2M;
};

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const EditProduct = () => {
  const [form] = useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [isRentChecked, setIsRentChecked] = useState(false);
  const [creating, setCreating] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const action = searchParams.get("action");
  const product_id = searchParams.get("product_id");
  const { user } = useAuth();

  useEffect(() => {
    if (product_id) {
      // Fetch product data when product_id is available
      fetchProductData(product_id as string);
    }
  }, [product_id]);

  const fetchProductData = async (id: string) => {
    try {
      const response = await apiClientWithAuth.get(`/product/${id}`);
      const productData = response.data;
      console.log("Product data:", productData);

      // Set form fields with the fetched data
      form.setFieldsValue({
        name: productData.name,
        price: productData.price,
        quantity: productData.quantity,
        rent: productData.rent,
        deposit: productData.deposit,
        rent_return_date: productData.rent_return_date
          ? moment(productData.rent_return_date)
          : null,
        description: productData.description,
        category: productData.category,
        condition: productData.condition,
        size: productData.size,
        region: productData.region,
      });

      // Set the rent checkbox state based on fetched data
      setIsRentChecked(productData.rent);

      const images = productData.product_images;

      const formattedFileList = images.map((image: ProductImage) => ({
        uid: image.product_image_id.toString(), // Ensure unique uid for each image
        name: image.image_url, // Store the image URL
        url: image.image_url, // Image URL for preview
        preview: image.image_url, // Ensure preview is set to URL (or base64 if necessary)
      }));

      setFileList(formattedFileList);
    } catch (error) {
      message.error("เกิดข้อผิดพลาดในการโหลดข้อมูลสินค้า");
    }
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const handleRemoveImage = (file: UploadFile) => {
    console.log(file);
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>อัปโหลด</div>
    </button>
  );

  const onFinish = (values: any) => {
    console.log("Form values:", values);
    onConfirmUpdate(values);
  };

  const onConfirmUpdate = async (values: any) => {
    const updatedProductData = { ...values };
    updatedProductData.rent_return_date =
      updatedProductData.rent_return_date?.format();
    updatedProductData.updated_by = user?.seller_id;

    try {
      setCreating(true);
      await apiClientWithAuth.put(
        `/product/id/${product_id}`,
        updatedProductData
      );

      // // Upload images
      // await Promise.all(
      //   fileList.map(async (file) => {
      //     try {
      //       const image = await getBase64(file.originFileObj as FileType);
      //       const imageData = {
      //         product_id: product_id,
      //         image_url: image,
      //       };
      //       const imageResponse = await apiClientWithAuth.post(
      //         "/upload/product-image",
      //         imageData
      //       );
      //       console.log(imageResponse);
      //     } catch (err) {
      //       console.error("Error uploading image:", err);
      //       message.error("เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ");
      //     }
      //   })
      // );

      setCreating(false);
      message.success("แก้ไขสินค้าเรียบร้อยแล้ว");
      router.push("/myshop?menu=products");
    } catch (err) {
      console.error(err);
      message.error("เกิดข้อผิดพลาดในการแก้ไขสินค้า");
      setCreating(false);
    }
  };

  const handleFormValuesChange = (changedValues: any) => {
    if ("rent" in changedValues) {
      setIsRentChecked(changedValues.rent);
    }
  };

  return (
    <Form
      disabled={creating}
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onValuesChange={handleFormValuesChange}
      style={{ position: "relative" }}
    >
      {creating && (
        <div className="absolute z-[50] w-full h-full bg-primary-200/50 flex flex-col justify-center items-center rounded-xl">
          <NextImage
            priority
            unoptimized={true}
            src={"/images/mascot.gif"}
            alt="hero-mascot"
            width={300}
            height={300}
            className="z-50 animate-wiggle opacity-80 -mt-24"
          />
          <h2 className="text-primary-700 text-center mt-4">
            กำลังอัปโหลดข้อมูลสินค้า
            <span className="loading-dot" />
          </h2>
        </div>
      )}
      <div className="bg-white rounded-xl drop-shadow-sm px-5 py-3 mt-4">
        <Form.Item
          label="ชื่อสินค้า"
          name="name"
          rules={[{ required: true, message: "โปรดระบุชื่อสินค้า" }]}
        >
          <Input />
        </Form.Item>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="ราคา"
              name="price"
              rules={[{ required: true, message: "โปรดระบุราคา" }]}
            >
              <InputNumber min={0} step={0.01} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="จำนวน"
              name="quantity"
              rules={[{ required: true, message: "โปรดระบุจำนวน" }]}
            >
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={3}>
            <Form.Item label="บริการเช่า" name="rent" valuePropName="checked">
              <Checkbox>ให้เช่า</Checkbox>
            </Form.Item>
          </Col>
          <Col span={9}>
            <Form.Item
              label="ค่ามัดจำ (บาท)"
              name="deposit"
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!isRentChecked || value !== undefined) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("โปรดระบุค่ามัดจำหากให้เช่า")
                    );
                  },
                }),
              ]}
            >
              <InputNumber
                style={{ width: "100%" }}
                disabled={!isRentChecked}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="วันที่คืนเช่า"
              name="rent_return_date"
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!isRentChecked || value !== undefined) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("โปรดระบุวันที่คืนเช่าหากให้เช่า")
                    );
                  },
                }),
              ]}
            >
              <DatePicker
                showTime
                style={{ width: "100%" }}
                disabled={!isRentChecked}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          label="คำอธิบาย"
          name="description"
          rules={[{ required: true, message: "โปรดระบุคำอธิบาย" }]}
        >
          <Input.TextArea maxLength={300} />
        </Form.Item>
      </div>
      <div className="bg-white rounded-xl drop-shadow-sm px-5 py-3 mt-4">
        <h5 className="mb-2">รูปภาพสินค้า</h5>
        <>
          <Upload
            beforeUpload={beforeUpload}
            // action={()=>{}}
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            onRemove={handleRemoveImage}
          >
            {fileList.length >= 5 ? null : uploadButton}
          </Upload>
          {previewImage && (
            <Image
              wrapperStyle={{ display: "none" }}
              preview={{
                visible: previewOpen,
                onVisibleChange: (visible) => setPreviewOpen(visible),
                afterOpenChange: (visible) => !visible && setPreviewImage(""),
              }}
              src={previewImage}
            />
          )}
        </>
      </div>
      <div className="bg-white rounded-xl drop-shadow-sm px-5 pt-3 pb-1 mt-4">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="หมวดหมู่"
              name="category"
              rules={[{ required: true, message: "โปรดเลือกหมวดหมู่" }]}
            >
              <Select placeholder="เลือกหมวดหมู่">
                {categories_th.map((category) => (
                  <Option key={category} value={category}>
                    {category}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="สภาพ"
              name="condition"
              rules={[{ required: true, message: "โปรดเลือกสภาพสินค้า" }]}
            >
              <Select placeholder="เลือกสภาพสินค้า">
                {conditions.map((condition) => (
                  <Option key={condition} value={condition}>
                    {condition}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="ขนาด"
              name="size"
              rules={[{ required: true, message: "โปรดเลือกขนาด" }]}
            >
              <Select placeholder="เลือกขนาด">
                {sizes.map((size) => (
                  <Option key={size} value={size}>
                    {size}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="ภูมิภาค"
              name="region"
              rules={[{ required: true, message: "โปรดเลือกภูมิภาค" }]}
            >
              <Select placeholder="เลือกภูมิภาค">
                {locations.map((location) => (
                  <Option key={location} value={location}>
                    {location}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button type="default" size="large" loading={creating}>
            ยกเลิก
          </Button>
          <Popconfirm
            title="ยืนยันการแก้ไขข้อมูลสินค้า?"
            onConfirm={() => form.submit()}
            okText="ยืนยัน"
            okButtonProps={{ htmlType: "submit" }}
            cancelText="ยกเลิก"
          >
            <Button
              loading={creating}
              type="primary"
              size="large"
              //   htmlType="submit"
              style={{ marginLeft: 8 }}
            >
              แก้ไขสินค้า
            </Button>
          </Popconfirm>
        </Form.Item>
      </div>
    </Form>
  );
};

export default EditProduct;
