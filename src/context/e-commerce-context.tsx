import { createContext, useContext, useState, ReactNode } from "react";
import { CheckboxChangeEvent } from "antd/es/checkbox";

interface EcommerceContextType {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  selectedConditions: string[];
  setSelectedConditions: (conditions: string[]) => void;
  selectedSizes: string[];
  setSelectedSizes: (sizes: string[]) => void;
  selectedLocations: string[];
  setSelectedLocations: (locations: string[]) => void;
  handleCategoryChange: (e: CheckboxChangeEvent) => void;
  handleConditionChange: (e: CheckboxChangeEvent) => void;
  handleSizeChange: (e: CheckboxChangeEvent) => void;
  handleLocationChange: (e: CheckboxChangeEvent) => void;
  openFilterDrawerMobile: boolean;
  setOpenFilterDrawerMobile: (open: boolean) => void;
}

const EcommerceContext = createContext<EcommerceContextType | undefined>(
  undefined
);

export const EcommerceProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [openFilterDrawerMobile, setOpenFilterDrawerMobile] =
    useState<boolean>(false);

  const handleCategoryChange = (e: CheckboxChangeEvent) => {
    const value = e.target.value;
    setSelectedCategories((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleConditionChange = (e: CheckboxChangeEvent) => {
    const value = e.target.value;
    setSelectedConditions((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleSizeChange = (e: CheckboxChangeEvent) => {
    const value = e.target.value;
    setSelectedSizes((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleLocationChange = (e: CheckboxChangeEvent) => {
    const value = e.target.value;
    setSelectedLocations((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  return (
    <EcommerceContext.Provider
      value={{
        selectedCategories,
        setSelectedCategories,
        selectedConditions,
        setSelectedConditions,
        selectedSizes,
        setSelectedSizes,
        selectedLocations,
        setSelectedLocations,
        handleCategoryChange,
        handleConditionChange,
        handleSizeChange,
        handleLocationChange,
        openFilterDrawerMobile,
        setOpenFilterDrawerMobile,
      }}
    >
      {children}
    </EcommerceContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(EcommerceContext);
  if (context === undefined) {
    throw new Error("useEcommerce must be used within Ecommerce Provider");
  }
  return context;
};
