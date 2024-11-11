import { divider } from "@/config/theme";
import { Button, Divider, Form } from "antd";
import ProfileHeader from "../../profile-header";
import Image from "next/image";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import TextArea from "antd/es/input/TextArea";

const SocialProfile = () => {
  const [form] = Form.useForm();
  const [username, setUsername] = useState<string>("test");
  const [displayName, setDisplayName] = useState<string>("test");
  const [hoveringCover, setCoveringHover] = useState<boolean>(false);
  const [editingBio, setEditingBio] = useState<boolean>(false);
  const [bio, setBio] = useState<string>("This is my bio");

  const saveBio = () => {
    form.validateFields(["bio"]).then(() => {
      const bioValue = form.getFieldValue("bio");
      form.setFieldValue("bio", bioValue);
      setBio(bioValue);
      setEditingBio(false);
    });
  };

  const handleEditBio = () => {
    form.setFieldValue("bio", bio);
    setEditingBio(true);
  };

  return (
    <div className="w-full">
      <div className="">
        <Divider style={{ ...divider, marginBottom: 16 }} />
        <Form
          layout="vertical"
          form={form}
          initialValues={{
            bio: bio, // Set bio as initial value for the form
          }}
        >
          <div className="w-full relative bg-primary-50 border border-b-primary-100 rounded-lg pb-4">
            <div className="absolute z-[50] right-1.5 top-1">
              <Button
                size="small"
                onMouseOver={() => setCoveringHover(true)}
                onMouseLeave={() => setCoveringHover(false)}
              >
                เปลี่ยนปก
              </Button>
            </div>
            <Image
              src="https://uploads.dailydot.com/2018/10/olli-the-polite-cat.jpg?auto=compress&fm=pjpg"
              alt="Profile Header"
              width={1920}
              height={172}
              className={`w-full h-[128px] lg:h-[172px] object-cover z-[20] relative rounded-t-lg ${
                hoveringCover ? "opacity-80" : ""
              }`}
            />
            <div className="z-[21] relative ml-4 mr-auto sm:mx-auto cursor-pointer w-fit">
              <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXFajwhtgDi6dBSYXf110K6408BstkJ2Xe23N453vJncFSchmXXqUHuFQpgSGlBEd4_BA&usqp=CAU"
                alt="Profile Header"
                width={124}
                height={124}
                className="w-[124px] h-[124px] object-cover rounded-full border-2 border-white -mt-16 hover:brightness-125 
              transition-all ease-linear duration-300 "
              />
              <div className="absolute z-[50] right-1 bottom-1">
                <button className="w-fit h-fit bg-primary-200 hover:bg-primary-300 border-2 border-white p-1.5 rounded-full">
                  <FaEdit className="text-lg text-primary-600" />
                </button>
              </div>
            </div>
            <div className="text-left sm:text-center tracking-wide px-6 mt-2 w-full">
              <p className="text-2xl text-primary-800">{displayName}</p>
              <p className="text-lg text-primary-400">@{username}</p>
              <div
                className="md:text-md sm:px-0 w-full sm:max-w-[80%] 
        xl:max-w-[60%] mr-auto sm:mx-auto mt-2"
              >
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
                      placeholder="bio..."
                      onChange={(e) => form.setFieldsValue({ bio: e.target.value })}
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
                      >
                        บันทึก
                      </Button>
                    </div>
                  </Form.Item>
                ) : (
                  <div>
                    <p className="text-primary-600 text-sm">
                      {bio || "No bio available"}
                    </p>
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
        </Form>
      </div>
    </div>
  );
};

export default SocialProfile;
