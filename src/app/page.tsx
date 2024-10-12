import HeroBlock from "@/components/pages/home/hero-block";
import HotShowRecommend from "@/components/pages/home/hot-shows-recommend";

const Home = () => {
  return (
    <div className="flex-grow">
      <HeroBlock />
      <HotShowRecommend />
    </div>
  );
};
export default Home;
