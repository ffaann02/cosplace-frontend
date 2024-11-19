"use client";
import { register, User } from "@/api/auth";
import RegisterFormCard from "@/components/pages/register/form-card";
import { roundedButton } from "@/config/theme";
import { Button, Flex, message, Typography } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { format } from "date-fns";
import Link from "next/link";
import { useSession } from "next-auth/react";

const { Title } = Typography;

export interface RegisterFormValues {
  first_name: string;
  last_name: string;
  phone_number: string;
  date_of_birth: string;
  username: string;
  email: string;
  gender: string;
  password: string;
  confirm_password: string;
  accept: boolean;
}

const Register = () => {
  const router = useRouter();
  const {status} = useSession();
  const [accept, setAccept] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [fetching, setFetching] = useState<boolean>(false);

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  const onFinish = async (values: RegisterFormValues) => {
    try {
      setFetching(true);
      const {
        first_name,
        last_name,
        phone_number,
        date_of_birth,
        gender,
        username,
        email,
        password,
      } = values;
      const user:User = {
        first_name,
        last_name,
        phone_number,
        date_of_birth,
        gender,
        username,
        email,
        password
      }
      const formatedDateOfBirth = format(new Date(date_of_birth), "yyyy-MM-dd");
      user.date_of_birth = formatedDateOfBirth;
      const data = await register(
        user
      );
      setFetching(false);
      console.log(data);
      message.success("Register successful");
      router.push("/login");
    } catch (error: unknown) {
      setFetching(false);
      if (error instanceof Error && (error as any).response) {
        message.error((error as any).response.data.message);
        setErrorMessage((error as any).response.data.message);
      } else {
        // message.error("Register failed");
      }
    }
  };

  return (
    <div className="flex-grow px-6 flex flex-col -mt-14 pt-2">
      <Flex className="h-full flex-grow">
        <div className="pb-12 pt-2 my-auto mx-auto w-full max-w-xl">
          <Link href="/" passHref className="my-auto text-center">
            <h1 className="text-2xl font-semibold tracking-wider flex flex-col">
              <span className="text-secondary-600">CosBaan</span>
              <span className="-mt-2 text-secondary-700">DeawGun</span>
            </h1>
          </Link>
          <RegisterFormCard
            onFinish={onFinish}
            accept={accept}
            setAccept={setAccept}
            errorMessage={errorMessage}
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
export default Register;
