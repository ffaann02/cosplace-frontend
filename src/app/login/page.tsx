"use client";
import LoginFormCard from "@/components/pages/login/form-card";
import { roundedButton } from "@/config/theme";
import { Button, Flex, message, Typography } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {  useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { signIn, useSession } from "next-auth/react";
import { useAuth } from "@/context/auth-context";
import { login } from "@/api/auth";

const { Title } = Typography;

export interface LoginFormValues {
  username: string;
  password: string;
  remember: boolean;
}

const Login = () => {
  const router = useRouter();
  const {user, setIsAuthenticated, setUser} = useAuth();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [fetching, setFetching] = useState<boolean>(false);
  // const { status } = useSession();

  useEffect(() => {
    if (user?.user_id) {
      router.push("/");
    }
  }, [user, router]);

  const onFinish = async (values: LoginFormValues) => {
    try {
      setFetching(true);
      const { username, password } = values;
      const data = await login(username, password);
      setIsAuthenticated(true);
      setUser({
        user_id: data.user_id,
        username: data.username,
      });
      setFetching(false);
      window.location.reload();
      // router.push("/");
    } catch (error: unknown) {
      setFetching(false);
      if (error instanceof Error && (error as any).response) {
        message.error((error as any).response.data.message);
        setErrorMessage((error as any).response.data.message);
      } else {
        // message.error("Login failed");
      }
    }
  };


  return (
    <div className="flex-grow px-6 flex flex-col -mt-16 pt-6">
      <Flex className="h-full flex-grow">
        <div className="pb-12 pt-2 my-auto mx-auto w-full max-w-md">
          <Link href="/" passHref className="my-auto text-center">
            <h1 className="text-4xl font-semibold tracking-wider flex flex-col">
              <span className="text-secondary-600">CosBaan</span>
              <span className="-mt-2 text-secondary-700">DeawGun</span>
            </h1>
          </Link>
          <h3 className="text-center text-primary-700 font-semibold mt-4">
            &quot; แค่มองตากันก็เข้าใจอยู่ &quot;
          </h3>
          <LoginFormCard
            onFinish={onFinish}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            fetching={fetching}
          />
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
