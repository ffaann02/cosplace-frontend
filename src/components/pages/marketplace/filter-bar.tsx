"use client";
import { Checkbox, Divider } from "antd";
import { CiFilter } from "react-icons/ci";
import { capitalize } from "@/utils/string";
import {
  categories_th,
  categories_en,
  sizes,
  conditions,
  locations,
} from "./filter-bar-options";
import { useFilter } from "@/context/e-commerce-context";
import FilterBarMobile from "./filter-bar-mobile";
import { divider } from "@/config/theme";

const FilterBar = () => {
  const {
    selectedCategories,
    handleCategoryChange,
    selectedConditions,
    handleConditionChange,
    selectedSizes,
    handleSizeChange,
    selectedLocations,
    handleLocationChange,
  } = useFilter();

  return (
    <div className="col-span-2 p-4 border border-primary-200 bg-white rounded-lg h-fit hidden lg:block">
      <h5 className="flex mb-4">
        <CiFilter className="my-auto mr-2" /> <label>ค้นหาแบบละเอียด</label>
      </h5>
      <div className="flex flex-col gap-y-4">
        <div>
          <h5 className="text-primary-700">หมวดหมู่</h5>
          <Divider
            className="bg-secondary-100"
            style={divider}
          />
          <div className="flex flex-col gap-y-1 mt-2">
            {categories_th.map((category: string, index) => (
              <Checkbox
                key={index}
                value={categories_th[index]}
                onChange={handleCategoryChange}
                checked={selectedCategories.includes(categories_th[index])}
              >
                {category} ({capitalize(categories_en[index])})
              </Checkbox>
            ))}
          </div>
        </div>
        <div>
          <h5 className="text-primary-700">สภาพ</h5>
          <Divider
            className="bg-secondary-100"
            style={divider}
          />
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
          <h5 className="text-primary-700">ขนาด</h5>
          <Divider
            className="bg-secondary-100"
            style={divider}
          />
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
          <h5 className="text-primary-700">พื้นที่</h5>
          <Divider
            className="bg-secondary-100"
            style={divider}
          />
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
      <FilterBarMobile />
    </div>
  );
};

export default FilterBar;