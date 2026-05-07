import { ReactNode, useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

export function AdminLayout({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    const userData = localStorage.getItem('admin_user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    navigate('/admin/login');
  };

  const navItems = [
    { path: '/admin/dashboard', label: '📊 ภาพรวม (Dashboard)' },
    { path: '/admin/places', label: '📍 สถานที่รับบริจาค' },
    { path: '/admin/items', label: '📦 รายการของบริจาค' },
  ];

  if (!user) return null;

  return (
    <div style={{ fontFamily: 'Sarabun, sans-serif', background: '#F3F4F6', minHeight: '100vh', display: 'flex' }}>
      {/* Sidebar */}
      <div style={{ width: '250px', background: 'white', borderRight: '1px solid #E5E7EB', padding: '24px', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ color: '#E8621A', fontFamily: 'Prompt, sans-serif', fontSize: '20px', fontWeight: 'bold', marginBottom: '32px' }}>
          Paw Drop Admin
        </h2>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
          {navItems.map(item => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link 
                key={item.path} 
                to={item.path}
                style={{ 
                  textDecoration: 'none',
                  background: isActive ? '#FFF3ED' : 'transparent', 
                  color: isActive ? '#E8621A' : '#4B5563', 
                  padding: '12px 16px', 
                  borderRadius: '8px', 
                  fontWeight: isActive ? 'bold' : 'normal', 
                  transition: 'background 0.2s' 
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div style={{ marginTop: 'auto', paddingTop: '24px', borderTop: '1px solid #E5E7EB' }}>
          <div style={{ fontSize: '14px', color: '#374151', marginBottom: '12px', fontWeight: 'bold' }}>{user.name || user.email}</div>
          <button onClick={handleLogout} style={{ width: '100%', padding: '10px', background: '#FEE2E2', color: '#B91C1C', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
            ออกจากระบบ
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '32px', overflowY: 'auto', height: '100vh' }}>
        {children}
      </div>
    </div>
  );
}
