import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const API_URL = import.meta.env.VITE_API_URL;

    try {
      const res = await fetch(`${API_URL}/admin/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Save token and user info
      localStorage.setItem('admin_token', data.token);
      localStorage.setItem('admin_user', JSON.stringify(data.user));

      // Redirect to dashboard
      navigate('/admin/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: 'Sarabun, sans-serif', background: '#F8FAFC', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      <div style={{ background: 'white', padding: '48px 40px', borderRadius: '24px', boxShadow: '0 20px 40px rgba(15, 23, 42, 0.08)', width: '100%', maxWidth: '420px', border: '1px solid #F1F5F9' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ color: '#0388C4', fontFamily: 'Prompt, sans-serif', fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>
            น้องอิ่ม Admin
          </h2>
          <p style={{ color: '#64748B', fontSize: '14px', fontWeight: 500 }}>ลงชื่อเข้าสู่ระบบจัดการข้อมูล</p>
        </div>
        
        {error && (
          <div style={{ background: '#FFF1F2', color: '#E11D48', padding: '14px', borderRadius: '12px', marginBottom: '24px', fontSize: '14px', fontWeight: 600, border: '1px solid #FFE4E6' }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#334155', fontWeight: 600 }}>อีเมลผู้ใช้งาน</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '2px solid #F1F5F9', outline: 'none', transition: 'all 0.2s', fontSize: '15px' }}
              placeholder="admin@example.com"
              onFocus={(e) => e.target.style.borderColor = '#0388C4'}
              onBlur={(e) => e.target.style.borderColor = '#F1F5F9'}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#334155', fontWeight: 600 }}>รหัสผ่าน</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '2px solid #F1F5F9', outline: 'none', transition: 'all 0.2s', fontSize: '15px' }}
              placeholder="••••••••"
              onFocus={(e) => e.target.style.borderColor = '#0388C4'}
              onBlur={(e) => e.target.style.borderColor = '#F1F5F9'}
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              background: '#0388C4', 
              color: 'white', 
              padding: '16px', 
              borderRadius: '12px', 
              fontWeight: 'bold', 
              border: 'none', 
              cursor: loading ? 'not-allowed' : 'pointer',
              marginTop: '12px',
              fontSize: '16px',
              boxShadow: '0 10px 20px rgba(3, 136, 196, 0.2)',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => !loading && (e.currentTarget.style.transform = 'translateY(-2px)')}
            onMouseLeave={(e) => !loading && (e.currentTarget.style.transform = 'translateY(0)')}
          >
            {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
          </button>
        </form>
      </div>
    </div>
  );
}
