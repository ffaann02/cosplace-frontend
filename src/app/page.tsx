import HeroBlock from "@/components/pages/home/hero-block";
import HomeModal from "@/components/pages/home/home-modal";
import HotShowRecommend from "@/components/pages/home/hot-shows-recommend";
const Home = () => {

  return (
    <div className="flex-grow">
      <HomeModal />
      <HeroBlock />
      <HotShowRecommend />
    </div>
  );
};

export default Home;