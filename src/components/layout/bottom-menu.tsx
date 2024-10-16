import {
  FaHome,
  FaShoppingBag,
  FaUserFriends,
} from "react-icons/fa";
import { IoCalendar } from "react-icons/io5";
import Link from "next/link";

const BottomMenu = () => {
  return (
    <div className= "bg-primary-100 lg:hidden fixed z-[100] bottom-0 w-full border-t grid grid-cols-4 items-center pt-2.5 pb-2">
      <button className="text-primary-600">
        <div className="w-full flex flex-col hover:text-primary-800">
          <Link href="/">
            <FaHome className="mx-auto text-2xl mb-0.5" />
            <label className="text-sm mt-auto mb-0">หน้าหลัก</label>
          </Link>
        </div>
      </button>
      <button className="text-primary-600">
        <div className="w-full flex flex-col hover:text-primary-800">
          <Link href="/marketplace">
            <FaShoppingBag className="mx-auto text-2xl mb-1" />
            <label className="text-sm mt-auto mb-0">Marketplace</label>
          </Link>
        </div>
      </button>
      <button className="text-primary-600">
        <div className="w-full flex flex-col hover:text-primary-800">
          <Link href="/friends">
            <FaUserFriends className="mx-auto text-2xl mb-1" />
            <label className="text-sm mt-auto mb-0">เพื่อนและสังคม</label>
          </Link>
        </div>
      </button>
      <button className="text-primary-600">
        <div className="w-full flex flex-col hover:text-primary-800">
          <Link href="/events">
            <IoCalendar className="mx-auto text-2xl mb-1" />
            <label className="text-sm mt-auto mb-0">กิจกรรม</label>
          </Link>
        </div>
      </button>
    </div>
  );
};
export default BottomMenu;
