"use client";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space } from "antd";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SearchPeople = ({
  search_query,
}: {
  search_query: string;
}) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const router = useRouter();

  const handleSearch = () => {
    console.log("Searching for:", searchValue);
    // Add your search logic here
    if (searchValue === "") {
      router.push(`/friends`);
    } else {
      router.push(`/friends?search=${searchValue}`);
    }
  };

  return (
    <div className="mb-8 w-full">
      <Space.Compact style={{ width: "100%" }}>
        <Input
          size="large"
          placeholder="ค้นหาผู้คน"
          prefix={<SearchOutlined />}
          style={{ borderTopLeftRadius: 24, borderBottomLeftRadius: 24 }}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onPressEnter={handleSearch}
        />
        <Button type="default" size="large" onClick={handleSearch}>
          ค้นหา
        </Button>
      </Space.Compact>
    </div>
  );
};

export default SearchPeople;
