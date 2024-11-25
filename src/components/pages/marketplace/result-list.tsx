import SearchResultCard from "./card";
import fakeProducts from "@/data/mock/product-list.json";

const ResultList = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
      {fakeProducts.map((product, index) => (
        <SearchResultCard
          key={index}
          name={product.name}
          price={product.price}
          region={product.location}
          image={product.image_cover}
          createdAt={product.createdAt}
        />
      ))}
    </div>
  );
};
export default ResultList;
