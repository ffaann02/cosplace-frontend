'use client';
// import { login } from "@/api/auth";
import LoginFormCard from "@/components/login/form-card";
import { Col, message, Row, Typography } from "antd";
import { useRouter } from "next/navigation";

const { Title } = Typography;

export interface LoginFormValues {
  username: string;
  password: string;
  remember: boolean;
}

const Login = () => {
  const router = useRouter();

  const onFinish = async (values: LoginFormValues) => {
    try{
      // const {username, password} = values;
      console.log(values);
      // const data = await login(username, password);

      message.success("Login successful");
      router.push("/");

    }
    catch (error: unknown) {
      if (error instanceof Error) {
        message.error(error.message);
      } else {
        message.error("Login failed");
      }
    }
  }


  return (
    <div className="flex-grow px-6 sm:pt-12 pb-12 pt-6">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={12} lg={12} className="sm:pt-12 pb-12 pt-2">
          <Title level={2} className="text-center">CosBaanDeawGun</Title>
          <Title level={1} className="text-center">&quot; แค่มองตากันก็เข้าใจอยู่ &quot;</Title>
          <LoginFormCard onFinish={onFinish} />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>hello</Col>
      </Row>
    </div>
  );
};
export default Login;