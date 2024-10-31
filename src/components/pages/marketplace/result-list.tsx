import SearchResultCard from "./card";
const ResultList = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
      {Array.from({ length: 10 }).map((_, index) => (
        <SearchResultCard
          key={index}
          name="test"
          price={99}
          location="กรุงเทพมหานคร"
          image="/images/sad-cat.jpg"
        />
      ))}
    </div>
  );
};
export default ResultList;
