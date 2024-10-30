"use client";
import { useState } from "react";
import { CiFilter } from "react-icons/ci";
import { Checkbox } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { capitalize } from "@/utils/string";
import { categories_th, categories_en, sizes, conditions, locations } from "./filter-bar-options";

const FilterBar = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  const handleCategoryChange = (e: CheckboxChangeEvent) => {
    const value = e.target.value;
    setSelectedCategories((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const handleConditionChange = (e: CheckboxChangeEvent) => {
    const value = e.target.value;
    setSelectedConditions((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const handleSizeChange = (e: CheckboxChangeEvent) => {
    const value = e.target.value;
    setSelectedSizes((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const handleLocationChange = (e: CheckboxChangeEvent) => {
    const value = e.target.value;
    setSelectedLocations((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  return (
    <div className="col-span-2 p-4 border bg-white rounded-lg h-fit">
      <h5 className="flex mb-4">
        <CiFilter className="my-auto mr-2" /> <label>ค้นหาแบบละเอียด</label>
      </h5>
      <div className="flex flex-col gap-y-4">
        <div>
          <h5>หมวดหมู่</h5>
          <div className="flex flex-col gap-y-1 mt-2">
            {categories_th.map((category: string, index) => (
              <Checkbox
                key={index}
                value={categories_en[index]}
                onChange={handleCategoryChange}
                checked={selectedCategories.includes(categories_en[index])}
              >
                {category} ({capitalize(categories_en[index])})
              </Checkbox>
            ))}
          </div>
        </div>
        <div>
          <h5>สภาพ</h5>
          <div className="flex flex-col gap-y-1 mt-2">
            {conditions.map((condition: string, index) => (
              <Checkbox
                key={index}
                value={condition}
                onChange={handleConditionChange}
                checked={selectedConditions.includes(condition)}
              >
                {condition}
              </Checkbox>
            ))}
          </div>
        </div>
        <div>
          <h5>ขนาด</h5>
          <div className="flex flex-col gap-y-1 mt-2">
            {sizes.map((size: string, index) => (
              <Checkbox
                key={index}
                value={size}
                onChange={handleSizeChange}
                checked={selectedSizes.includes(size)}
              >
                {size}
              </Checkbox>
            ))}
          </div>
        </div>
        <div>
          <h5>พื้นที่</h5>
          <div className="flex flex-col gap-y-1 mt-2">
            {locations.map((location: string, index) => (
              <Checkbox
                key={index}
                value={location}
                onChange={handleLocationChange}
                checked={selectedLocations.includes(location)}
              >
                {location}
              </Checkbox>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;