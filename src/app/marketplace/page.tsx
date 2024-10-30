"use client";
import FilterBar from "@/components/pages/marketplace/filter-bar";
import SearchResult from "@/components/pages/marketplace/search-result";
import { EcommerceProvider } from "@/context/e-commerce-context";

const Marketplace = () => {
  return (
    <div className="section-wrapper flex-grow min-h-screen flex">
      <div className="section-container grid grid-cols-10 gap-x-2 flex-grow relative">
        <EcommerceProvider>
          <FilterBar />
          <SearchResult />
        </EcommerceProvider>
      </div>
    </div>
  );
};
export default Marketplace;
