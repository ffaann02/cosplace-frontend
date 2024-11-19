import { Button, Checkbox, Form, Input, Select, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import TextArea from "antd/es/input/TextArea";
import Image from "next/image";
import React from "react";
import { FaEdit } from "react-icons/fa";

interface CreateShopStep1FormProps {
  form: any;
  currentStep: number;
  setCurrentStep: any;
  handleUploadShopImageProfile: any;
  shopImageProfileUrl: string | null;
  productTypeOptions: any;
  setHoveringProfileImage: any;
  hoveringProfileImage: boolean;
  setFormData1: any;
}

const CreateShopStep1Form = ({
  form,
  currentStep,
  setCurrentStep,
  handleUploadShopImageProfile,
  shopImageProfileUrl,
  productTypeOptions,
  setHoveringProfileImage,
  hoveringProfileImage,
  setFormData1,
}: CreateShopStep1FormProps) => {
  const validatePaymentMethods = (_: any, value: any) => {
    const { accept_credit_card, accept_qr_promptpay } = form.getFieldsValue();
    if (accept_credit_card || accept_qr_promptpay) {
      return Promise.resolve();
    }
    return Promise.reject(
      new Error("โปรดเลือกอย่างน้อยหนึ่งช่องทางชำระเงิน")
    );
  };

  const nextStep = () => {
    // form.submit();
    console.log(form.getFieldsValue());
    setCurrentStep(currentStep + 1);
    setFormData1(form.getFieldsValue());
  };

  return (
    <Form form={form} layout="vertical" onFinish={nextStep}>
      <div className="grid grid-cols-8 gap-4 w-full">
        <div className="col-span-full sm:col-span-3 bg-primary-50 rounded-xl drop-shadow-sm">
          <h3 className="text-primary-800 ml-6 mt-4">โปรไฟล์ร้านค้า</h3>
          <div className="px-6 pt-2">
            <Form.Item>
              <div className="relative w-fit mx-auto">
                <ImgCrop
                  aspect={1 / 1}
                  rotationSlider
                  modalTitle="โปรไฟล์ร้านค้า"
                >
                  <Upload
                    accept=".png, .jpg, .jpeg"
                    beforeUpload={handleUploadShopImageProfile}
                  >
                    <button
                      type="button"
                      onMouseEnter={() => setHoveringProfileImage(true)}
                      onMouseLeave={() => setHoveringProfileImage(false)}
                      className="bg-primary-100 p-1 rounded-xl border-4 border-primary-300 absolute bottom-5 right-4 z-[50]
                      hover:border-primary-400 transition-all ease-linear duration-300"
                    >
                      <FaEdit className="text-lg" />
                    </button>
                  </Upload>
                </ImgCrop>
                <Image
                  unoptimized
                  src={
                    shopImageProfileUrl ||
                    "https://uploads.dailydot.com/2018/10/olli-the-polite-cat.jpg?auto=compress&fm=pjpg"
                  }
                  alt="Cover"
                  width={256}
                  height={576}
                  // onClick={() => handleOpenPreviewImage(coverImageUrl)}
                  className={`sm:w-[196px] sm:h-[196px] w-[224px] h-[224px] object-cover z-[20] relative rounded-full cursor-pointer 
                    hover:brightness-125 transition-all ease-linear duration-300 mx-auto mb-6 border-8 border-double border-primary-200
                    ${
                      hoveringProfileImage
                        ? "border-primary-400"
                        : "border-primary-300"
                    }`}
                />
              </div>
            </Form.Item>
            <Form.Item
              label="ชื่อร้านค้า"
              name="shop_name"
              rules={[{ required: true, message: "โปรดระบุชื่อร้านค้า" }]}
            >
              <Input
                placeholder="ชื่อร้านค้า"
                maxLength={100}
                showCount
                onChange={(e) => {
                  form.setFieldValue("shop_name", e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item
              label="คำอธิบายร้านค้า"
              name="shop_description"
              rules={[
                {
                  required: true,
                  message: "โปรดระบุคำอธิบายร้านค้า",
                },
              ]}
            >
              <TextArea
                placeholder="คำอธิบายร้านค้า"
                maxLength={300}
                showCount
                autoSize
                onChange={(e) => {
                  form.setFieldValue("shop_description", e.target.value);
                }}
              />
            </Form.Item>
          </div>
        </div>
        <div className="col-span-full sm:col-span-5 bg-primary-50 rounded-xl drop-shadow-sm px-6 pt-4 h-fit">
          <h3 className="text-primary-800 mb-4">ข้อมูลร้านค้า</h3>
          <Form.Item
            label="ประเภทร้านค้าและบริการ"
            name="type"
            rules={[
              {
                required: true,
                message: "โปรดเลือกประเภทสินค้าอย่างน้อยหนึ่งประเภท",
              },
            ]}
          >
            <Select
              defaultValue={form.getFieldValue("type")}
              size="middle"
              placeholder="เลือกประเภทสินค้า"
              mode="multiple"
              onChange={(value) => {
                form.setFieldValue("type", value);
              }}
              options={productTypeOptions}
            />
          </Form.Item>
          <h5 className="text-lg">
            <span className="text-red-400 mr-1">*</span>ช่องทางการชำระเงิน
          </h5>
          <div className="flex gap-x-4 bg-white mt-1 px-4 py-2 w-fit rounded-lg mb-2 border-primary-200 border h-fit">
            <Form.Item
              name="accept_credit_card"
              valuePropName="checked"
              style={{ marginBottom: 0 }}
              rules={[{ validator: validatePaymentMethods }]}
            >
              <Checkbox
                defaultChecked={form.getFieldValue("accept_credit_card")}
                onChange={(e) => {
                  form.setFieldValue("accept_credit_card", e.target.checked);
                }}
              />
              <label className="ml-3">บัตรเครดิต/เดบิต</label>
            </Form.Item>
            <Form.Item
              name="accept_qr_promptpay"
              valuePropName="checked"
              style={{ marginBottom: 0 }}
              rules={[{ validator: validatePaymentMethods }]}
            >
              <Checkbox
                defaultChecked={form.getFieldValue("accept_qr_promptpay")}
                onChange={(e) => {
                  form.setFieldValue("accept_qr_promptpay", e.target.checked);
                }}
              />
              <label className="ml-3">QR พร้อมเพย์</label>
            </Form.Item>
          </div>
          <Form.Item
            style={{ marginTop: 12 }}
            label="ลิงก์ร้านค้าภายนอก"
            name="link"
          >
            <Input
              placeholder="ลิงก์"
              onChange={(e) => {
                form.setFieldValue("link", e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large">
              ถัดไป
            </Button>
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};

export default CreateShopStep1Form;
