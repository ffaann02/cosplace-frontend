"use client";
import { useState } from "react";
import { Button, Divider, Dropdown, MenuProps, Tag } from "antd";
import { FaChevronDown } from "react-icons/fa";
import { CloseOutlined } from "@ant-design/icons";
import { useFilter } from "@/context/e-commerce-context";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: "ราคาต่ำ-สูง",
  },
  {
    key: "2",
    label: "ราคาสูง-ต่ำ",
  },
  {
    key: "3",
    label: "ลงขายล่าสุด-เก่าสุด",
  },
  {
    key: "4",
    label: "ลงขายล่าสุด-เก่าสุด",
  },
];

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
  } = useFilter();

  const handleMenuClick = ({ key }: { key: string }) => {
    const selectedItem = items.find((item) => item?.key === key);
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
  
  

  return (
    <>
      <div className="flex justify-between">
        <h3 className="text-primary-800">ผลลัพธ์การค้นหา</h3>
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
      <Divider
        className="bg-secondary-100"
        style={{ marginLeft: 0, marginRight: 0, marginTop: 6, marginBottom: 4 }}
      />

      {/* Display selected filters as tags */}
      <div className="flex flex-wrap gap-2 my-2">
        {selectedCategories.map((category) => (
          <Tag
            key={category}
            closable
            onClose={() => handleTagClose("category", category)}
          >
            {category}
          </Tag>
        ))}
        {selectedConditions.map((condition) => (
          <Tag
            key={condition}
            closable
            onClose={() => handleTagClose("condition", condition)}
          >
            {condition}
          </Tag>
        ))}
        {selectedSizes.map((size) => (
          <Tag
            key={size}
            closable
            onClose={() => handleTagClose("size", size)}
          >
            {size}
          </Tag>
        ))}
        {selectedLocations.map((location) => (
          <Tag
            key={location}
            closable
            onClose={() => handleTagClose("location", location)}
          >
            {location}
          </Tag>
        ))}
      </div>
    </>
  );
};

export default SearchResultHeader;
