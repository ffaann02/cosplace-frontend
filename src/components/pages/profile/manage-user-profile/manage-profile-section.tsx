import React from "react";
import { userAccountButtons } from "./left-sidebar";
import PersonalInfo from "./section/personal-info";
import { Tabs } from "antd";

interface ManageProfileSectionProps {
  currentMenu: string;
}

const getLabelForMenu = (menu: string) => {
  const allButtons = [...userAccountButtons];
  const button = allButtons.find((btn) => btn.menu === menu);
  return button ? button.label : "Unknown Menu";
};

const ManageProfileSection: React.FC<ManageProfileSectionProps> = ({
  currentMenu,
}) => {
  const label = getLabelForMenu(currentMenu);

  const renderContent = (menu: string) => {
    switch (menu) {
      case "profile":
        return <PersonalInfo />;
      // Add more cases for other menus
      default:
        return <div>Unknown Menu</div>;
    }
  };

  return (
    <div className="px-6 py-4 w-full">
      <h3 className="col-span-full h-fit block md:hidden">จัดการบัญชีของคุณ</h3>
      <div className="block md:hidden">
        <Tabs
          defaultActiveKey={currentMenu}
          onChange={(key) => console.log(key)}
          className="w-full"
        >
          {userAccountButtons.map((btn) => (
            <Tabs.TabPane tab={btn.label} key={btn.menu}>
              {renderContent(btn.menu)}
            </Tabs.TabPane>
          ))}
        </Tabs>
      </div>
      <div className="hidden md:block">
        <h4 className="text-primary-700 text-lg xl:text-xl">
          {label}
        </h4>
        {renderContent(currentMenu)}
      </div>
    </div>
  );
};

export default ManageProfileSection;
