import HeroBlock from "@/components/pages/home/hero-block";
import HeroSection from "@/components/pages/home/hero-section";
import HotShowRecommend from "@/components/pages/home/hot-shows-recommend";
import WhyCosBaanDaewGun from "@/components/pages/home/why-cosbaandaewgun";

const Home = () => {
  return (
    <div className="flex-grow">
      <HeroBlock />
      <HotShowRecommend />
      <WhyCosBaanDaewGun />
      <HeroSection />
    </div>
  );
};
export default Home;
