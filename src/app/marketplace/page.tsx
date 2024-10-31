"use client";
import FilterBar from "@/components/pages/marketplace/filter-bar";
import SearchResult from "@/components/pages/marketplace/search-result";
import { EcommerceProvider } from "@/context/e-commerce-context";
import { useRouter } from "next/router";

const Marketplace = () => {

  // const router = useRouter();
  // const { search } = router.query;
  // console.log(search);

  return (
    <div className="mt-8 lg:mt-12 flex-grow min-h-screen flex">
      <div className="w-full lg:max-w-[80rem] 2xl:max-w-[86rem] section-container grid grid-cols-10 gap-x-2 pl-0 lg:pl-4 flex-grow relative">
        <EcommerceProvider>
          <FilterBar />
          <SearchResult />
        </EcommerceProvider>
      </div>
    </div>
  );
};
export default Marketplace;
