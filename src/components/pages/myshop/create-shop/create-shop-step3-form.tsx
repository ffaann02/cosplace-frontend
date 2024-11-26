"use client";
import React, { useRef, useState } from "react";
import { Form, Input, Space, Button, InputRef } from "antd";
import { useForm } from "antd/es/form/Form";
import { CheckOutlined } from "@ant-design/icons";
import Image from "next/image";
import { apiClientWithAuth } from "@/api";
import { useAuth } from "@/context/auth-context";

const CreateShopStep3Form = ({
  formData1,
  formData2,
  shopImageProfileUrl,
  setCurrentStep,
}: {
  formData1: any;
  formData2: any;
  shopImageProfileUrl: string | null;
  setCurrentStep: any;
}) => {

  const { user, setUser } = useAuth();

  const [form] = useForm();
  const inputRefs = useRef<(InputRef | null)[]>([]);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [isOTPValid, setIsOTPValid] = useState<boolean>(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;
    if (/^\d$/.test(value)) {
      form.setFieldValue(`digit${index + 1}`, value);
      if (index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    } else {
      form.setFieldValue(`digit${index + 1}`, "");
    }

    // Automatically submit when all digits are filled
    const otp = Object.values(form.getFieldsValue()).join("");
    if (otp.length === 6) {
      onSubmit(otp);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const CreateNewShopToDatabase = async(formData1: any, formData2: any) => {
    try{
      const accept_credit_card = formData1.accept_credit_card ? true : false;
      const accept_qr_promptpay = formData1.accept_qr_promptpay ? true : false;
      const requestBody = {
        user_id: user?.user_id,
        username: user?.username,
        shop_type: formData1.type[0],
        shop_name: formData1.shop_name,
        shop_desc: formData1.shop_description,
        profile_image_url: shopImageProfileUrl || "",
        verify: false,
        accept_credit_card: accept_credit_card ,
        accept_qr_promptpay: accept_qr_promptpay,
        external_link: formData1.link || "",
        bank_name: formData2.bank,
        bank_account_number: formData2.bank_account_number,
      }
      console.log("Request body:", requestBody);
      const response = await apiClientWithAuth.post("/shop/create-new", requestBody);
      console.log("Create shop response:", response.data);
      setUser({
        user_id: response.data.user_id,
        username: response.data.username,
        role: response.data.role,
        seller_id: response.data.seller_id,
      })
    } catch (error) {
      console.error("Failed to create shop", error);
    }
  }

  const onRequestNewOTP = () => {
    console.log("Requesting new OTP...");
    form.resetFields();
  };

  const onSubmit = (otp?: string) => {
    const finalOtp = otp || Object.values(form.getFieldsValue()).join("");
    console.log("OTP Submitted:", finalOtp);
    setSubmitting(true);
    validateOTP(finalOtp).then((isValid) => {
      setSubmitting(false);
      if (isValid) {
        console.log("OTP is valid!");
        console.log("Form data:")
        console.log("Step 1:", formData1);
        console.log("Step 2:", formData2);
        console.log("Shop Image Profile URL:", shopImageProfileUrl);
        setIsOTPValid(true);
      } else {
        console.log("OTP is invalid!");
        form.resetFields();
        inputRefs.current[0]?.focus();
      }
    });
  };

  const validateOTP = async (input: string) => {
    const base = "111111";
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(base === input);
      }, 1000);
    });
  };

  const censoredShowOnlyLast4Digits = (phone: string) => {
    if (!phone) return "";
    return `xxxxx${phone.slice(-4)}`;
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const handleConfirmCreate = () => {
    const finalOtp = Object.values(form.getFieldsValue()).join("");
    validateOTP(finalOtp).then((isValid) => {
      setSubmitting(false);
      if (isValid) {
        CreateNewShopToDatabase(formData1, formData2);
      } else {
        console.log("OTP is invalid!");
        form.resetFields();
        inputRefs.current[0]?.focus();
      }
    });
  }

  return (
    <div className="w-full bg-primary-50 px-8 pt-6 rounded-2xl drop-shadow-sm justify-center flex flex-col text-center relative">
      <button className="absolute left-5 top-4 text-sm text-primary-400 hover:text-primary-600 underline" onClick={handleBack}>
        ย้อนกลับ
      </button>
      <Image
        src="https://arkesel.com/wp-content/uploads/2023/12/otp-illustrations.png"
        alt="OTP Illustration"
        width={200}
        height={200}
        unoptimized
        className="mx-auto mb-4"
      />
      <h3 className="text-primary-700">ยืนยันตัวตนผ่าน OTP</h3>
      <p className="text-primary-600 text-sm mt-2 mb-8">
        เราได้ส่งรหัส OTP ไปยังเบอร์โทรศัพท์{" "}
        {censoredShowOnlyLast4Digits(formData2.phone_number)}{" "}
        ของคุณแล้ว
      </p>
      <Form form={form} layout="vertical" onFinish={() => onSubmit()}>
        <Form.Item>
          <Space>
            {[...Array(6)].map((_, index) => (
              <Form.Item key={index} name={`digit${index + 1}`} noStyle>
                <Input
                  ref={(el) => (inputRefs.current[index] = el) as any}
                  maxLength={1}
                  onChange={(e) => handleInputChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  style={{ width: 40, textAlign: "center" }}
                />
              </Form.Item>
            ))}
          </Space>
        </Form.Item>
        <Form.Item>
          <p>ไม่ได้รับรหัส OTP?</p>
          <Button
            type="link"
            size="small"
            disabled={submitting}
            onClick={() => onRequestNewOTP()}
          >
            ส่งรหัสอีกครั้ง
          </Button>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            size="large"
            icon={<CheckOutlined />}
            onClick={() => handleConfirmCreate()}
            loading={submitting}
            disabled={!isOTPValid}
          >
            ยืนยัน
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateShopStep3Form;
