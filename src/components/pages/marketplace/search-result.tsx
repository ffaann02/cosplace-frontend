import { Product } from "@/types/products";
import SearchResultHeader from "./search-result-header";
import SearchResultCard from "./card";

const ResultList = ({products}:{products:Product[]}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
      {products.map((product, index) => (
        <SearchResultCard
          key={index}
          name={product.name}
          price={product.price}
          region={product.region}
          image={product.product_images[0].image_url}
        />
      ))}
    </div>
  );
};

const SearchResult = ({productList}:{
  productList: Product[];
}) => {
  return (
    <div className="col-span-full lg:col-span-8 px-5 pb-3">
        <SearchResultHeader/>
        <ResultList products={productList}/>
    </div>
  );
};

export default SearchResult;
