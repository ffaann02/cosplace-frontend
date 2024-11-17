"use client";
import LoginFormCard from "@/components/pages/login/form-card";
import { roundedButton } from "@/config/theme";
import { Button, Flex, message, Typography } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {  useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { signIn, useSession } from "next-auth/react";

const { Title } = Typography;

export interface LoginFormValues {
  username: string;
  password: string;
  remember: boolean;
}

const Login = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [fetching, setFetching] = useState<boolean>(false);
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  const onFinish = async (values: LoginFormValues) => {
    await signIn("credentials", {
      username: values.username,
      password: values.password,
      redirect: true,
      callbackUrl: "/",
    });
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
