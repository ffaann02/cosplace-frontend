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
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
// import FilterBarMobile from "./filter-bar-mobile";
import { divider } from "@/config/theme";
import FilterBarMobile from "./filter-bar-mobile";
import { useState } from "react";

const FilterBar = ({
  openFilterDrawerMobile,
  setOpenFilterDrawerMobile,
}: {
  openFilterDrawerMobile: boolean;
  setOpenFilterDrawerMobile: (open: boolean) => void;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Utility to handle array-based filters in URL
  const updateFilter = (filterKey: string, value: string) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    const currentValues = currentParams.getAll(filterKey);

    // Toggle the selected value
    const updatedValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];

    currentParams.delete(filterKey); // Clear existing values
    updatedValues.forEach((v) => currentParams.append(filterKey, v)); // Add updated values

    router.push(`?${currentParams.toString()}`); // Update the URL
  };

  // Utility to check if a value is selected
  const isSelected = (filterKey: string, value: string) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    return currentParams.getAll(filterKey).includes(value);
  };

  return (
    <div className="col-span-2 p-4 border border-primary-200 bg-white rounded-lg h-fit hidden lg:block">
      <h5 className="flex">
        <CiFilter className="my-auto mr-2 text-primary-800" />{" "}
        <label className=" text-primary-800">ค้นหาแบบละเอียด</label>
      </h5>
      {Array.from(searchParams.entries()).length > 0 && (
        <button
          onClick={() => {
            router.push(window.location.pathname);
          }}
          className="text-primary-700"
        >
          <span className="underline text-sm">ล้างการค้นหา</span>
        </button>
      )}
      <div className="flex flex-col gap-y-4 mt-4">
        {/* Categories */}
        <div>
          <h5 className="text-primary-700">หมวดหมู่</h5>
          <Divider className="bg-secondary-100" style={divider} />
          <div className="flex flex-col gap-y-1 mt-2">
            {categories_th.map((category: string, index) => (
              <Checkbox
                key={index}
                value={categories_th[index]}
                onChange={() => updateFilter("category", categories_th[index])}
                checked={isSelected("category", categories_th[index])}
              >
                {category} ({capitalize(categories_en[index])})
              </Checkbox>
            ))}
          </div>
        </div>

        {/* Conditions */}
        <div>
          <h5 className="text-primary-700">สภาพ</h5>
          <Divider className="bg-secondary-100" style={divider} />
          <div className="flex flex-col gap-y-1 mt-2">
            {conditions.map((condition: string, index) => (
              <Checkbox
                key={index}
                value={condition}
                onChange={() => updateFilter("condition", condition)}
                checked={isSelected("condition", condition)}
              >
                {condition}
              </Checkbox>
            ))}
          </div>
        </div>

        {/* Sizes */}
        <div>
          <h5 className="text-primary-700">ขนาด</h5>
          <Divider className="bg-secondary-100" style={divider} />
          <div className="flex flex-col gap-y-1 mt-2">
            {sizes.map((size: string, index) => (
              <Checkbox
                key={index}
                value={size}
                onChange={() => updateFilter("size", size)}
                checked={isSelected("size", size)}
              >
                {size}
              </Checkbox>
            ))}
          </div>
        </div>

        {/* Locations */}
        <div>
          <h5 className="text-primary-700">พื้นที่</h5>
          <Divider className="bg-secondary-100" style={divider} />
          <div className="flex flex-col gap-y-1 mt-2">
            {locations.map((location: string, index) => (
              <Checkbox
                key={index}
                value={location}
                onChange={() => updateFilter("location", location)}
                checked={isSelected("location", location)}
              >
                {location}
              </Checkbox>
            ))}
          </div>
        </div>
      </div>
      <FilterBarMobile
        openFilterDrawerMobile={openFilterDrawerMobile}
        setOpenFilterDrawerMobile={setOpenFilterDrawerMobile}
      />
    </div>
  );
};

export default FilterBar;
