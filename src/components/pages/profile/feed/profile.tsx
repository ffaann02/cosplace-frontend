import { Profile } from "@/types/profile";
import { eventCardDateFormat, formatDate } from "@/utils/dateformat";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Modal,
  Form,
  Input,
  message,
  UploadProps,
  GetProp,
  Select,
  UploadFile,
  Upload,
  Collapse,
  CollapseProps,
  Carousel,
} from "antd";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { Image as AntImage } from "antd";
import { useAuth } from "@/context/auth-context";
import { apiClient, apiClientWithAuth } from "@/api";
import { Portfolio } from "@/types/portfolios";
import PortfolioCard from "./portfolio-card";
import { CommissionPost } from "@/types/commissions";
import CommissionCard from "./commission-card";
import { useRouter, useSearchParams } from "next/navigation";

const NoFeedContent = ({
  display_name = "ผู้ใช้",
  text = "",
}: {
  display_name?: string | undefined;
  text?: string;
}) => {
  return (
    <div className="w-full flex flex-col items-center">
      <Image
        priority
        unoptimized={true}
        src={"/images/tanuki-commission.png"}
        alt="hero-mascot"
        width={240}
        height={240}
        className="opacity-60"
      />
      <h3 className="text-2xl text-primary-600 mt-6">
        <span className="text-xl mr-2">ไม่มีข้อมูล{text}ในหน้าฟีดของ</span>{" "}
        {display_name}
      </h3>
    </div>
  );
};

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("อัปโหลดเฉพาะไฟล์ JPG/PNG เท่านั้น");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("รูปภาพต้องมีขนาดไม่เกิน 2MB");
  }
  return isJpgOrPng && isLt2M;
};

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const FeedProfile = ({
  profileData,
  interests,
}: {
  profileData: Profile;
  interests?: string[];
}) => {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isPortModalVisible, setIsPortModalVisible] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [selectedPortfolio, setSelectedPortfolio] = useState<Portfolio>(
    {} as Portfolio
  );
  const [commissions, setCommissions] = useState<CommissionPost[]>([]);
  const currentPostType = searchParams.get("post_type") || "";
  const router = useRouter();
  // console.log("Current tab:", currentPostType); 

  const fetchPortfolios = async () => {
    try {
      const response = await apiClient.get("/portfolio/" + profileData.user_id);
      console.log("Portfolios:", response.data);
      setPortfolios(response.data);
    } catch (err) {
      console.error("Error fetching portfolios:", err);
    }
  };

  const fetchCommissions = async () => {
    try {
      const response = await apiClient.get("/custom/" + profileData.user_id);
      console.log("Commissions:", response.data.commissions);
      setCommissions(response.data.commissions);
    } catch (err) {
      console.error("Error fetching commissions:", err);
    }
  };

  useEffect(() => {
    fetchPortfolios();
    fetchCommissions();
  }, []);

  useEffect(() => {
    if (searchParams.get("portfolio_id")) {
      const portfolio_id = searchParams.get("portfolio_id");
      const selected = portfolios.find(
        (portfolio) => portfolio.portfolio_id === portfolio_id
      );
      if (selected) {
        setSelectedPortfolio(selected);
        setIsPortModalVisible(true);
      }
    }
  },[portfolios]);

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "พอร์ตฟอลิโอและผลงานคอสเพลย์",
      children: (
        <div className="space-y-4">
          {portfolios.length > 0 ? (
            portfolios.map((portfolio: Portfolio, index) => (
              <PortfolioCard
                portfolioData={portfolio}
                key={index}
                setIsPortModalVisible={setIsPortModalVisible}
                setSelectedPortfolio={setSelectedPortfolio}
              />
            ))
          ) : (
            <NoFeedContent
              display_name={profileData.display_name}
              text="ผลงาน"
            />
          )}
        </div>
      ),
    },
    {
      key: "2",
      label: "ประกาศจ้างหาทำชุด และอุปกรณ์คอสเพลย์",
      children: (
        <div className="space-y-4 w-full">
          {commissions.length > 0 ? (
            commissions.map((commission: CommissionPost, index) => (
              <CommissionCard commission={commission} />
            ))
          ) : (
            <NoFeedContent
              display_name={profileData.display_name}
              text="ประกาศจ้าง"
            />
          )}
        </div>
      ),
    },
  ];

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>อัปโหลด</div>
    </button>
  );

  const showModal = () => {
    setIsModalVisible(true);
  };

  // Function to close the modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleFormSubmit = async (values: any) => {
    const portfolioData = values;
    console.log("Portfolio data:", portfolioData);
    console.log("File list:", fileList);

    try {
      // Assume you have a user object to fetch the user ID
      const userId = user?.user_id;

      // Prepare the portfolio data with the user ID
      portfolioData.created_by = userId;

      // Make the request to create the portfolio
      const response = await apiClientWithAuth.post(
        "/portfolio/create",
        portfolioData
      );
      console.log("Portfolio created:", response);

      // Upload images
      await Promise.all(
        fileList.map(async (file) => {
          try {
            const image = await getBase64(file.originFileObj as FileType);
            const imageData = {
              portfolio_id: response.data.portfolio_id,
              image_url: image,
            };
            console.log(imageData);

            const imageUploadResponse = await apiClientWithAuth.post(
              "/upload/portfolio-image",
              imageData
            );
            console.log("Image upload response:", imageUploadResponse);
          } catch (err) {
            console.error("Error uploading image:", err);
            message.error("เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ");
          }
        })
      );

      message.success("เพิ่มผลงานเรียบร้อยแล้ว");
      // router.push("/portfolio"); // Redirect to portfolio page
    } catch (err) {
      console.log(err);
      message.error("เกิดข้อผิดพลาดในการเพิ่มผลงาน");
    }
  };

  return (
    <div className="w-full grid grid-cols-8 mt-4 text-primary-800 gap-4 px-4 xl:px-0">
      <div className="col-span-full md:col-span-3 space-y-4">
        <div className="bg-primary-50 pt-2 p-4 drop-shadow-sm border-primary-100 border rounded-lg space-y-3 h-fit">
          <h4 className="font-medium">ข้อมูลผู้ใช้</h4>
          <div className="bg-white/80 text-center px-2 py-1 border border-primary-100 rounded-lg">
            <p>{profileData.bio ? profileData.bio : "ไม่มีคำอธิบาย"}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-x-8">
            <div className="flex text-xl">
              <FaInstagram className="inline-block my-auto" />:
              <span className="ml-2 my-auto">
                {profileData.instagram_url || "-"}
              </span>
            </div>
            <div className="flex text-xl">
              <FaTwitter className="inline-block my-auto" />:
              <span className="ml-2 my-auto">
                {profileData.twitter_url || "-"}
              </span>
            </div>
            <div className="flex text-xl">
              <FaFacebook className="inline-block my-auto" />:
              <span className="ml-2 my-auto">
                {profileData.facebook_url || "-"}
              </span>
            </div>
          </div>
          <p>
            วันเกิด:{" "}
            <span className="ml-1">
              {/* {eventCardDateFormat(profileData.date_of_birth)} */}
            </span>
          </p>
          <p>
            เข้าร่วมเมื่อ:{" "}
            <span className="ml-1">
              {eventCardDateFormat(profileData.created_at)}
            </span>
          </p>
        </div>
        <div className="bg-primary-50 pt-2 px-3 pb-2 drop-shadow-sm border-primary-100 border rounded-lg space-y-3 h-fit">
          <div className="flex justify-between">
            <h4 className="font-medium">พอร์ตโฟลิโอและผลงาน</h4>
            {user?.user_id === profileData.user_id && (
              <Button
                size="small"
                onClick={showModal}
                style={{ marginTop: "auto", marginBottom: "auto" }}
              >
                เพิ่มผลงาน
              </Button>
            )}
          </div>
          <div className="-mt-2">
            {portfolios.length > 0 ? (
              <div className="space-y-2">
                {/* Render portfolios */}
                {portfolios.map((portfolio: Portfolio, index) => (
                  <div
                    key={index}
                    className="flex justify-between pl-3 pr-2 py-2 bg-white rounded-lg border
                  border-primary-100"
                  >
                    <p>{portfolio.title}</p>
                    <Button
                      size="small"
                      onClick={() => {
                        setSelectedPortfolio(portfolio);
                        setIsPortModalVisible(true);
                        const newParams = new URLSearchParams(searchParams);
                        newParams.set("portfolio_id", portfolio.portfolio_id);
                        router.push(`?${newParams.toString()}`);
                      }}
                    >
                      ดูรายละเอียด
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm">ไม่มีลิสต์ผลงาน</div>
            )}
          </div>
        </div>
      </div>
      <div className="col-span-full md:col-span-5 space-y-4">
        <div className="border border-primary-100 px-3 py-2 rounded-md bg-primary-50">
          <h4 className="text-sm font-med">
            สิ่งที่ {profileData.display_name} สนใจ
          </h4>
          <div className="flex flex-wrap">
            {interests?.map((interest, index) => (
              <div
                key={index}
                className="bg-white px-2 py-1 rounded-lg border border-primary-100 m-1"
              >
                {interest}
              </div>
            ))}
          </div>
        </div>
        <Collapse
          defaultActiveKey={
            currentPostType === "portfolio"
              ? ["1"]
              : currentPostType === "commission"
              ? ["2"]
              : undefined
          }
          items={items}
          onChange={(key) => {
            let post_type = "";
            if(key[0] === "1"){
              post_type = "portfolio";
            }
            else if(key[0] === "2"){
              post_type = "commission";
            }
            else{
              post_type = "";
            }
            const newParams = new URLSearchParams(searchParams);
            if (post_type === "") {
              newParams.delete("post_type");
            } else {
              newParams.set("post_type", post_type);
            }
            router.push(`?${newParams.toString()}`);
          }}
        />
      </div>

      {/* Modal for adding portfolio */}
      <Modal
        title="เพิ่มผลงาน"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        style={{ paddingBottom: 0 }}
      >
        <Form form={form} onFinish={handleFormSubmit} layout="vertical">
          <Form.Item
            name="title"
            label="ชื่อผลงาน"
            rules={[{ required: true, message: "กรุณากรอกชื่อผลงาน!" }]}
          >
            <Input placeholder="กรอกชื่อผลงาน" />
          </Form.Item>

          <Form.Item
            name="description"
            label="คำอธิบาย"
            rules={[{ required: true, message: "กรุณากรอกรายละเอียด!" }]}
          >
            <Input.TextArea placeholder="กรอกรายละเอียดเกี่ยวกับผลงาน" />
          </Form.Item>

          <div className="mb-4">
            <h5 className="mb-2">รูปภาพผลงาน</h5>
            <>
              <Upload
                beforeUpload={beforeUpload}
                // action={()=>{}}
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
              >
                {fileList.length >= 5 ? null : uploadButton}
              </Upload>
              {previewImage && (
                <AntImage
                  wrapperStyle={{ display: "none" }}
                  preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
                    afterOpenChange: (visible) =>
                      !visible && setPreviewImage(""),
                  }}
                  src={previewImage}
                />
              )}
            </>
          </div>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              เพิ่มผลงาน
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="รายละเอียดผลงาน"
        visible={isPortModalVisible}
        onCancel={() => {
          setIsPortModalVisible(false);
          const newParams = new URLSearchParams(searchParams);
          newParams.delete("portfolio_id");
          router.push(`?${newParams.toString()}`);
        }}
        footer={null}
        style={{ paddingBottom: 0 }}
      >
        <div className="flex w-full flex-col">
          <h3>{selectedPortfolio.title}</h3>
          <p className="text-primary-600 mb-2">
            {selectedPortfolio.description}
          </p>
          <Carousel arrows infinite={false} autoplay autoplaySpeed={200}>
            {selectedPortfolio?.portfolio_images?.length > 0 &&
              selectedPortfolio.portfolio_images.map((image, index) => (
                <Image
                  key={index}
                  src={image.image_url}
                  alt={selectedPortfolio.title}
                  className="object-cover h-64 w-full rounded-lg"
                  unoptimized
                  width={500}
                  height={200}
                />
              ))}
          </Carousel>
        </div>
      </Modal>
    </div>
  );
};

export default FeedProfile;
