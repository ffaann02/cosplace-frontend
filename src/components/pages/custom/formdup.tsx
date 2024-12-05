"use client";
import { Button, Checkbox, Form, message, Input, Typography } from "antd";
import { useState } from "react";

const CreateCustomPostForm = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [animeName, setAnimeName] = useState<string>("");
  const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);

  const handleSubmit = () => {
    console.log({
      title,
      description,
      minPrice,
      maxPrice,
      animeName,
    });
    message.success("โพสต์สำเร็จ!");
  };

  return (
    <div className="px-4 pt-2 flex flex-col">
      <Form layout="vertical" style={{ marginTop: 12 }} onFinish={handleSubmit}>
        <Form.Item
          style={{ width: "100%" }}
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
          style={{ width: "100%" }}
          label="รายละเอียดของงาน"
          name="description"
          rules={[{ required: true, message: "กรุณากรอกรายละเอียดของงาน" }]}
        >
          <Input.TextArea
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
        <div style={{ display: "flex", gap: "8px" }}>
          <Form.Item
            style={{ flex: 1 }}
            name="minPrice"
            rules={[{ required: true, message: "กรุณากรอกราคาต่ำสุด" }]}
          >
            <label>ราคาต่ำสุด</label>
            <Input
              type="number"
              min={0}
              max={100000}
              placeholder="ราคาขั้นต่ำ"
              size="large"
              onChange={(e) => setMinPrice(Number(e.target.value))}
            />
          </Form.Item>
          <Form.Item
            style={{ flex: 1 }}
            name="maxPrice"
            rules={[{ required: true, message: "กรุณากรอกราคาสูงสุด" }]}
          >
            <label>ราคาสูงสุด</label>
            <Input
              type="number"
              min={0}
              max={100000}
              placeholder="ราคาสูงสุด"
              size="large"
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
          </Form.Item>
        </div>
        <Form.Item
          style={{ width: "100%" }}
          label="ชื่ออนิเมะ ภาพยนตร์ หรือซีรีย์"
          name="animeName"
          rules={[{ required: true, message: "กรุณากรอกชื่ออนิเมะ ภาพยนตร์ หรือซีรีย์" }]}
        >
          <Input
            placeholder="ชื่ออนิเมะ ภาพยนตร์ หรือซีรีย์"
            size="large"
            value={animeName}
            onChange={(e) => setAnimeName(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          style={{ width: "100%" }}
        >
          <Checkbox
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
          >
            ยอมรับข้อกำหนดและเงื่อนไข
          </Checkbox>
        </Form.Item>
        <Form.Item
          style={{ width: "100%" }}
        >
          <Button
            disabled={
              !(
                title &&
                description &&
                minPrice !== null &&
                maxPrice !== null &&
                animeName &&
                acceptedTerms
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
      </Form>
    </div>
  );
};

export default CreateCustomPostForm;
