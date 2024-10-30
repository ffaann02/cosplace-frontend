"use client";
import { useState } from "react";
import {
  Button,
  Divider,
  Dropdown,
  MenuProps,
  Tabs,
  TabsProps,
  Tag,
} from "antd";
import { FaChevronDown } from "react-icons/fa";
import { CloseOutlined } from "@ant-design/icons";
import { useFilter } from "@/context/e-commerce-context";
import { CiFilter } from "react-icons/ci";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: "ราคาสูง-ต่ำ",
  },
  {
    key: "2",
    label: "ราคาต่ำ-สูง",
  },
  {
    key: "3",
    label: "ลงขายล่าสุด",
  },
];

const itemsTab: TabsProps["items"] = [
  {
    key: "1",
    label: "ราคาสูง-ต่ำ",
  },
  {
    key: "2",
    label: "ราคาต่ำ-สูง",
  },
  {
    key: "3",
    label: "ลงขายล่าสุด",
  },
];

const TagStyle = {
  backgroundColor: "white",
  fontSize: 14,
  paddingTop: 4,
  paddingBottom: 4,
  paddingLeft: 8,
  paddingRight: 8,
};

const SearchResultHeader = () => {
  const [selectedSort, setSelectedSort] = useState("ลงขายล่าสุด-เก่าสุด");
  const [hoverSort, setHoverSort] = useState(false);
  const {
    selectedCategories,
    setSelectedCategories,
    selectedConditions,
    setSelectedConditions,
    selectedSizes,
    setSelectedSizes,
    selectedLocations,
    setSelectedLocations,
    openFilterDrawerMobile,
    setOpenFilterDrawerMobile,
  } = useFilter();

  const handleMenuClick = ({ key }: { key: string }) => {
    const selectedItem = items.find((item) => item?.key === key);
    if (selectedItem && "label" in selectedItem) {
      setSelectedSort(selectedItem.label as string);
    }
  };

  const handleTabChange = (key: string) => {
    const selectedItem = itemsTab.find((item) => item?.key === key);
    if (selectedItem && "label" in selectedItem) {
      setSelectedSort(selectedItem.label as string);
    }
  };

  // Remove filter from selected categories, conditions, sizes, or locations
  const handleTagClose = (type: string, value: string) => {
    switch (type) {
      case "category":
        setSelectedCategories(((prev: string[]) =>
          prev.filter((item) => item !== value)) as unknown as string[]);
        break;
      case "condition":
        setSelectedConditions(((prev: string[]) =>
          prev.filter((item) => item !== value)) as unknown as string[]);
        break;
      case "size":
        setSelectedSizes(((prev: string[]) =>
          prev.filter((item) => item !== value)) as unknown as string[]);
        break;
      case "location":
        setSelectedLocations(((prev: string[]) =>
          prev.filter((item) => item !== value)) as unknown as string[]);
        break;
      default:
        break;
    }
  };

  const handleOpenFilterDrawerMobile = () => {
    setOpenFilterDrawerMobile(!openFilterDrawerMobile);
  };

  return (
    <>
      <div className="lg:flex lg:justify-between">
        <div className="flex justify-between">
          <h3 className="text-primary-800">ผลลัพธ์การค้นหา</h3>
          <div
            className="flex text-secondary-700 lg:hidden cursor-pointer"
            onClick={handleOpenFilterDrawerMobile}
          >
            <CiFilter className="my-auto mr-1 text-xl" />
            <label className="my-auto text-sm">ตัวกรอง</label>
          </div>
        </div>
        <div className="hidden lg:block">
          <Dropdown
            onOpenChange={(open) => setHoverSort(open)}
            menu={{
              items,
              onClick: handleMenuClick,
            }}
            placement="bottomRight"
            arrow
          >
            <Button type="text">
              เรียงโดย: {selectedSort}{" "}
              <FaChevronDown
                className={`${
                  hoverSort ? "rotate-180" : "rotate-0"
                } transition-transform duration-200`}
              />
            </Button>
          </Dropdown>
        </div>
        <div className="block lg:hidden">
          <Tabs
            defaultActiveKey="1"
            items={itemsTab}
            onChange={handleTabChange}
          />
        </div>
      </div>
      <div className="hidden lg:block">
        <Divider
          className="bg-secondary-100"
          style={{
            marginLeft: 0,
            marginRight: 0,
            marginTop: 6,
            marginBottom: 4,
          }}
        />
      </div>

      {/* Display selected filters as tags */}
      <div className="flex flex-wrap gap-2 lg:mt-2 mb-2">
        {selectedCategories.map((category) => (
          <Tag
            key={category}
            closable
            onClose={() => handleTagClose("category", category)}
            style={TagStyle}
          >
            {category}
          </Tag>
        ))}
        {selectedConditions.map((condition) => (
          <Tag
            key={condition}
            closable
            onClose={() => handleTagClose("condition", condition)}
            style={TagStyle}
          >
            {condition}
          </Tag>
        ))}
        {selectedSizes.map((size) => (
          <Tag
            key={size}
            closable
            onClose={() => handleTagClose("size", size)}
            style={TagStyle}
          >
            {size}
          </Tag>
        ))}
        {selectedLocations.map((location) => (
          <Tag
            key={location}
            closable
            onClose={() => handleTagClose("location", location)}
            style={TagStyle}
          >
            {location}
          </Tag>
        ))}
      </div>
    </>
  );
};

export default SearchResultHeader;
