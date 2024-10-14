import { Drawer } from "antd";
import Link from "next/link";

const DrawerSidebar = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const onClose = () => {
    setOpen(false);
  };

  return (
    <Drawer
      title="CosBaanDeawGun"
      placement="left"
      closable={true}
      onClose={onClose}
      open={open}
      key="left"
    >
      <ul className="flex flex-col gap-4 p-6">
        <li>
          <Link href="/" className="text-primary-600 hover:text-primary-800">
            หน้าหลัก
          </Link>
        </li>
        <li>
          <Link
            href="/marketplace" className="text-primary-600 hover:text-primary-800"
          >
            Marketplace
          </Link>
        </li>
        <li>
          <Link href="/friends" className="text-primary-600 hover:text-primary-800">
            เพื่อนและสังคม
          </Link>
        </li>
        <li>
          <Link href="/events" className="text-primary-600 hover:text-primary-800">
            กิจกรรมและงาน
          </Link>
        </li>
      </ul>
    </Drawer>
  );
};

export default DrawerSidebar;
