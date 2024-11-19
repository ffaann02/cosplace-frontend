"use client";
import { divider } from "@/config/theme";
import {
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
  Popconfirm,
  Select,
  Skeleton,
  Upload,
} from "antd";
import React, { useEffect, useState } from "react";
import ImgCrop from "antd-img-crop";
import moment from "moment";
import { apiClient, apiClientWithAuth } from "@/api";
// import { useAuth } from "@/context/auth-context";
import useDeleteConfirm from "@/hooks/use-confirm-modal";
import { useSession } from "next-auth/react";
import { useAuth } from "@/context/auth-context";
import { auth } from "@/libs/auth";

interface FormData {
  username: string;
  first_name: string;
  last_name: string;
  date_of_birth: moment.Moment | null;
  email: string;
  phone_number: string;
  gender: string;
}

const initialFormData: FormData = {
  username: "",
  first_name: "",
  last_name: "",
  date_of_birth: null,
  email: "",
  phone_number: "",
  gender: "",
};

const AccountInfo = () => {
  // const {data: session} = useSession();
  const {user} = useAuth();
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [updating, setUpdating] = useState<boolean>(false);
  const showDeleteConfirm = useDeleteConfirm();

  const [form] = Form.useForm();
  const [defaultFormData, setDefaultFormData] =
    useState<FormData>(initialFormData);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (isFetched) return;
      // const fetchUsername = session?.user?.name;
      const fetchUsername = user?.username;
      try {
        const response = await apiClient.get(`user/${fetchUsername}`);
        const { date_of_birth } = response.data;
        const convertedDate = moment(date_of_birth, "DD-MM-YYYY");

        const userData = {
          ...response.data,
          date_of_birth: convertedDate,
        };
        form.setFieldsValue(userData);
        setDefaultFormData(userData);
        setIsFetched(true);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchUserProfile();
  }, [user]);

  const onSubmit = async () => {
    setUpdating(true);
    try {
      const response = await apiClientWithAuth.put(
        "/user/edit",
        form.getFieldsValue()
      );
      const updatedUserData = response.data.user;
      const convertedDate = moment(updatedUserData.date_of_birth, "YYYY-MM-DD");
      updatedUserData.date_of_birth = convertedDate;
      form.setFieldsValue(updatedUserData);
      setDefaultFormData(updatedUserData);
      setUpdating(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      setUpdating(false);
    }
  };

  const handleSubmitChange = async () => {
    const onCancel = () => {};
    showDeleteConfirm(
      onSubmit,
      onCancel,
      "คุณต้องการเปลี่ยนแปลงข้อมูลใช่หรือไม่?",
      ""
    );
  };

  const onCancelChange = () => {
    form.setFieldsValue(defaultFormData);
  };

  return (
    <div className="w-full">
      <div className="hidden md:block">
        <Divider style={{ ...divider, marginBottom: 16 }} />
      </div>
      {!isFetched ? (
        <div>
          <Skeleton active />
          <Skeleton active style={{marginTop:16}} />
        </div>
      ) : (
        <Form layout="vertical" onFinish={handleSubmitChange} form={form}>
          <div className="w-full flex flex-col md:flex-row">
            <div className="w-full">
              <div className="flex flex-col sm:flex-row gap-x-4">
                <Form.Item
                  name="username"
                  label="ชื่อบัญผู้ใช้ (Username)"
                  style={{ width: "100%" }}
                >
                  <Input placeholder="ชื่อ" size="large" disabled />
                </Form.Item>
              </div>
              <div className="flex flex-col sm:flex-row gap-x-4">
                <Form.Item
                  name="first_name"
                  label="ชื่อจริง (First Name)"
                  style={{ width: "100%" }}
                >
                  <Input
                    name="first_name"
                    placeholder="ชื่อจริง"
                    size="large"
                  />
                </Form.Item>
                <Form.Item
                  name="last_name"
                  label="นามสกุล (Last Name)"
                  style={{ width: "100%" }}
                >
                  <Input name="last_name" placeholder="นามสกุล" size="large" />
                </Form.Item>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-x-4">
            <Form.Item
              name="date_of_birth"
              label="วันเกิด (Date of Birth)"
              style={{ width: "100%" }}
            >
              <DatePicker
                style={{ width: "100%" }}
                size="large"
                name="date_of_birth"
                placeholder="วันเกิด"
                format="YYYY-MM-DD"
              />
            </Form.Item>
            <Form.Item
              name="email"
              label="อีเมล (Email)"
              style={{ width: "100%" }}
            >
              <Input name="email" placeholder="อีเมล" size="large" />
            </Form.Item>
          </div>
          <div className="flex flex-col sm:flex-row gap-x-4">
            <Form.Item
              name="phone_number"
              label="เบอร์โทรศัพท์ (Phone Number)"
              style={{ width: "100%" }}
            >
              <Input
                name="phone_number"
                placeholder="เบอร์โทรศัพท์"
                size="large"
              />
            </Form.Item>
            <Form.Item
              name="gender"
              label="เพศ (Gender)"
              style={{ width: "100%" }}
            >
              <Select
                size="large"
                placeholder="เพศ"
                options={[
                  { label: "ชาย", value: "male" },
                  { label: "หญิง", value: "female" },
                  { label: "อื่นๆ", value: "other" },
                ]}
              />
            </Form.Item>
          </div>
          <div className="flex gap-2">
            <Popconfirm
              title="ต้องการยกเลิกการเปลี่ยนแปลงหรือไม่?"
              onConfirm={onCancelChange}
              onCancel={() => {}}
              okText="ใช่"
              cancelText="ไม่"
            >
              <Button size="large" type="default" loading={updating}>
                ยกเลิก
              </Button>
            </Popconfirm>
            <Form.Item>
              <Button
                htmlType="submit"
                size="large"
                type="primary"
                loading={updating}
              >
                บันทึก
              </Button>
            </Form.Item>
          </div>
        </Form>
      )}
    </div>
  );
};

export default AccountInfo;
