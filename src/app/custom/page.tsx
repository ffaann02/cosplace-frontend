"use client";
import {
  Flex,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Upload,
  Image,
  Tag,
  Button,
  List,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { PlusOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import type { GetProp, UploadFile, UploadProps, SelectProps } from "antd";
import { openNewTabWithParams } from "@/utils/url";

const { Option } = Select;

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => {
      console.log(error);
      reject(error);
    };
  });

const options: SelectProps["options"] = [
  { value: "gold", key: "gold" },
  { value: "lime", key: "lime" },
  { value: "green", key: "green" },
  { value: "cyan", key: "cyan" },
];

const tagRender: SelectProps["tagRender"] = (props) => {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color={value}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginInlineEnd: 4, height: 24, marginBottom: 4, marginLeft: 4 }}
    >
      {label}
    </Tag>
  );
};

const CustomPost = () => {
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [links, setLinks] = useState<string[]>([]);
  const [linkInput, setLinkInput] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [animeName, setAnimeName] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const addLink = () => {
    if (linkInput) {
      setLinks([...links, linkInput]);
      setLinkInput("");
    }
  };

  const removeLink = (index: number) => {
    const newLinks = [...links];
    newLinks.splice(index, 1);
    setLinks(newLinks);
  };

  const handleSubmit = () => {
    console.log({
      title,
      description,
      minPrice,
      maxPrice,
      tags,
      links,
      fileList,
    });
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>อัปโหลด</div>
    </button>
  );

  return (
    <div className="max-w-7xl mx-auto w-full h-full mt-12 grid grid-cols-5 gap-x-6">
      <div className="divide-y col-span-4 bg-neutral-50 rounded-xl pt-4">
        <h3 className="text-center mb-3 text-primary-800 font-light">
          เขียนโพสต์จ้างร้านค้า และบริการ
        </h3>
        <div className="px-4 py-2 flex flex-col">
          <Form
            layout="vertical"
            style={{ marginTop: 12 }}
            onFinish={handleSubmit}
          >
            {/* Title Field */}
            <Form.Item
              style={{ width: "100%", position: "relative" }}
              label="ชื่องาน"
              name="title"
              rules={[{ required: true, message: "กรุณากรอกชื่องาน" }]}
            >
              <Input
                showCount
                maxLength={50}
                placeholder="ชื่อ"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                size="large"
              />
            </Form.Item>

            {/* Description Field */}
            <Form.Item
              style={{ width: "100%", position: "relative" }}
              label="รายละเอียดของงาน"
              name="description"
              rules={[{ required: true, message: "กรุณากรอกรายละเอียดของงาน" }]}
            >
              <TextArea
                minLength={20}
                showCount
                maxLength={200}
                placeholder="รายละเอียด"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                size="large"
                autoSize={{ minRows: 2 }}
              />
            </Form.Item>

            {/* Image Uploader */}
            <Form.Item style={{ width: "100%", position: "relative" }}>
              <label>อัปโหลดรูปภาพประกอบ</label>
              <Upload
                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                listType="picture-card"
                fileList={fileList.map((file, idx) => ({ ...file, key: idx }))}
                onPreview={handlePreview}
                onChange={handleChange}
              >
                {fileList.length >= 8 ? null : uploadButton}
              </Upload>
              {previewImage && (
                <Image
                  wrapperStyle={{ display: "none" }}
                  preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
                    afterOpenChange: (visible) =>
                      !visible && setPreviewImage(""),
                  }}
                  src={previewImage}
                />
              )}
            </Form.Item>

            <Flex gap={8}>
              {/* Price Range Start Field */}
              <Form.Item
                style={{ width: "100%", position: "relative" }}
                name="minPrice"
                rules={[{ required: true, message: "กรุณากรอกราคาต่ำสุด" }]}
              >
                <label>ราคาต่ำสุด</label>
                <InputNumber
                  min={0}
                  max={100000}
                  placeholder="ราคาขั้นต่ำ"
                  style={{ width: "100%" }}
                  size="large"
                  value={minPrice}
                  onChange={(value) => setMinPrice(value)}
                />
              </Form.Item>

              {/* Price Range End Field */}
              <Form.Item
                rules={[{ required: true, message: "กรุณากรอกราคาสูงสุด" }]}
                style={{ width: "100%", position: "relative" }}
                name="maxPrice"
              >
                <label>ราคาสูงสุด</label>
                <InputNumber
                  min={0}
                  max={100000}
                  placeholder="ราคาสูงสุด"
                  style={{ width: "100%" }}
                  size="large"
                  value={maxPrice}
                  onChange={(value) => setMaxPrice(value)}
                />
              </Form.Item>
            </Flex>

            {/* Anime Name Field */}
            <Form.Item
              style={{ width: "100%", position: "relative" }}
              label="ชื่ออนิเมะ ภาพยนตร์ หรือซีรีย์"
              name="animeName"
              rules={[
                {
                  required: true,
                  message: "กรุณากรอกชื่ออนิเมะ ภาพยนตร์ หรือซีรีย์ ของตัวละครที่คอสเพลย์",
                },
              ]}
            >
              <Input
                placeholder="ชื่ออนิเมะ ภาพยนตร์ หรือซีรีย์"
                style={{ width: "100%" }}
                size="large"
                value={animeName}
                onChange={(e) => setAnimeName(e.target.value)}
              />
            </Form.Item>

            {/* Tags Field */}
            <Form.Item style={{ width: "100%", position: "relative" }}>
              <label>แท็ก</label>
              <Select
                size="large"
                mode="multiple"
                tagRender={tagRender}
                value={tags}
                onChange={(value) => setTags(value)}
                style={{ width: "100%" }}
                options={options}
                placeholder="เลือกแท็ก"
              />
            </Form.Item>

            {/* Link Input */}
            <Form.Item style={{ width: "100%", position: "relative" }}>
              <label>แนบลิงก์ประกอบ</label>
              <Space direction="vertical" style={{ width: "100%" }}>
                <Space.Compact style={{ width: "100%" }}>
                  <Input
                    onPressEnter={addLink}
                    value={linkInput}
                    onChange={(e) => setLinkInput(e.target.value)}
                    placeholder="ลิงก์เพิ่มเติม"
                  />
                  <Button type="default" onClick={addLink}>
                    เพิ่มลิงก์
                  </Button>
                </Space.Compact>
              </Space>
              <div className="mt-2 ml-2">
                {links.map((link, index) => (
                  <div
                    key={link + index}
                    className="flex justify-between items-center"
                  >
                    <a
                      className="hover:underline"
                      onClick={() => openNewTabWithParams(link)}
                    >
                      {link}
                    </a>
                    <Button
                      type="link"
                      danger
                      onClick={() => removeLink(index)}
                    >
                      ลบ
                    </Button>
                  </div>
                ))}
              </div>
            </Form.Item>

            {/* Submit Button */}
            <Form.Item style={{ width: "100%", position: "relative" }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div className="col-span-1">
        <h4 className="text-primary-800 font-light">ร้านรับจ้างแนะนำ</h4>
      </div>
    </div>
  );
};

export default CustomPost;
