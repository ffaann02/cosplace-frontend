'use client';
import LoginFormCard from "@/components/login/form-card";
import { Col, Row, Typography } from "antd";

const { Title } = Typography;

const Login = () => {
  return (
    <div className="flex-grow bg-blue-50 px-6 py-12">
      <Row gutter={[16, 16]}>
      <Col xs={24} sm={24} md={12} lg={12} className="py-12">
      <Title level={2} className="text-center">CosBaanDeawGun</Title>
            <Title level={1} className="text-center">" แค่มองตากันก็เข้าใจอยู่ "</Title>
            <LoginFormCard />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>hello</Col>
      </Row>
    </div>
  );
};
export default Login;
