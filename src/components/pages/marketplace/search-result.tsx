import ResultList from "./result-list";
import SearchResultHeader from "./search-result-header";

const SearchResult = () => {

  return (
    <div className="col-span-full lg:col-span-8 px-5 pb-3">
        <SearchResultHeader/>
        <ResultList/>
    </div>
  );
};

export default SearchResult;
