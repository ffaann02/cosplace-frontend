"use client";
import { useState } from "react";
import {
  Form,
  Input,
  Button,
  Checkbox,
  DatePicker,
  Upload,
  Breadcrumb,
  Steps,
  Select,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { apiClientWithAuth } from "@/api";
// import { useSession } from "next-auth/react";
import ImgCrop from "antd-img-crop";
import Image from "next/image";
import TextArea from "antd/es/input/TextArea";
import { HomeOutlined, ShopOutlined, UserOutlined } from "@ant-design/icons";
import { FaEdit } from "react-icons/fa";
import CreateShopStep1Form from "./create-shop-step1-form";
import CreateShopStep2Form, { Bank } from "./create-shop-step2-form";
import CreateShopStep3Form from "./create-shop-step3-form";
import { useAuth } from "@/context/auth-context";

const items = [
  {
    title: "ข้อมูลร้านค้า",
  },
  {
    title: "ตั้งค่าร้านค้า",
  },
  {
    title: "ยืนยันตัวตน",
  },
];

const productTypeOptions = [
  { value: "costume", label: "ชุดคอสเพลย์ และของตกแต่ง" },
  { value: "makeup", label: "บริการแต่งหน้า และเครื่องสำอาง" },
  { value: "custom_commission", label: "งานสั่งทำพิเศษ" },
  { value: "fabric_tool", label: "ผ้าวัสดุ และอุปกรณ์ตัดเย็บ" },
  { value: "photo_social", label: "ถ่ายรูป และโซเชียลมีเดีย" },
  { value: "other", label: "อื่น ๆ" },
];

const CreateShop = () => {
  const [form1] = useForm();
  const [form2] = useForm();
  const { user } = useAuth();
  const [shopImageProfileUrl, setShopImageProfileUrl] = useState<string | null>(
    null
  );
  const [uploadingProfileImage, setUploadingProfileImage] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [hoveringProfileImage, setHoveringProfileImage] = useState(false);
  const [checked, setChecked] = useState(false);
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const [formData1, setFormData1] = useState<any>({});
  const [formData2, setFormData2] = useState<any>({});

  const onFinish = (values: any) => {
    console.log("Form values:", values);
    // Handle form submission logic here
  };

  const handleUploadShopImageProfile = async (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result as string;
      try {
        setUploadingProfileImage(true);
        const response = await apiClientWithAuth.post("/shop/upload-image", {
          user_id: user?.user_id,
          image: base64Image,
        });
        const image_url = response.data.image_url;
        setShopImageProfileUrl(image_url);
        // setShopImageProfileUrl(base64Image);
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setUploadingProfileImage(false);
      }
    };
  };

  const renderStepContent = (currentStep: number) => {
    switch (currentStep) {
      case 0:
        return (
          <CreateShopStep1Form
            form={form1}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            handleUploadShopImageProfile={handleUploadShopImageProfile}
            shopImageProfileUrl={shopImageProfileUrl}
            productTypeOptions={productTypeOptions}
            setHoveringProfileImage={setHoveringProfileImage}
            hoveringProfileImage={hoveringProfileImage}
            setFormData1={setFormData1}
          />
        );
      case 1:
        return (
          <CreateShopStep2Form
            form={form2}
            onFinish={onFinish}
            setCurrentStep={setCurrentStep}
            selectedBank={selectedBank}
            setSelectedBank={setSelectedBank}
            checked={checked}
            setChecked={setChecked}
            setFormData2={setFormData2}
          />
        );
      case 2:
        return (
          <CreateShopStep3Form
            formData1={formData1}
            formData2={formData2}
            shopImageProfileUrl={shopImageProfileUrl}
            setCurrentStep={setCurrentStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      <div className="mb-4">
        <Breadcrumb
          items={[
            {
              href: "/",
              title: <HomeOutlined />,
            },
            {
              href: "",
              title: (
                <>
                  <ShopOutlined />
                  <span>ร้านค้า</span>
                </>
              ),
            },
            {
              title: "เปิดร้านค้าใหม่",
            },
          ]}
        />
      </div>
      <div className="px-0 md:px-16 mx-auto mt-8 mb-6">
        <Steps current={currentStep} labelPlacement="vertical" direction="horizontal" items={items} />
      </div>
      {renderStepContent(currentStep)}
    </div>
  );
};

export default CreateShop;
