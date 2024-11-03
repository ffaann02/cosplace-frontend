import { Drawer, Checkbox, Divider } from "antd";
import { useFilter } from "@/context/e-commerce-context";
import {
  categories_th,
  categories_en,
  sizes,
  conditions,
  locations,
} from "./filter-bar-options";
import { capitalize } from "@/utils/string";
import { divider } from "@/config/theme";

const FilterBarMobile = () => {
  const {
    openFilterDrawerMobile,
    setOpenFilterDrawerMobile,
    selectedCategories,
    handleCategoryChange,
    selectedConditions,
    handleConditionChange,
    selectedSizes,
    handleSizeChange,
    selectedLocations,
    handleLocationChange,
  } = useFilter();

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
        
        {/* Conditions */}
        <div>
          <h5 className="text-primary-700">สภาพ</h5>
          <Divider style={divider} />
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
        
        {/* Sizes */}
        <div>
          <h5 className="text-primary-700">ขนาด</h5>
          <Divider style={divider} />
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
        
        {/* Locations */}
        <div>
          <h5 className="text-primary-700">พื้นที่</h5>
          <Divider style={divider} />
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
    </Drawer>
  );
};

export default FilterBarMobile;