"use client";
import { openNewTabWithParams } from "@/utils/url";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Flex,
  Form,
  GetProp,
  Image,
  Input,
  InputNumber,
  Select,
  SelectProps,
  Space,
  Tag,
  Upload,
  UploadFile,
  UploadProps,
  message,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { use, useState } from "react";
import axios from "axios";
import { apiClientWithAuth } from "@/api";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";

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
  { value: "portrait", label: "Portrait" },
  { value: "landscape", label: "Landscape" },
  { value: "anime", label: "Anime" },
  { value: "fantasy", label: "Fantasy" },
  { value: "sci-fi", label: "Sci-Fi" },
  { value: "abstract", label: "Abstract" },
  { value: "realism", label: "Realism" },
  { value: "character-design", label: "Character Design" },
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

const uploadButton = (
  <button style={{ border: 0, background: "none" }} type="button">
    <PlusOutlined />
    <div style={{ marginTop: 8 }}>อัปโหลด</div>
  </button>
);

const CreateCustomPostForm = ({
  isRedirect,
}:{
  isRedirect?: boolean;
}) => {
  const {user} = useAuth();
  const router = useRouter();
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
  const [loading, setLoading] = useState<boolean>(false);

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

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Post form data to /custom API
      const response = await apiClientWithAuth.post("/custom", {
        title,
        description,
        price_range_start: minPrice,
        price_range_end: maxPrice,
        anime_name: animeName,
        tags,
        created_by: user?.user_id,
      });
  
      const postId = response.data.post_id;
  
      // Upload images to /upload/custom API
      await (async () => {
        for (const file of fileList) {
          try {
            const image = await getBase64(file.originFileObj as FileType);
            const imageData = {
              post_id: postId,
              image_url: image,
            };
            await apiClientWithAuth.post("/upload/custom-ref-image", imageData);
          } catch (err) {
            console.error("Error uploading image:", err);
            message.error("เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ");
          }
        }
      })();
  
      message.success("โพสต์สำเร็จ!");
      setLoading(false);
  
      // Redirect logic
      if (isRedirect) {
        // Get the current query params and modify them
        const currentUrl = new URL(window.location.href);
        const searchParams = new URLSearchParams(currentUrl.search);
  
        // Change the tab to 'find' and add commission_id
        searchParams.set("tab", "find");
        searchParams.set("commission_id", postId.toString());
  
        // Redirect to the new URL
        console.log("Redirect to /marketplace/custom?" + searchParams.toString());
        router.push(`/marketplace/custom?${searchParams.toString()}`);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error submitting form:", error);
      message.error("เกิดข้อผิดพลาดในการโพสต์");
    }
  };
  

  return (
    <div className="px-4 pt-2 flex flex-col">
      <Form layout="vertical" style={{ marginTop: 2 }} onFinish={handleSubmit}>
        <div className="bg-primary-50 px-4 pt-3 pb-2 rounded-xl drop-shadow-sm">
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
          <Form.Item style={{ width: "100%", position: "relative" }}>
            <label>อัปโหลดรูปภาพประกอบ</label>
            <Upload
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
                  afterOpenChange: (visible) => !visible && setPreviewImage(""),
                }}
                src={previewImage}
              />
            )}
          </Form.Item>
        </div>
        <div className="bg-primary-50 px-4 pt-3 pb-2 rounded-xl drop-shadow-sm mt-4">
          <Flex gap={8}>
            <Form.Item
              style={{ width: "100%", position: "relative" }}
              name="minPrice"
              // rules={[{ required: true, message: "กรุณากรอกราคาต่ำสุด" }]}
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
            <Form.Item
              // rules={[{ required: true, message: "กรุณากรอกราคาสูงสุด" }]}
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
          <Form.Item
            style={{ width: "100%", position: "relative" }}
            label="ชื่ออนิเมะ ภาพยนตร์ หรือซีรีย์"
            name="animeName"
            rules={[
              {
                required: true,
                message:
                  "กรุณากรอกชื่ออนิเมะ ภาพยนตร์ หรือซีรีย์ ของตัวละครที่คอสเพลย์",
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
          <Form.Item
            // required
            style={{ width: "100%", position: "relative" }}
            label="แท็ก"
            rules={[
              {
                required: true,
                message: "กรุณาเลือกอย่างน้อยหนึ่งแท็ก",
              },
              {
                validator: (_, value) =>
                  value && value.length > 0
                    ? Promise.resolve()
                    : Promise.reject(new Error("กรุณาเลือกอย่างน้อยหนึ่งแท็ก")),
              },
            ]}
          >
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
                  <Button type="link" danger onClick={() => removeLink(index)}>
                    ลบ
                  </Button>
                </div>
              ))}
            </div>
          </Form.Item>
          <Form.Item style={{ width: "100%", position: "relative" }}>
            <Button
              loading={loading}
              disabled={
                !(
                  title &&
                  description &&
                  minPrice !== null &&
                  maxPrice !== null &&
                  tags.length > 0
                )
              }
              size="large"
              type="default"
              htmlType="submit"
              style={{ width: "100%", marginBottom: -12 }}
            >
              โพสต์
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default CreateCustomPostForm;
