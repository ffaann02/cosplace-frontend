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
      cover_image: "https://static.thairath.co.th/media/4DQpjUtzLUwmJZZSCHsUuqV6tBvr6dsUPvAYJNGOq9IH.jpg",
    },
    {
      show_id: 3,
      name_en: "My Hero Academia",
      name_th: "มายฮีโร่ อคาเดเมีย",
      cover_image: "https://static.thairath.co.th/media/4DQpjUtzLUwmJZZSCHsUuqV6tBvr6dsUPvAYJNGOq9IH.jpg",
    },
    {
      show_id: 4,
      name_en: "One Piece",
      name_th: "วันพีซ",
      cover_image: "https://static.thairath.co.th/media/4DQpjUtzLUwmJZZSCHsUuqV6tBvr6dsUPvAYJNGOq9IH.jpg",
    },
    {
      show_id: 5,
      name_en: "Naruto",
      name_th: "นารูโตะ",
      cover_image: "https://static.thairath.co.th/media/4DQpjUtzLUwmJZZSCHsUuqV6tBvr6dsUPvAYJNGOq9IH.jpg",
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