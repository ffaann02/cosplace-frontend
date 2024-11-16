import { useEffect, useState } from "react";
import {
  Button,
  Divider,
  Form,
  Input,
  Skeleton,
  Spin,
  Upload,
} from "antd";
import { FaEdit } from "react-icons/fa";
import TextArea from "antd/es/input/TextArea";
import Image from "next/image";
import usePreviewImage from "@/hooks/use-preview-image";
import ImgCrop from "antd-img-crop";
import { LoadingOutlined } from "@ant-design/icons";
import { apiClient, apiClientWithAuth } from "@/api";
import { useAuth } from "@/context/auth-context";

const SocialProfile = () => {
  const { user } = useAuth();
  const [form] = Form.useForm();
  const { openPreview, PreviewImageModal } = usePreviewImage();
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [hoveringCover, setCoveringHover] = useState<boolean>(false);
  const [editingBio, setEditingBio] = useState<boolean>(false);
  const [bio, setBio] = useState<string>("");
  const [coverImageUrl, setCoverImageUrl] = useState<string>("");
  const [profileImageUrl, setProfileImageUrl] = useState<string>("");
  const [uploadingCoverImage, setUploadingCoverImage] =
    useState<boolean>(false);
  const [uploadingProfileImage, setUploadingProfileImage] =
    useState<boolean>(false);
  const [updatingProfileInfo, setUpdatingProfileInfo] = useState<boolean>(false);
  const [editingDisplayName, setEditingDisplayName] = useState<boolean>(false);
  const [displayName, setDisplayName] = useState<string>("");


  useEffect(() => {
    const fetchUserProfile = async () => {
      if (isFetched) return;
      const userId = user?.user_id;
      try {
        const response = await apiClient.get(`/profile/${userId}`);
        const profileData = response.data;
        setDisplayName(profileData.display_name);
        setBio(profileData.bio);
        form.setFieldsValue(profileData);
        setProfileImageUrl(profileData.profile_image_url);
        setCoverImageUrl(profileData.cover_image_url);
        setIsFetched(true);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    if (user && user.user_id && !isFetched) {
      fetchUserProfile();
    }
  }, [user]);

  const saveDisplayName = async () => {
    form.validateFields(["display_name"]).then(async () => {
      const displayNameValue = form.getFieldValue("display_name");
      form.setFieldValue("display_name", displayNameValue);
      try {
        setUpdatingProfileInfo(true);
        const response = await apiClientWithAuth.post("/profile/display-name", {
          user_id: user?.user_id,
          display_name: displayNameValue,
        });
        setDisplayName(displayNameValue);
        setUpdatingProfileInfo(false);
        setEditingDisplayName(false);
      } catch (error) {
        console.error("Error saving displayName:", error);
      }
    });
  };

  const saveBio = async () => {
    form.validateFields(["bio"]).then(async () => {
      const bioValue = form.getFieldValue("bio");
      form.setFieldValue("bio", bioValue);
      try {
        setUpdatingProfileInfo(true);
        const response = await apiClientWithAuth.post("/profile/bio", {
          user_id: user?.user_id,
          bio: bioValue,
        });
        console.log("Response from saving bio:", response);
        setBio(bioValue);
        setUpdatingProfileInfo(false);
        setEditingBio(false);
      }
      catch (error) {
        console.error("Error saving bio:", error);
      }
    });
  };

  const handleEditDisplayName = () => {
    form.setFieldValue("display_name", displayName);
    setEditingDisplayName(true);
  };


  const handleEditBio = () => {
    form.setFieldValue("bio", bio);
    setEditingBio(true);
  };

  const handleOpenPreviewImage = (image_url: string) => {
    openPreview(image_url);
  };

  const handleUploadProfile = async (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result as string;
      try {
        setUploadingProfileImage(true);
        const response = await apiClientWithAuth.post("/upload/profile-image", {
          user_id: user?.user_id,
          image: base64Image,
        });
        const image_url = response.data.image_url;
        setProfileImageUrl(image_url);
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setUploadingProfileImage(false);
      }
    };
  };

  const handleUploadCover = async (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result as string;
      console.log("base64Image", base64Image);
      try {
        setUploadingCoverImage(true);
        const response = await apiClientWithAuth.post("/upload/cover-image", {
          user_id: user?.user_id,
          image: base64Image,
        });
        console.log(response);
        const image_url = response.data.image_url;
        setCoverImageUrl(image_url);
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setUploadingCoverImage(false);
      }
    };
  };

  return (
    <div className="w-full">
      <div className="">
        <Divider style={{ marginBottom: 16 }} />
        {
          !isFetched ?
            <div className="w-full flex flex-col justify-center mt-6">
              <Skeleton.Avatar active size="large" shape="circle" style={{
                width: 124,
                height: 124,
                margin: "auto",
                display: "block"
              }} />
              <Skeleton active style={{ marginTop: 16 }} />
            </div>
            :
            <Form
              layout="vertical"
              form={form}
              initialValues={{
                bio: bio, // Set bio as initial value for the form
              }}
            >
              <div className="w-full relative bg-primary-50 border border-b-primary-100 rounded-lg pb-4">
                <div className="absolute z-[50] right-1.5 top-1">
                  <ImgCrop aspect={4 / 0.8} rotationSlider modalTitle="หน้าปก">
                    <Upload
                      accept=".png, .jpg, .jpeg"
                      beforeUpload={handleUploadCover}
                    >
                      <Button
                        size="small"
                        onMouseOver={() => setCoveringHover(true)}
                        onMouseLeave={() => setCoveringHover(false)}
                      >
                        เปลี่ยนปก
                      </Button>
                    </Upload>
                  </ImgCrop>
                </div>
                <PreviewImageModal />
                {uploadingCoverImage ? (
                  <div className="w-full h-[128px] lg:h-[172px] uploading-cover">
                    <svg
                      className="animate-spin h-5 w-5 mr-3"
                      viewBox="0 0 24 24"
                    ></svg>
                  </div>
                ) : (
                  <Image
                    src={
                      coverImageUrl ||
                      "https://uploads.dailydot.com/2018/10/olli-the-polite-cat.jpg?auto=compress&fm=pjpg"
                    }
                    alt="Cover"
                    width={1920}
                    height={172}
                    onClick={() => handleOpenPreviewImage(coverImageUrl)}
                    className={`w-full h-[128px] lg:h-[172px] object-cover z-[20] relative rounded-t-lg cursor-pointer ${hoveringCover ? "opacity-80" : ""
                      } hover:brightness-125 transition-all ease-linear duration-300 `}
                  />
                )}
                <div className="z-[21] w-[124px] h-[124px] relative ml-4 mr-auto sm:mx-auto cursor-pointer">
                  <Image
                    src={
                      profileImageUrl ||
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXFajwhtgDi6dBSYXf110K6408BstkJ2Xe23N453vJncFSchmXXqUHuFQpgSGlBEd4_BA&usqp=CAU"
                    }
                    alt="Profile"
                    width={124}
                    height={124}
                    className="object-cover rounded-full border-2 border-white -mt-16 hover:brightness-125 
              transition-all ease-linear duration-300"
                    onClick={() => handleOpenPreviewImage(profileImageUrl)}
                  />
                  {uploadingProfileImage && (
                    <div className="flex justify-center items-center absolute inset-0">
                      <Spin
                        indicator={
                          <LoadingOutlined
                            spin
                            style={{
                              fontSize: 48,
                              color: "white",
                            }}
                          />
                        }
                      />
                    </div>
                  )}
                  <div className="absolute z-[50] right-1 bottom-1">
                    <ImgCrop aspect={1} modalTitle="โปรไฟล์" rotationSlider>
                      <Upload
                        accept=".png, .jpg, .jpeg"
                        beforeUpload={handleUploadProfile}
                      >
                        <button className="w-fit h-fit bg-primary-200 hover:bg-primary-300 border-2 border-white p-1.5 rounded-full">
                          <FaEdit className="text-lg text-primary-600" />
                        </button>
                      </Upload>
                    </ImgCrop>
                  </div>
                </div>
                <div className="text-left sm:text-center tracking-wide px-6 mt-2 w-full">
                  <div className="md:text-md sm:px-0 w-full sm:max-w-[80%] xl:max-w-[40%] mr-auto sm:mx-auto mt-2">
                    {editingDisplayName ? (
                      <Form.Item name="display_name" style={{
                        marginBottom:-2
                      }}>
                        <Input
                          size="large"
                          style={{
                            width: "100%",
                            backgroundColor: "white",
                            border: "1px solid #ecdcbc",
                          }}
                          defaultValue={displayName}
                          showCount
                          maxLength={50}
                          placeholder="ชื่อสำหรับโซเชียล"
                          onChange={(e) =>
                            form.setFieldsValue({ display_name: e.target.value })
                          }
                        />
                        <div className="justify-start flex gap-x-1">
                          <Button
                            size="small"
                            className="mt-2"
                            onClick={() => setEditingDisplayName(false)}
                          >
                            ยกเลิก
                          </Button>
                          <Button
                            type="primary"
                            size="small"
                            className="mt-2"
                            onClick={saveDisplayName}
                            loading={updatingProfileInfo}
                          >
                            บันทึก
                          </Button>
                        </div>
                      </Form.Item>
                    ) : (
                      <div className="flex gap-x-2 justify-start md:justify-center">
                        <p className="text-primary-600 text-xl">{displayName || "-"}</p>
                        <button
                          className="my-auto"
                          onClick={handleEditDisplayName}
                        >
                          {displayName ? <FaEdit className="my-auto"/> : "เพิ่มชื่อแสดง"}
                        </button>
                      </div>
                    )}
                  </div>

                  <p className="text-md text-primary-400">@{user?.username}</p>
                  <div className="md:text-md sm:px-0 w-full sm:max-w-[80%] xl:max-w-[60%] mr-auto sm:mx-auto mt-2">
                    {editingBio ? (
                      <Form.Item name="bio">
                        <TextArea
                          style={{
                            width: "100%",
                            backgroundColor: "white",
                            border: "1px solid #ecdcbc",
                          }}
                          defaultValue={bio}
                          autoSize
                          showCount
                          maxLength={200}
                          placeholder="เขียนคำอธิบายโปรไฟล์ของคุณ"
                          onChange={(e) =>
                            form.setFieldsValue({ bio: e.target.value })
                          }
                        />
                        <div className="justify-start flex gap-x-1">
                          <Button
                            size="small"
                            className="mt-2"
                            onClick={() => setEditingBio(false)}
                          >
                            ยกเลิก
                          </Button>
                          <Button
                            type="primary"
                            size="small"
                            className="mt-2"
                            onClick={saveBio}
                            loading={updatingProfileInfo}
                          >
                            บันทึก
                          </Button>
                        </div>
                      </Form.Item>
                    ) : (
                      <div>
                        <p className="text-primary-600 text-sm">{bio || "-"}</p>
                        <Button
                          size="small"
                          className="mt-2"
                          onClick={handleEditBio}
                        >
                          {bio ? "แก้ไขคำอธิบาย" : "เพิ่มคำอธิบาย"}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Form>}
      </div>
    </div>
  );
};

export default SocialProfile;
