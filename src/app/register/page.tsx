"use client";
import { register } from "@/api/auth";
import RegisterFormCard from "@/components/pages/register/form-card";
import { roundedButton } from "@/config/theme";
import { useAuth } from "@/context/auth-context";
import { Button, Flex, message, Typography } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { format } from "date-fns";

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

const Register = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [accept, setAccept] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  },[isAuthenticated, router]);

  const onFinish = async (values: RegisterFormValues) => {
    try {
      const { firstname, lastname, phoneNumber, dateOfBirth, username, email, password } = values;
      console.log(values);
      const formatedDateOfBirth = format(new Date(dateOfBirth), "yyyy-MM-dd");
      const data = await register(firstname, lastname, phoneNumber, formatedDateOfBirth, username, email, password);
      console.log(data);
      message.success("Register successful");
      router.push("/login");
    } catch (error: unknown) {
      if (error instanceof Error && (error as any).response) {
        message.error((error as any).response.data.message);
        setErrorMessage((error as any).response.data.message);
      } else {
        message.error("Register failed");
      }
    }
  };

  return (
    <div className="flex-grow px-6 flex flex-col bg-gradient-to-br from-white to-secondary-50 -mt-16">
      <Flex className="h-full flex-grow">
        <div className="pb-12 pt-2 my-auto mx-auto w-full max-w-lg">
          <Title level={2} className="text-center">
            CosBaanDeawGun
          </Title>
          <RegisterFormCard onFinish={onFinish} accept={accept} setAccept={setAccept} errorMessage={errorMessage} />
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
export default Register;
