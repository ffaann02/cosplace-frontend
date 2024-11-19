import { apiClientWithAuth } from "@/api";
import { LoginFormValues } from "@/app/login/page";
import { Button, Checkbox, Form, Input } from "antd";
import Link from "next/link";
import { FaGoogle, FaLock, FaUser } from "react-icons/fa";

interface LoginFormCardProps {
  onFinish: (values: LoginFormValues) => void;
  errorMessage?: string;
  setErrorMessage?: (errorMessage: string) => void;
  fetching?: boolean;
}

const LoginFormCard = ({ onFinish, errorMessage="",fetching=false }: LoginFormCardProps) => {
  return (
    <div className="bg-primary-50 drop-shadow-sm border text-primary-800 border-primary-200 mx-auto p-6 pb-8 sm:px-6 rounded-3xl mt-8">
      <p className="text-md sm:text-lg md:text-xl text-center mb-4">
        เริ่มต้นใช้งานและสนุกไปกับการคอสเพลย์ได้เลย!
      </p>
      <Form name="login" initialValues={{ remember: true }} onFinish={onFinish}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "โปรดกรอก Username หรือ Email" }]}
        >
          <Input
            size="large"
            prefix={<FaUser />}
            placeholder="ชื่อผู้ใช้ หรือ อีเมล"
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
            placeholder="รหัสผ่าน"
          />
        </Form.Item>
        <div className="-mt-4 text-left mb-4">
          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}
        </div>
        <div className="flex justify-between -mb-4">
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>จดจำบัญชี</Checkbox>
          </Form.Item>
          <Button type="link" className="underline" style={{ padding: 0 }}>
            ลืมรหัสผ่าน
          </Button>
        </div>
        <Form.Item>
          <Button loading={fetching} size="large" block type="primary" htmlType="submit">
            ลงชื่อเข้าใช้งาน
          </Button>
        </Form.Item>
        <div className="-mt-4 mb-2">
          <Link href="/register" passHref>
            สร้างบัญชีผู้ใช้ใหม่
          </Link>
        </div>
      </Form>
      <p className="text-center -mt-2 mb-4 text-sm">หรือ</p>
      <Button
        // onClick={testFetch}
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
