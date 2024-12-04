import React, { useState } from "react";
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
  GetProp,
  UploadProps,
  UploadFile,
  Upload,
  Image,
  Popconfirm,
  message,
} from "antd";
import { useForm } from "antd/es/form/Form";
import {
  categories_th,
  sizes,
  conditions,
  locations,
} from "@/components/pages/marketplace/filter-bar-options";
import { PlusOutlined } from "@ant-design/icons";
import { apiClientWithAuth } from "@/api";
import { useRouter } from "next/navigation";

import { default as NextImage } from "next/image";
import { auth } from "@/libs/auth";
import { useAuth } from "@/context/auth-context";

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

const AddProduct = () => {
  const {user} = useAuth();
  const [form] = useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [isRentChecked, setIsRentChecked] = useState(false);
  const [creating, setCreating] = useState<boolean>(false);
  const router = useRouter();

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>อัปโหลด</div>
    </button>
  );

  const onFinish = (values: any) => {
    console.log("Form values:", values);
    onConfirmCreate(values);
  };

  const onConfirmCreate = async (values: any) => {
    const productData = values;
    productData.rent_return_date = productData.rent_return_date?.format();
    productData.created_by = user?.seller_id;
    console.log("Product data:", productData);
    try {
      setCreating(true);
      const response = await apiClientWithAuth.post(
        "/product/create",
        productData
      );
      // console.log(response);
      const productId = response.data.product_id;

      // Upload images
      await Promise.all(
        fileList.map(async (file) => {
          try {
            console.log(file);
            const image = await getBase64(file.originFileObj as FileType);
            const imageData = {
              product_id: productId,
              image_url: image,
            };
            console.log(imageData);
            // console.log(imageData);
            await apiClientWithAuth.post(
              "/upload/product-image",
              imageData
            );
            // console.log(imageUploadResponse.data);
          } catch (err) {
            console.error("Error uploading image:", err);
            message.error("เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ");
          }
        })
      );

      setCreating(false);
      message.success("เพิ่มสินค้าเรียบร้อยแล้ว");
      router.push("/myshop?menu=products");
    } catch (err) {
      console.log(err);
      message.error("เกิดข้อผิดพลาดในการเพิ่มสินค้า");
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
            title="ยืนยันการเพิ่มสินค้า?"
            onConfirm={() => form.submit()}
            // onConfirm={() => {
            //   onFinish(form.getFieldsValue());
            // }} // Use form.submit() to trigger the form submission
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
              เพิ่มสินค้า
            </Button>
          </Popconfirm>
        </Form.Item>
      </div>
    </Form>
  );
};

export default AddProduct;
