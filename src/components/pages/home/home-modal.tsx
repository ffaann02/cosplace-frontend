"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { Modal, Button } from "antd";
import { apiClientWithAuth } from "@/api";
import { useAuth } from "@/context/auth-context";

const HomeModal = () => {
  const router = useRouter();
  const {user} = useAuth();
  const searchParams = useSearchParams();
  const isFirstLogin = searchParams.get("first_login") === "true";
  const [interestsTopic, setInterestsTopic] = useState<string[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(isFirstLogin);

  const options: string[] = [
    "อนิเมะ",
    "คอสเพลย์",
    "อุปกรณ์และเครื่องประดับ",
    "การถ่ายภาพ",
    "การแต่งหน้าและสไตล์",
    "มังงะ",
    "เกม",
    "วิกและเครื่องแต่งกาย",
    "งานอีเวนต์และคอนเวนชัน",
    "แฟนอาร์ต",
    "บทบาทสมมติ",
    "พากย์เสียง",
    "การออกแบบตัวละคร",
    "ดนตรีและเพลงประกอบ",
    "การสตรีม",
    "เวิร์กชอป",
    "ทำเครื่องแต่งกายเอง",
    "เอฟเฟกต์แสงและภาพ",
    "ของสะสมและฟิกเกอร์",
    "โลกแฟนตาซี",
    "นิยายวิทยาศาสตร์",
    "เครื่องแต่งกายยุคประวัติศาสตร์",
    "ศิลปะการต่อสู้และการต่อสู้",
    "อาวุธแฟนตาซี",
    "เวทมนตร์และคาถา",
    "สยองขวัญ",
    "สตีมพังค์",
    "เคป็อปและเจป็อป",
  ];

  const handleSelect = (option: string) => {
    if (interestsTopic.includes(option)) {
      setInterestsTopic(interestsTopic.filter((item) => item !== option));
    } else {
      setInterestsTopic([...interestsTopic, option]);
    }
  };

  const handleFinish = async () => {
    try {
      const response = await apiClientWithAuth.post("/profile/add-interests", {
        interests: interestsTopic,
        user_id: user?.user_id,
      });
      console.log(response.data);
    } catch(err){
        console.log(err)
    }
    setIsModalVisible(false);
    router.push("/");
  };

  return (
    <div>
      <Modal
        title="เลือกหัวข้อที่คุณสนใจ"
        visible={isModalVisible}
        footer={
          <Button type="primary" onClick={handleFinish}>
            เสร็จสิ้น
          </Button>
        }
        closable={false}
      >
        <div className="flex flex-wrap gap-2">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              className={`px-4 py-2 rounded-md ${
                interestsTopic.includes(option)
                  ? "border-2 border-primary-400"
                  : "border border-gray-300"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default HomeModal;
