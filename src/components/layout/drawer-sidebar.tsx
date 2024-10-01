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
      hello
    </Drawer>
  );
};
export default DrawerSidebar;
