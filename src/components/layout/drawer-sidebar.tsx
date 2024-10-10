import { Drawer } from "antd";

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
          <a href="/" className="text-primary-600 hover:text-primary-800">
            หน้าหลัก
          </a>
        </li>
        <li>
          <a
            href="/marketplace"
            className="text-primary-600 hover:text-primary-800"
          >
            Marketplace
          </a>
        </li>
        <li>
          <a href="/friends" className="text-primary-600 hover:text-primary-800">
            เพื่อนและสังคม
          </a>
        </li>
        <li>
          <a href="/events" className="text-primary-600 hover:text-primary-800">
            กิจกรรมและงาน
          </a>
        </li>
      </ul>
    </Drawer>
  );
};

export default DrawerSidebar;
