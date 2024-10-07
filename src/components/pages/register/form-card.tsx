import { apiClientWithAuth } from "@/api";
import { RegisterFormValues } from "@/app/register/page";
import { Button, Checkbox, DatePicker, Flex, Form, Input } from "antd";
import {
  FaGoogle,
  FaLock,
  FaUser,
  FaRegUser,
  FaCalendarAlt,
} from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { IoMail } from "react-icons/io5";

interface RegisterFormCardProps {
  onFinish: (values: RegisterFormValues) => void;
  accept: boolean;
  setAccept: (accept: boolean) => void;
}

const RegisterFormCard = ({
  onFinish,
  accept,
  setAccept,
}: RegisterFormCardProps) => {
  const [form] = Form.useForm();

  const handleAcceptChange = (e: any) => {
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
            rules={[{ required: true, message: "โปรดกรอกเบอร์โทรศัพท์มือถือ" }]}
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
          rules={[{ required: true, message: "โปรดกรอก Email" }]}
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
        <Form.Item
          style={{ marginTop: -16, marginBottom: 12 }}
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
      <p className="text-center -mt-2 mb-4 text-sm">หรือ</p>
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
