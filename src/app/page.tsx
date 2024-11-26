import HeroBlock from "@/components/pages/home/hero-block";
import HomeModal from "@/components/pages/home/home-modal";
import HeroSection from "@/components/pages/home/hero-section";
import HotShowRecommend from "@/components/pages/home/hot-shows-recommend";
import WhyCosBaanDaewGun from "@/components/pages/home/why-cosbaandaewgun";

const Home = () => {

  return (
    <div className="flex-grow">
      <HomeModal />
      <HeroBlock />
      <HotShowRecommend />
      <WhyCosBaanDaewGun />
      <HeroSection />
    </div>
  );
};

export default Home;