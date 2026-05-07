export function HeroSection() {
  const stats = [
    { 
      value: '6', 
      label: 'สถานที่รับบริจาค', 
      color: '#0EA5E9',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
      )
    },
    { 
      value: '340+', 
      label: 'น้องที่รอความช่วยเหลือ', 
      color: '#0EA5E9',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
      )
    },
    { 
      value: '9', 
      label: 'ของบริจากที่ต้องการ', 
      color: '#0EA5E9',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
      )
    },
  ];

  return (
    <section className="px-4 pt-16 pb-12 text-center bg-white">
      <h1
        className="text-4xl md:text-5xl font-bold mb-4"
        style={{ color: '#0388C4', fontFamily: 'Prompt, sans-serif' }}
      >
        ศูนย์กลางบริจาคอาหารสัตว์
      </h1>
      <p
        className="text-base md:text-lg mb-12 max-w-2xl mx-auto text-slate-500"
        style={{ fontFamily: 'Sarabun, sans-serif' }}
      >
        รวมสถานที่รับบริจาคอาหารสัตว์ทั่วประเทศ ค้นหาและส่งมอบอาหารให้น้องๆได้ง่ายๆ
      </p>

      <div className="flex gap-6 justify-center flex-wrap max-w-6xl mx-auto">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-2xl p-6 shadow-lg shadow-slate-200/50 flex items-center gap-5 border border-slate-50 min-w-[280px] flex-1 max-w-[320px]"
          >
            <div 
              className="w-14 h-14 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${s.color}15`, color: s.color }}
            >
              {s.icon}
            </div>
            <div className="text-left">
              <div
                className="text-3xl font-bold leading-tight"
                style={{ color: '#1E293B', fontFamily: 'Prompt, sans-serif' }}
              >
                {s.value}
              </div>
              <div className="text-sm text-slate-500 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
                {s.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
