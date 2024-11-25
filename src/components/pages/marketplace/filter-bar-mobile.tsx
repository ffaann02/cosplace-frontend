"use client";

import { Drawer, Checkbox, Divider } from "antd";
import { categories_th, categories_en, sizes, conditions, locations } from "./filter-bar-options";
import { capitalize } from "@/utils/string";
import { divider } from "@/config/theme";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

interface FilterBarMobileProps {
  openFilterDrawerMobile: boolean;
  setOpenFilterDrawerMobile: (open: boolean) => void;
}

const FilterBarMobile: React.FC<FilterBarMobileProps> = ({
  openFilterDrawerMobile,
  setOpenFilterDrawerMobile,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Helper to update filters
  const updateFilter = (filterKey: string, value: string) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    const currentValues = currentParams.getAll(filterKey);

    const updatedValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];

    currentParams.delete(filterKey);
    updatedValues.forEach((v) => currentParams.append(filterKey, v));

    router.push(`?${currentParams.toString()}`);
  };

  // Helper to check if a filter is selected
  const isSelected = (filterKey: string, value: string) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    return currentParams.getAll(filterKey).includes(value);
  };

  const onClose = () => {
    setOpenFilterDrawerMobile(false);
  };

  return (
    <Drawer
      style={{ zIndex: 9999 }}
      size="large"
      title="คัดกรองการค้นหาแบบละเอียด"
      placement="bottom"
      closable
      onClose={onClose}
      open={openFilterDrawerMobile}
    >
      <div className="flex flex-col gap-y-4">
        {/* Categories */}
        <div>
          <h5 className="text-primary-700">หมวดหมู่</h5>
          <Divider style={divider} />
          <div className="flex flex-col gap-y-1 mt-2">
            {categories_th.map((category, index) => (
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
          <Divider style={divider} />
          <div className="flex flex-col gap-y-1 mt-2">
            {conditions.map((condition) => (
              <Checkbox
                key={condition}
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
          <Divider style={divider} />
          <div className="flex flex-col gap-y-1 mt-2">
            {sizes.map((size) => (
              <Checkbox
                key={size}
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
          <Divider style={divider} />
          <div className="flex flex-col gap-y-1 mt-2">
            {locations.map((location) => (
              <Checkbox
                key={location}
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
    </Drawer>
  );
};

export default FilterBarMobile;
