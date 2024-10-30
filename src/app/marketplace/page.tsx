import FilterBar from "@/components/pages/marketplace/filter-bar";

const Marketplace = () => {
  return (
    <div className="section-wrapper flex-grow min-h-screen flex">
      <div className="section-container grid grid-cols-10 gap-x-4 flex-grow relative">
        <FilterBar />
        <div className="col-span-8 bg-white">ตัวช่วยการค้นหา</div>
      </div>
    </div>
  );
};
export default Marketplace;