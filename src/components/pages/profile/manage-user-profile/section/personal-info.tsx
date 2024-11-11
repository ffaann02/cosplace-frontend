import { divider } from "@/config/theme";
import {
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
  Popconfirm,
  Select,
  Upload,
} from "antd";
import React, { useEffect, useState } from "react";
import type { GetProp, UploadFile, UploadProps } from "antd";
import ImgCrop from "antd-img-crop";
import moment from "moment";
import { apiClient, apiClientWithAuth } from "@/api";
import { useAuth } from "@/context/auth-context";
import { useInternalMessage } from "antd/es/message/useMessage";
import useDeleteConfirm from "@/hooks/use-confirm-modal";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

interface FormData {
  username: string;
  display_name: string;
  first_name: string;
  last_name: string;
  date_of_birth: moment.Moment | null;
  email: string;
  phone_number: string;
  gender: string;
}

const initialFormData: FormData = {
  username: "",
  display_name: "",
  first_name: "",
  last_name: "",
  date_of_birth: null,
  email: "",
  phone_number: "",
  gender: "",
};

const PersonalInfo = () => {
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [updating, setUpdating] = useState<boolean>(false);
  const showDeleteConfirm = useDeleteConfirm();
  const [profileImageFile, setProfileImageFile] = useState<UploadFile | null>({
    uid: "-1",
    name: "image.png",
    status: "done",
    url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  });

  const [form] = Form.useForm();
  const [defaultFormData, setDefaultFormData] =
    useState<FormData>(initialFormData);

  const { user } = useAuth();
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (isFetched) return;
      const fetchUsername = user?.username;
      try {
        const response = await apiClient.get(`user/${fetchUsername}`);
        const {
          username,
          display_name,
          first_name,
          last_name,
          date_of_birth,
          email,
          phone_number,
          gender,
        } = response.data;
        const convertedDate = moment(date_of_birth, "YYYY-MM-DD");

        const userData = {
          username,
          display_name,
          first_name,
          last_name,
          date_of_birth: convertedDate,
          email,
          phone_number,
          gender,
        };
        form.setFieldsValue(userData);
        setDefaultFormData(userData);
        setIsFetched(true);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    if (user && user.user_id && !isFetched) {
      // fetchUserProfile();
    }
  }, [user]);

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setProfileImageFile(newFileList.length > 0 ? newFileList[0] : null);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as FileType);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const onRemove = () => {
    setProfileImageFile(null);
  };

  const onSubmit = async () => {
    setUpdating(true);
    try {
      const response = await apiClientWithAuth.put("user/edit", form.getFieldsValue());
      const updatedUserData = response.data.user;
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
      <Form layout="vertical" onFinish={handleSubmitChange} form={form}>
        <div className="w-full flex flex-col md:flex-row mb-0 md:mb-4">
          <div
            className="overflow-hidden w-fit h-fit bg-primary-50 border border-primary-200 rounded-xl 
            ml-auto mr-auto mb-4 md:mr-4 md:mb-0 px-3 py-2 flex flex-col items-center"
            style={{ flexShrink: 0 }}
          >
            <ImgCrop rotationSlider>
              <Upload
                name="avatar"
                listType="picture-circle"
                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                fileList={profileImageFile ? [profileImageFile] : []}
                onChange={onChange}
                onPreview={onPreview}
                className="ant-profile-uploader"
              >
                {!profileImageFile && "+ อัปโหลด"}
              </Upload>
            </ImgCrop>
            <div
              className={`mt-2 border-t border-primary-200 pt-2 justify-center ${
                profileImageFile ? "flex" : "hidden"
              } w-full`}
            >
              <Popconfirm
                title="ต้องการลบรูปภาพหรือไม่?"
                onConfirm={onRemove}
                onCancel={() => {}}
                okText="ใช่"
                cancelText="ไม่"
              >
                <Button size="middle" style={{ width: "100%" }}>
                  ลบรูปภาพปัจจุบัน
                </Button>
              </Popconfirm>
            </div>
          </div>
          <div className="w-full">
            <div className="flex flex-col sm:flex-row gap-x-2">
              <Form.Item
                name="username"
                label="ชื่อบัญผู้ใช้ (Username)"
                style={{ width: "100%" }}
              >
                <Input placeholder="ชื่อ" size="large" disabled />
              </Form.Item>
              <Form.Item
                name="display_name"
                label="ชื่อโปรไฟล์ (Display Name)"
                style={{ width: "100%" }}
              >
                <Input placeholder="ชื่อ" size="large" />
              </Form.Item>
            </div>
            <div className="flex flex-col sm:flex-row gap-x-2">
              <Form.Item
                name="first_name"
                label="ชื่อจริง (First Name)"
                style={{ width: "100%" }}
              >
                <Input name="first_name" placeholder="ชื่อจริง" size="large" />
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
        <div className="flex flex-col sm:flex-row gap-x-2">
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
        <div className="flex flex-col sm:flex-row gap-x-2">
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
    </div>
  );
};

export default PersonalInfo;
