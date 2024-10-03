import { apiClientWithAuth } from "@/api";
import { LoginFormValues } from "@/app/login/page";
import { Button, Checkbox, Form, Input } from "antd";
import axios from "axios";
import { FaGoogle, FaLock, FaUser } from "react-icons/fa";

interface LoginFormCardProps {
  onFinish: (values: LoginFormValues) => void;
}

const LoginFormCard = ({ onFinish }: LoginFormCardProps) => {

  const testFetch = async () => {
    const response = await apiClientWithAuth.get("/commission");
    console.log(response.data);
  };

  return (
    <div className="bg-primary-50 drop-shadow-sm border text-primary-800 border-primary-200 mx-auto p-6 pb-8 sm:px-6 rounded-3xl mt-8">
      <h3 className="text-center mb-4">เริ่มต้นใช้งานและสนุกไปกับการคอสเพลย์ได้เลย!</h3>
      <Form name="login" initialValues={{ remember: true }} onFinish={onFinish}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "โปรดกรอก Username หรือ Email" }]}
        >
          <Input
            size="large"
            prefix={<FaUser />}
            placeholder="Username or Email"
          />
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
        <div className="-mt-4 flex justify-between">
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>จดจำบัญชี</Checkbox>
          </Form.Item>
          <Button type="link" className="underline" style={{ padding: 0 }}>
            ลืมรหัสผ่าน
          </Button>
        </div>
        <Form.Item>
          <Button size="large" block type="primary" htmlType="submit">
            ลงชื่อเข้าใช้งาน
          </Button>
        </Form.Item>
      </Form>
      <p className="text-center -mt-2 mb-4 text-sm">หรือ</p>
      <Button
        onClick={testFetch}
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

export default LoginFormCard;