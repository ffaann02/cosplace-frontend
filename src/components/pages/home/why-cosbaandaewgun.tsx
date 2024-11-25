const WhyCosBaanDaewGun = () => {
  return (
    <div className="md:h-[100vh] flex items-center justify-center mt-auto cursor-default">
      <div className="section-wrapper bg-primary-100 pt-6 pb-20">
        <div className="section-container px-8 max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-center mb-12">
            <div className="flex bottom-0 mt-auto align-text-bottom text-secondary-600 text-4xl font-semibold mr-4 my-2">
              <span>ทำไมต้อง</span>
            </div>
            <div className="flex flex-col text-[40px] font-semibold">
              <span className="leading-none text-secondary-600 items-start">CosBaan</span>
              <span className="leading-none text-primary-800 items-start">DaewGun</span>
            </div>
            <span className="text-8xl font-medium text-primary-800">?</span>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="bg-white p-6 rounded-lg shadow-xl text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="text-yellow-500 text-3xl mb-4">✔️</div>
              <h4 className="text-lg font-semibold mb-2">ครบวงจรในที่เดียว</h4>
              <p className="text-sm text-gray-600">
                ไม่ว่าจะเป็นการซื้อ-ขาย เช่า หรือสั่งตัดคอสเพลย์ ชุด อุปกรณ์เสริม และบริการอื่น ๆ เช่น ช่างแต่งหน้าและช่างภาพ ทุกอย่างรวมอยู่ในแพลตฟอร์มเดียว!
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-6 rounded-lg shadow-xl text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="text-yellow-500 text-3xl mb-4">🤝</div>
              <h4 className="text-lg font-semibold mb-2">เชื่อมโยงชุมชนคนรักคอสเพลย์</h4>
              <p className="text-sm text-gray-600">
                ระบบจับคู่และโปรไฟล์ที่ช่วยคุณเชื่อมต่อกับเพื่อนร่วมชอบตัวละครเดียวกัน หรือเตรียมตัวเข้าร่วมอีเวนต์คอสเพลย์ด้วยกันได้ง่าย ๆ
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-6 rounded-lg shadow-xl text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="text-yellow-500 text-3xl mb-4">📦</div>
              <h4 className="text-lg font-semibold mb-2">รองรับทุกความต้องการ</h4>
              <p className="text-sm text-gray-600">
                ระบบจัดการที่ใช้งานง่ายทั้งสำหรับผู้ซื้อและผู้ขาย ตั้งแต่การลงสินค้า การจอง การชำระเงิน ไปจนถึงการจัดส่ง
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-6 rounded-lg shadow-xl text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="text-yellow-500 text-3xl mb-4">🔒</div>
              <h4 className="text-lg font-semibold mb-2">ใช้งานง่าย ปลอดภัย</h4>
              <p className="text-sm text-gray-600">
                ออกแบบด้วย UI ที่ใช้งานง่าย รองรับหลายอุปกรณ์ พร้อมระบบความปลอดภัยที่มั่นใจได้
                เริ่มต้นการเดินทางคอสเพลย์ในฝันของคุณได้แล้ววันนี้ที่ CosBaanDeawGun!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyCosBaanDaewGun;
