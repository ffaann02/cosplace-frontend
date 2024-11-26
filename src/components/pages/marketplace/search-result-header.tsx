"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  AutoComplete,
  Button,
  Divider,
  Dropdown,
  Input,
  MenuProps,
  Space,
  Tabs,
  TabsProps,
  Tag,
} from "antd";
import { FaChevronDown, FaSearch } from "react-icons/fa";
import { CloseOutlined } from "@ant-design/icons";
import { CiFilter } from "react-icons/ci";

const items: MenuProps["items"] = [
  { key: "1", label: "ราคาสูง-ต่ำ" },
  { key: "2", label: "ราคาต่ำ-สูง" },
  { key: "3", label: "ลงขายล่าสุด" },
];

const itemsTab: TabsProps["items"] = [
  { key: "1", label: "ราคาสูง-ต่ำ" },
  { key: "2", label: "ราคาต่ำ-สูง" },
  { key: "3", label: "ลงขายล่าสุด" },
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
  const searchParams = useSearchParams();
  const router = useRouter();

  const [hoverSort, setHoverSort] = useState(false);
  const [selectedSort, setSelectedSort] = useState(
    searchParams.get("sort") || "ราคาสูง-ต่ำ"
  );
  const [selectedFilters, setSelectedFilters] = useState({
    categories: searchParams.getAll("category"),
    conditions: searchParams.getAll("condition"),
    sizes: searchParams.getAll("size"),
    locations: searchParams.getAll("location"),
  });
  const searchValue = searchParams.get("search") || "";

  useEffect(() => {
    // Sync state with URL params on load
    setSelectedSort(searchParams.get("sort") || "ราคาสูง-ต่ำ");
    setSelectedFilters({
      categories: searchParams.getAll("category"),
      conditions: searchParams.getAll("condition"),
      sizes: searchParams.getAll("size"),
      locations: searchParams.getAll("location"),
    });
  }, [searchParams]);

  const updateURLParams = async (key: string, value: string | string[]) => {
    const currentParams = new URLSearchParams(searchParams.toString());

    if (Array.isArray(value)) {
      currentParams.delete(key);
      value.forEach((v) => currentParams.append(key, v));
    } else {
      currentParams.set(key, value);
    }

    router.push(`?${currentParams.toString()}`);
  };

  const handleMenuClick = ({ key }: { key: string }) => {
    const selectedItem = items.find((item) => item?.key === key);
    if (selectedItem && "label" in selectedItem) {
      setSelectedSort(selectedItem.label as string);
      updateURLParams("sort", selectedItem.label as string);
    }
  };

  const handleTabChange = (key: string) => {
    const selectedItem = itemsTab.find((item) => item?.key === key);
    if (selectedItem && "label" in selectedItem) {
      setSelectedSort(selectedItem.label as string);
      updateURLParams("sort", selectedItem.label as string);
    }
  };

  const handleTagClose = (
    type: keyof typeof selectedFilters,
    value: string
  ) => {
    const updatedFilters = { ...selectedFilters };
    updatedFilters[type] = updatedFilters[type].filter(
      (item) => item !== value
    );
    setSelectedFilters(updatedFilters);
    updateURLParams(type, updatedFilters[type]);
  };

  const handleSearch = (value: string) => {
    const currentParams = new URLSearchParams(searchParams.toString());
  
    console.log("Current URL Parameters:", decodeURIComponent(currentParams.toString()));
  };

  return (
    <>
      <div className="lg:flex lg:justify-between">
        <div className="w-full my-auto relative mb-2 mr-2">
          {/* <AutoComplete
            options={searchValue ? [{ value: searchValue }] : []}
            onSearch={handleSearch}
            onSelect={(value) => updateURLParams("search", value)}
            onFocus={() => updateURLParams("search", "")}
            style={{ width: "100%" }}
          > */}
          <Space.Compact className="w-full">
            <Input
              size="large"
              placeholder="ค้นหาชุด, ชื่อตัวละคร, ของตกแต่ง"
              style={{
                borderRadius: 16,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              }}
              onPressEnter={(e) =>
                updateURLParams(
                  "search",
                  (e.target as HTMLInputElement).value
                ).then(() => handleSearch(searchValue))
              }
              prefix={<FaSearch />}
            />
            <Button
              size="large"
              type="default"
              onClick={() =>
                updateURLParams("search", searchValue).then(() =>
                  handleSearch(searchValue)
                )
              }
            >
              ค้นหา
            </Button>
          </Space.Compact>
          {/* </AutoComplete> */}
        </div>
        {/* <div className="flex justify-between">
          <h3 className="text-primary-800 flex">
            ผลลัพธ์การค้นหา
            <label className="text-secondary-600 font-light ml-2">
              {searchParams.get("search") && `'${searchParams.get("search")}'`}
            </label>
          </h3>
        </div> */}
        <div className="hidden lg:block my-auto">
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
        <div className="block lg:hidden my-auto">
          <Tabs
            defaultActiveKey="1"
            items={itemsTab}
            onChange={handleTabChange}
          />
        </div>
      </div>
      <div className="hidden lg:block">
        {/* <Divider
          className="bg-secondary-100"
          style={{
            marginLeft: 0,
            marginRight: 0,
            marginTop: 6,
            marginBottom: 4,
          }}
        /> */}
      </div>

      {/* Display selected filters as tags */}
      <div className="flex flex-wrap gap-2 lg:mt-2 mb-2">
        {selectedFilters.categories.map((category) => (
          <Tag
            key={category}
            closable
            onClose={() => handleTagClose("categories", category)}
            style={TagStyle}
          >
            {category}
          </Tag>
        ))}
        {selectedFilters.conditions.map((condition) => (
          <Tag
            key={condition}
            closable
            onClose={() => handleTagClose("conditions", condition)}
            style={TagStyle}
          >
            {condition}
          </Tag>
        ))}
        {selectedFilters.sizes.map((size) => (
          <Tag
            key={size}
            closable
            onClose={() => handleTagClose("sizes", size)}
            style={TagStyle}
          >
            {size}
          </Tag>
        ))}
        {selectedFilters.locations.map((location) => (
          <Tag
            key={location}
            closable
            onClose={() => handleTagClose("locations", location)}
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
