"use client";
// import { login } from "@/api/auth";
import LoginFormCard from "@/components/login/form-card";
import { roundedButton } from "@/config/theme";
import { Button, Col, Flex, message, Row, Typography } from "antd";
import { useRouter } from "next/navigation";
import { FaArrowRight, FaInfoCircle } from "react-icons/fa";
import { FaRightLong } from "react-icons/fa6";

const { Title } = Typography;

export interface LoginFormValues {
  username: string;
  password: string;
  remember: boolean;
}

const Login = () => {
  const router = useRouter();

  const onFinish = async (values: LoginFormValues) => {
    try {
      // const {username, password} = values;
      console.log(values);
      // const data = await login(username, password);

      message.success("Login successful");
      router.push("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        message.error(error.message);
      } else {
        message.error("Login failed");
      }
    }
  };

  return (
    <div className="flex-grow px-6 sm:pt-12 pb-12 pt-6 flex flex-col">
      <Flex className="h-full flex-grow">
        <div className="sm:pt-12 pb-12 pt-2 my-auto mx-auto">
          <Title level={2} className="text-center">
            CosBaanDeawGun
          </Title>
          <Title level={1} className="text-center">
            &quot; แค่มองตากันก็เข้าใจอยู่ &quot;
          </Title>
          <LoginFormCard onFinish={onFinish} />
          <div className="flex justify-center mt-12">
            <Button
              style={roundedButton}
              size="large"
              icon={<FaArrowRight />}
              iconPosition="end"
            >
              เรียนรู้เพิ่มเติม
            </Button>
          </div>
        </div>
      </Flex>
    </div>
  );
};
export default Login;
