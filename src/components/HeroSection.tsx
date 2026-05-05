const stats = [
  { value: '6', label: 'สถานที่รับบริจาค', icon: '📍' },
  { value: '340+', label: 'น้องสัตว์ที่รอ', icon: '🐾' },
  { value: '9', label: 'สินค้าที่ต้องการ', icon: '🛍️' },
];

export function HeroSection() {
  return (
    <section
      className="py-16 px-4 text-center"
      style={{ background: 'linear-gradient(135deg, #FFF3ED 0%, #FFFBF7 100%)' }}
    >
      <div className="text-7xl mb-4" style={{ animation: 'bounce 2s infinite' }}>🐾</div>
      <h1
        className="text-4xl md:text-5xl font-bold mb-3"
        style={{ color: '#E8621A', fontFamily: 'Prompt, sans-serif' }}
      >
        ศูนย์บริจาคอาหารสัตว์
      </h1>
      <p
        className="text-lg mb-10 max-w-xl mx-auto"
        style={{ color: '#8B6151', fontFamily: 'Sarabun, sans-serif' }}
      >
        รวมสถานที่รับบริจาคอาหารสัตว์ทั่วกรุงเทพฯ ค้นหาสถานที่ใกล้เคียง
        คัดลอกที่อยู่ และช้อปสินค้าบริจาคผ่าน Shopee ได้ในคลิกเดียว
      </p>
      <div className="flex gap-4 justify-center flex-wrap">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-2xl px-6 py-4 shadow-md min-w-[120px]"
            style={{ border: '1px solid #FFD8C0' }}
          >
            <div className="text-3xl mb-1">{s.icon}</div>
            <div
              className="text-3xl font-bold"
              style={{ color: '#E8621A', fontFamily: 'Prompt, sans-serif' }}
            >
              {s.value}
            </div>
            <div className="text-sm mt-1" style={{ color: '#8B6151', fontFamily: 'Sarabun, sans-serif' }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
