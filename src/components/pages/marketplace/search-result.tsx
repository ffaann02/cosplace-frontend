import { Product } from "@/types/product";
import SearchResultHeader from "./search-result-header";
import SearchResultCard from "./card";

const SearchResult = ({ products, showMenu = true }: { products: Product[], showMenu?:boolean }) => {
  return (
    <div className="col-span-full lg:col-span-8 px-5 pb-3">
      {showMenu && <SearchResultHeader />}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
        {products &&
          products.map((product, index) => (
            <SearchResultCard
              key={index}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
              region={product.region}
              image={product.product_images?.[0]?.image_url || "test"} // Fallback to default image if no images
            />
          ))}
      </div>
    </div>
  );
};

export default SearchResult;
