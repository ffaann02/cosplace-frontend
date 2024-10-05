"use client";
import { register } from "@/api/auth";
// import { login } from "@/api/auth";
import RegisterFormCard from "@/components/pages/register/form-card";
import { roundedButton } from "@/config/theme";
import { useAuth } from "@/context/auth-context";
import { Button, Flex, message, Typography } from "antd";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import moment from "moment"; // Make sure to install moment if not already installed

const { Title } = Typography;

export interface RegisterFormValues {
  firstname: string;
  lastname: string;
  phoneNumber: string;
  dateOfBirth: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  accept: boolean;
}

const Login = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  },[]);

  const onFinish = async (values: RegisterFormValues) => {
    try {
      const { firstname, lastname, phoneNumber, dateOfBirth, username, email, password } = values;
      console.log(values);
      const formatedDateOfBirth = moment(dateOfBirth).format("YYYY-MM-DD")
      const data = await register(firstname, lastname, phoneNumber, formatedDateOfBirth, username, email, password);
      console.log(data);
      message.success("Register successful");
      router.push("/login");
    } catch (error: unknown) {
      if (error instanceof Error) {
        message.error(error.message);
      } else {
        message.error("Register failed");
      }
    }
  };

  return (
    <div className="flex-grow px-6 flex flex-col bg-gradient-to-br from-white to-secondary-50">
      <Flex className="h-full flex-grow">
        <div className="sm:pt-12 pb-12 pt-2 my-auto mx-auto w-full max-w-md">
          <Title level={2} className="text-center">
            CosBaanDeawGun
          </Title>
          <RegisterFormCard onFinish={onFinish} />
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
