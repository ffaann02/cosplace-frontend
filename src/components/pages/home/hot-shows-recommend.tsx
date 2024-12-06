import Image from "next/image";

interface Show {
  show_id: number;
  name_en: string;
  name_th: string;
  cover_image: string;
}

const mockShows: Show[] = [
    {
      show_id: 1,
      name_en: "Kimetsu no Yaiba",
      name_th: "ดาบพิฆาตอสูร",
      cover_image: "https://static.thairath.co.th/media/4DQpjUtzLUwmJZZSCHsUuqV6tBvr6dsUPvAYJNGOq9IH.jpg",
    },
    {
      show_id: 2,
      name_en: "Attack on Titan",
      name_th: "ผ่าพิภพไททัน",
      cover_image: "https://th.e-muse.com.tw/wp-content/uploads/2022/09/%E9%80%B2%E6%93%8A%E7%9A%84%E5%B7%A8%E4%BA%BAS4-Part-2_%E6%96%B0%E5%AA%92%E5%AE%A3%E5%82%B3%E5%9C%96%E7%9B%B4_V02_%E6%B3%B0-1.jpg",
    },
    {
      show_id: 3,
      name_en: "My Hero Academia",
      name_th: "มายฮีโร่ อคาเดเมีย",
      cover_image: "https://img.ecartelera.com/noticias/71500/71561-h3.jpg",
    },
    {
      show_id: 4,
      name_en: "One Piece",
      name_th: "วันพีซ",
      cover_image: "https://static1.srcdn.com/wordpress/wp-content/uploads/2023/12/the-future-of-netflix-s-one-piece-live-action-just-got-much-more-exciting-2.jpg",
    },
    {
      show_id: 5,
      name_en: "Naruto",
      name_th: "นารูโตะ",
      cover_image: "https://www.beartai.com/wp-content/uploads/2024/02/Naruto-1600x840.jpg",
    },
  ];

const HotShowRecommend = async () => {
  return (
    <div className="section-wrapper">
      <div className="section-container px-16">
        <h3 className="text-primary-800 mb-6">กำลังได้รับความนิยม</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {mockShows.map((show) => (
            <div key={show.show_id} className="">
              <Image
                lazyBoundary="300px"
                unoptimized
                src={show.cover_image}
                alt={show.name_en}
                width={196}
                height={196}
                className="show-cover object-cover rounded-full w-[196px] h-[196px] mx-auto"
              />
              <h5 className="text-center mt-2 text-primary-700">{show.name_th}</h5>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotShowRecommend;