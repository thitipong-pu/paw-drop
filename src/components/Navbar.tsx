const logoUrl = '/logo.png';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 py-3 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex items-center gap-3">
        <img src={logoUrl} alt="Logo" className="w-8 h-8 rounded-lg shadow-sm" />
        <span className="font-bold text-lg" style={{ color: '#0388C4', fontFamily: 'Prompt, sans-serif' }}>
          น้องอิ่ม
        </span>
      </div>
    </nav>
  );
}
