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
import { formatDate } from "@/utils/dateformat";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

interface FormData {
  username: string;
  displayName: string;
  firstName: string;
  lastName: string;
  dateOfBirth: moment.Moment | null;
  email: string;
  phoneNumber: string;
  gender: string;
}

const PersonalInfo = () => {
  const [profileImageFile, setProfileImageFile] = useState<UploadFile | null>({
    uid: "-1",
    name: "image.png",
    status: "done",
    url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  });

  const [formData, setFormData] = useState<FormData>({
    username: "",
    displayName: "",
    firstName: "",
    lastName: "",
    dateOfBirth: null,
    email: "",
    phoneNumber: "",
    gender: "",
  });

  const { user } = useAuth();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const fetchUsername = user?.username;
      try {
        const response = await apiClient.get(`user/${fetchUsername}`);
        const {
          username,
          display_name: displayName,
          first_name: firstName,
          last_name: lastName,
          date_of_birth: dateOfBirth,
          email,
          phone_number: phoneNumber,
          gender,
        } = response.data;
        const convertedDate = moment(dateOfBirth, "YYYY-MM-DD");
        setFormData({
          username,
          displayName,
          firstName,
          lastName,
          dateOfBirth: convertedDate,
          email,
          phoneNumber,
          gender,
        });
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    if (user && user.user_id && !formData.username) {
      fetchUserProfile();
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDateChange = (date: moment.Moment | null) => {
    setFormData((prevData) => ({ ...prevData, dateOfBirth: date }));
  };

  const handleGenderChange = (value: string) => {
    setFormData((prevData) => ({ ...prevData, gender: value }));
  };

  const onRemove = () => {
    setProfileImageFile(null);
  };

  return (
    <div className="w-full">
      <div className="hidden md:block">
        <Divider style={{ ...divider, marginBottom: 16 }} />
      </div>
      <Form
        layout="vertical"
        onFinish={() => {
          console.log("Form data:", formData);
        }}
      >
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
                label="ชื่อบัญผู้ใช้ (Username)"
                style={{ width: "100%" }}
              >
                <Input
                  placeholder="ชื่อ"
                  value={formData.username}
                  size="large"
                  disabled
                />
              </Form.Item>
              <Form.Item
                label="ชื่อโปรไฟล์ (Display Name)"
                style={{ width: "100%" }}
              >
                <Input
                  placeholder="ชื่อ"
                  value={formData.displayName}
                  size="large"
                  onChange={handleInputChange}
                />
              </Form.Item>
            </div>
            <div className="flex flex-col sm:flex-row gap-x-2">
              <Form.Item
                label="ชื่อจริง (First Name)"
                style={{ width: "100%" }}
              >
                <Input
                  name="firstName"
                  placeholder="ชื่อจริง"
                  value={formData.firstName}
                  size="large"
                  onChange={handleInputChange}
                />
              </Form.Item>
              <Form.Item label="นามสกุล (Last Name)" style={{ width: "100%" }}>
                <Input
                  name="lastName"
                  placeholder="นามสกุล"
                  value={formData.lastName}
                  size="large"
                  onChange={handleInputChange}
                />
              </Form.Item>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-x-2">
          <Form.Item label="วันเกิด (Date of Birth)" style={{ width: "100%" }}>
            <DatePicker
              style={{ width: "100%" }}
              size="large"
              placeholder="วันเกิด"
              format="YYYY-MM-DD"
              value={formData.dateOfBirth}
              onChange={handleDateChange}
            />
          </Form.Item>
          <Form.Item label="อีเมล (Email)" style={{ width: "100%" }}>
            <Input
              name="email"
              placeholder="อีเมล"
              value={formData.email}
              size="large"
              onChange={handleInputChange}
            />
          </Form.Item>
        </div>
        <div className="flex flex-col sm:flex-row gap-x-2">
          <Form.Item
            label="เบอร์โทรศัพท์ (Phone Number)"
            style={{ width: "100%" }}
          >
            <Input
              name="phoneNumber"
              placeholder="เบอร์โทรศัพท์"
              value={formData.phoneNumber}
              size="large"
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="เพศ (Gender)" style={{ width: "100%" }}>
            <Select
              size="large"
              placeholder="เพศ"
              value={formData.gender}
              onChange={handleGenderChange}
              options={[
                { label: "ชาย", value: "male" },
                { label: "หญิง", value: "female" },
                { label: "อื่นๆ", value: "other" },
              ]}
            />
          </Form.Item>
        </div>
        <div className="flex gap-2">
          <Button size="large" type="default">
            ยกเลิก
          </Button>
          <Form.Item>
            <Button htmlType="submit" size="large" type="primary">
              บันทึก
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default PersonalInfo;
