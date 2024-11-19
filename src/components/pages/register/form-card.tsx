import { RegisterFormValues } from "@/app/register/page";
import { Button, Checkbox, DatePicker, Divider, Flex, Form, Input, Select } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import Link from "next/link";
import { FaGoogle, FaLock, FaUser, FaRegUser } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { IoMail } from "react-icons/io5";

const { Option } = Select;

interface RegisterFormCardProps {
  onFinish: (values: RegisterFormValues) => void;
  accept: boolean;
  setAccept: (accept: boolean) => void;
  errorMessage?: string;
  fetching?: boolean;
}

const RegisterFormCard = ({
  onFinish,
  accept,
  setAccept,
  errorMessage = "",
  fetching = false,
}: RegisterFormCardProps) => {
  const handleAcceptChange = (e: CheckboxChangeEvent) => {
    setAccept(e.target.checked);
  };

  return (
    <div
      className="bg-primary-50 drop-shadow-sm border text-primary-800 border-primary-200 
        mx-auto p-6 sm:px-6 rounded-3xl mt-4"
    >
      <p className="text-xl lg:text-2xl text-center mb-4">
        สมัครบัญชีเพื่อใช้บริการแพลตฟอร์ม
      </p>
      <Form name="register" initialValues={{ remember: true }} onFinish={onFinish}>
        <Flex gap={8}>
          <Form.Item
            style={{ width: "50%" }}
            name="first_name"
            rules={[{ required: true, message: "โปรดกรอกชื่อจริง" }]}
          >
            <Input
              size="large"
              prefix={<FaRegUser />}
              placeholder="ชื่อจริง"
            />
          </Form.Item>
          <Form.Item
            style={{ width: "50%" }}
            name="last_name"
            rules={[{ required: true, message: "โปรดกรอกนามสกุล" }]}
          >
            <Input size="large" prefix={<FaRegUser />} placeholder="นามสกุล" />
          </Form.Item>
        </Flex>
        <Flex gap={8}>
          <Form.Item
            style={{ width: "40%" }}
            name="phone_number"
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
              placeholder="เบอร์โทรศัพท์"
            />
          </Form.Item>
          <Form.Item
            style={{ width: "40%" }}
            name="date_of_birth"
            rules={[{ required: true, message: "โปรดเลือกวันเกิด" }]}
          >
            <DatePicker
              size="large"
              placeholder="วันเกิด"
              format="YYYY-MM-DD"
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            style={{ width: "20%" }}
            name="gender"
            rules={[{ required: true, message: "โปรดเลือกเพศ" }]}
          >
            <Select size="large" placeholder="เพศ">
              <Option value="male">ชาย</Option>
              <Option value="female">หญิง</Option>
              <Option value="unspecified">ไม่ระบุ</Option>
              <Option value="other">อื่นๆ</Option>
            </Select>
          </Form.Item>
        </Flex>
        <Flex gap={8}>
          <Form.Item
            style={{ width: "50%" }}
            name="username"
            rules={[{ required: true, message: "โปรดกรอก Username" }]}
          >
            <Input size="large" prefix={<FaUser />} placeholder="ชื่อผู้ใช้" />
          </Form.Item>
          <Form.Item
            style={{ width: "50%" }}
            name="email"
            rules={[
              { required: true, message: "โปรดกรอกอีเมล" },
              { type: "email", message: "รูปแบบอีเมลไม่ถูกต้อง" },
            ]}
          >
            <Input size="large" prefix={<IoMail />} placeholder="อีเมล" />
          </Form.Item>
        </Flex>
        <Flex gap={8}>
          <Form.Item
            style={{ width: "50%" }}
            name="password"
            rules={[
              { required: true, message: "โปรดกรอกรหัสผ่าน" },
              { min: 8, message: "รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร" },
              { max: 50, message: "รหัสผ่านต้องมีความยาวไม่เกิน 50 ตัวอักษร" },
              {
                pattern: /[A-Za-z]/,
                message: "รหัสผ่านต้องมีตัวอักษรอย่างน้อย 1 ตัว",
              },
            ]}
          >
            <Input
              size="large"
              prefix={<FaLock />}
              type="password"
              placeholder="รหัสผ่าน"
            />
          </Form.Item>
          <Form.Item
            style={{ width: "50%" }}
            name="confirm_password"
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
              placeholder="ยืนยันรหัสผ่าน"
            />
          </Form.Item>
        </Flex>
        <div className="text-left -mt-4 mb-6">
          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}
        </div>
        <Form.Item
          style={{ marginBottom: 12, display: "flex" }}
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
            loading={fetching}
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