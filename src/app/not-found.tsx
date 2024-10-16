import { roundedButton } from "@/config/theme";
import { Button } from "antd";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="pt-16 flex-grow pb-16 px-6 flex flex-col bg-gradient-to-br from-white to-secondary-50">
      <div className="m-auto text-primary-800">
        <h1 className="text-[10rem] -mb-4 text-center">404</h1>
        <h2 className="text-4xl text-center mb-2">ไม่พบหน้านี้ในเว็บไซต์</h2>
        <p className="text-xl text-center text-primary-600">
          หากท่านคิดว่านี่คือปัญหาของระบบ กรุณาติดต่อเจ้าหน้าที่
        </p>
        <div className="flex justify-center mt-6">
          <Link href="/" passHref>
            <Button style={roundedButton} type="primary" size="large">
              กลับสู่หน้าหลัก
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default NotFound;
