"use client";
import { login } from "@/api/auth";
import LoginFormCard from "@/components/pages/login/form-card";
import { roundedButton } from "@/config/theme";
import { useAuth } from "@/context/auth-context";
import { Button, Flex, message, Typography } from "antd";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";

const { Title } = Typography;

export interface LoginFormValues {
  username: string;
  password: string;
  remember: boolean;
}

const Login = () => {
  const router = useRouter();
  const { isAuthenticated, setIsAuthenticated, setUser } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const onFinish = async (values: LoginFormValues) => {
    try {
      const { username, password } = values;
      const data = await login(username, password);
      setIsAuthenticated(true);
      setUser({
        user_id: data.user,
        username: data.username,
      })
  
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
    <div className="flex-grow px-6 flex flex-col bg-gradient-to-br from-white to-secondary-50 -mt-16">
      <Flex className="h-full flex-grow">
        <div className="pb-12 pt-2 my-auto mx-auto w-full max-w-md">
          <Title level={2} className="text-center">
            CosBaanDeawGun
          </Title>
          <Title level={1} className="text-center">
            &quot; แค่มองตากันก็เข้าใจอยู่ &quot;
          </Title>
          <LoginFormCard onFinish={onFinish} />
          <div className="flex justify-center mt-6">
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
