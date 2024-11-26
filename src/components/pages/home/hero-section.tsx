const HeroSection = () => {
  return (
    <div className="py-20">
      <div className="container mx-auto flex flex-col lg:flex-row items-center bg-white shadow-xl lg:border-y-2 cursor-default">
        {/* Image Section */}
        <div className="w-full lg:w-1/2 mb-8 lg:mb-0 md:flex md:justify-center">
          <img
            src="https://c4.wallpaperflare.com/wallpaper/293/1013/173/cyberpunk-edgerunners-lucy-edgerunners-cyberpunk-hd-wallpaper-preview.jpg"
            alt=""
            className=""
          />
        </div>

        {/* Text Section */}
        <div className="w-full lg:w-1/2 lg:pl-8 text-center lg:text-start pb-10 md:pd-0">
          <h2 className="text-2xl font-bold text-black mb-4">
            ครบทุกระบบสำหรับคอสเพลย์ในฝันของคุณ
          </h2>
          <h3 className="text-lg font-semibold text-secondary-500 mb-4">
            CosBaanDeawGun
            <br />
            ทำให้การซื้อ-ขาย และเช่าชุดคอสเพลย์เป็นเรื่องง่าย
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            เชื่อมโยงทุกความต้องการของคุณ ทั้งการเช่า การซื้อ หรือการบริการ<br />
            พร้อมระบบที่ออกแบบมาให้ครบถ้วน<br />
            ตอบโจทย์ทุกเรื่องเกี่ยวกับลูกค้าและผู้ขาย<br />
            {
              <p className="font-semibold text-black">
                {' '}
                ครบ จบ ในที่เดียว เพื่อประสบการณ์คอสเพลย์ที่สมบูรณ์แบบที่สุด!
              </p>
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;  