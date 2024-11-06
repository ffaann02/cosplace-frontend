import React from "react";
import { userAccountButtons, shopAccountButtons } from "./left-sidebar";
import PersonalInfo from "./personal-info";

interface ManageProfileSectionProps {
  currentMenu: string;
}

const getLabelForMenu = (menu: string) => {
  const allButtons = [...userAccountButtons, ...shopAccountButtons];
  const button = allButtons.find((btn) => btn.menu === menu);
  return button ? button.label : "Unknown Menu";
};

const ManageProfileSection: React.FC<ManageProfileSectionProps> = ({
  currentMenu,
}) => {
  const label = getLabelForMenu(currentMenu);

  return (
    <div className="col-span-2 px-4 w-full">
      <h4 className="text-primary-800 mt-1 mb-7">{label}</h4>
      {currentMenu === "profile" && <PersonalInfo />}
    </div>
  );
};

export default ManageProfileSection;
