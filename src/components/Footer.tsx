import logoUrl from '../img/logo.png';

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 pt-12 pb-8 px-4 md:px-8 mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
          <div className="flex items-center gap-3">
            <img src={logoUrl} alt="Logo" className="w-10 h-10 rounded-lg shadow-sm" />
            <span className="font-bold text-xl" style={{ color: '#0388C4', fontFamily: 'Prompt, sans-serif' }}>
              น้องอิ่ม
            </span>
          </div>

          <div className="flex gap-6 text-sm text-slate-400 font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
            <a href="#" className="hover:text-[#0388C4] transition-colors">นโยบายความเป็นส่วนตัว</a>
            <a href="#" className="hover:text-[#0388C4] transition-colors">ติดต่อเรา</a>
          </div>
        </div>

        <div className="text-center md:text-left text-slate-400 text-[11px] font-medium" style={{ fontFamily: 'Sarabun, sans-serif' }}>
          น้องอิ่ม - ระบบศูนย์กลางรับบริจาคอาหารสัตว์ เพื่อความอิ่มท้องของน้องๆ
        </div>
      </div>
    </footer>
  );
}
