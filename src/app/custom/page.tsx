"use client";
import { Flex, Form, Input, InputNumber, Select, Space } from "antd";
import TextArea from "antd/es/input/TextArea";

const { Option } = Select;

const CustomPost = () => {
  return (
    <div className="max-w-7xl mx-auto w-full h-full mt-12 grid grid-cols-5 gap-x-6">
      <div className="divide-y col-span-4 bg-neutral-50 rounded-xl pt-4">
        <h3 className="text-center mb-3 text-primary-800 font-light">
          เขียนโพสต์จ้างร้านค้า และบริการ
        </h3>
        <div className="px-4 py-2 flex flex-col">
          <Form layout="vertical" style={{marginTop: 12}}>
            {/* Title Field */}
            <Form.Item
              label="งานที่ต้องการหาจ้าง"
              style={{ width: "100%", position: "relative" }}
            >
              <Input
                showCount
                maxLength={50}
                placeholder="ชื่อ"
                value={"test"}
                size="large"
                disabled
              />
            </Form.Item>

            {/* Description Field */}
            <Form.Item
              label="รายละเอียดของงาน"
              style={{ width: "100%", position: "relative" }}
            >
              <TextArea
                minLength={20}
                showCount
                maxLength={200}
                placeholder="รายละเอียด"
                value={"test"}
                size="large"
                // disabled
              />
            </Form.Item>

            <Flex gap={8}>
              {/* Price Range Start Field */}
              <Form.Item
                label="ช่วงราคาเริ่มต้น"
                style={{ width: "100%", position: "relative" }}
              >
                <InputNumber
                  min={0}
                  max={100000}
                  placeholder="ราคาขั้นต่ำ"
                  style={{ width: "100%" }}
                  size="large"
                />
              </Form.Item>

              {/* Price Range End Field */}
              <Form.Item
                label="ช่วงราคาสิ้นสุด"
                style={{ width: "100%", position: "relative" }}
              >
                <InputNumber
                  min={0}
                  max={100000}
                  placeholder="ราคาสูงสุด"
                  style={{ width: "100%" }}
                  size="large"
                />
              </Form.Item>
            </Flex>
            <Form.Item
              label="ชื่ออนิเมะ"
              style={{ width: "100%", position: "relative" }}
            >
              <Input
                showCount
                maxLength={100}
                placeholder="ชื่ออนิเมะ"
                size="large"
              />
            </Form.Item>

            {/* Tag Field */}
            <Form.Item
              label="แท็ก"
              style={{ width: "100%", position: "relative" }}
            >
              <Input
                showCount
                maxLength={100}
                placeholder="แท็ก"
                size="large"
              />
            </Form.Item>
          </Form>
        </div>
      </div>
      <div className=" col-span-1">
        <h4 className="text-primary-800 font-light">ร้านรับจ้างแนะนำ</h4>
      </div>
    </div>
  );
};

export default CustomPost;
