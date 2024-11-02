import { RegisterFormValues } from "@/app/register/page";
import { Button, Checkbox, DatePicker, Divider, Flex, Form, Input } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import Link from "next/link";
import { FaGoogle, FaLock, FaUser, FaRegUser } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { IoMail } from "react-icons/io5";

interface RegisterFormCardProps {
  onFinish: (values: RegisterFormValues) => void;
  accept: boolean;
  setAccept: (accept: boolean) => void;
  errorMessage?: string;
}

const RegisterFormCard = ({
  onFinish,
  accept,
  setAccept,
  errorMessage = "",
}: RegisterFormCardProps) => {
  const handleAcceptChange = (e: CheckboxChangeEvent) => {
    setAccept(e.target.checked);
  };

  return (
    <div
      className="bg-primary-50 drop-shadow-sm border text-primary-800 border-primary-200 
        mx-auto p-6 pb-8 sm:px-6 rounded-3xl mt-8"
    >
      <h3 className="text-center mb-4">สมัครบัญชีเพื่อใช้บริการแพลตฟอร์ม</h3>
      <Form name="login" initialValues={{ remember: true }} onFinish={onFinish}>
        <Flex gap={8}>
          <Form.Item
            name="firstname"
            rules={[{ required: true, message: "โปรดกรอกชื่อจริง" }]}
          >
            <Input
              size="large"
              prefix={<FaRegUser />}
              placeholder="First name"
            />
          </Form.Item>
          <Form.Item
            name="lastname"
            rules={[{ required: true, message: "โปรดกรอกนามสกุล" }]}
          >
            <Input
              size="large"
              prefix={<FaRegUser />}
              placeholder="Last name"
            />
          </Form.Item>
        </Flex>
        <Flex gap={8}>
          <Form.Item
            name="phoneNumber"
            rules={[
              { required: true, message: "โปรดกรอกเบอร์โทรศัพท์มือถือ" },
              {
                pattern: /^[0-9]{10}$/,
                message: "เบอร์โทรศัพท์ต้องเป็นตัวเลข 10 หลัก",
              },
            ]}
          >
            <Input
              size="large"
              prefix={<FiPhone />}
              placeholder="Phone number"
            />
          </Form.Item>
          <Form.Item
            className="w-1/2"
            name="dateOfBirth"
            rules={[{ required: true, message: "โปรดเลือกวันเกิด" }]}
          >
            <DatePicker
              size="large"
              placeholder="Date of birth"
              format="YYYY-MM-DD"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Flex>

        <Form.Item
          name="username"
          rules={[{ required: true, message: "โปรดกรอก Username" }]}
        >
          <Input size="large" prefix={<FaUser />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "โปรดกรอกอีเมล" },
            { type: "email", message: "รูปแบบอีเมลไม่ถูกต้อง" },
          ]}
        >
          <Input size="large" prefix={<IoMail />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "โปรดกรอกรหัสผ่าน" }]}
        >
          <Input
            size="large"
            prefix={<FaLock />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          rules={[
            { required: true, message: "โปรดกรอกรหัสผ่าน" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("รหัสผ่านไม่ตรงกัน"));
              },
            }),
          ]}
        >
          <Input
            size="large"
            prefix={<FaLock />}
            type="password"
            placeholder="Confirm password"
          />
        </Form.Item>
        <div className="text-left -mt-4 mb-6">
            {errorMessage && (
              <p className="text-red-500 text-sm">{errorMessage}</p>
            )}
          </div>
        <Form.Item
          style={{ marginTop: -16, marginBottom: 12, display: "flex" }}
          name="accept"
          valuePropName="checked"
          rules={[
            {
              required: true,
              message: "คุณต้องยอมรับเงื่อนไขและข้อตกลง",
            },
          ]}
        >
          <Checkbox checked={accept} onChange={handleAcceptChange}>
            ฉันยอมรับเงื่อนไขและข้อตกลง
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Button
            disabled={!accept}
            size="large"
            block
            type="primary"
            htmlType="submit"
          >
            สมัครบัญชี
          </Button>
        </Form.Item>
      </Form>
      <div className="text-center -mt-2 mb-4 text-sm flex justify-center gap-x-2">
        <p className="text-neutral-400">มีบัญชีอยู่แล้ว? </p>
        <Link href={"/login"} className="hover:underline">
          เข้าสู่ระบบ
        </Link>
      </div>
      {/* <p className="text-center -mt-2 mb-4 text-sm">หรือ</p> */}
      <Divider>หรือ</Divider>
      <Button
        icon={<FaGoogle />}
        size="large"
        block
        type="default"
        htmlType="submit"
        color="primary"
      >
        ลงชื่อเข้าใช้ด้วย Google
      </Button>
    </div>
  );
};

export default RegisterFormCard;
