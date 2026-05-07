import { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';

export function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL;
        const token = localStorage.getItem('admin_token');
        const res = await fetch(`${API_URL}/admin/analytics/overview`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await res.json();
        if (res.ok) {
          setStats(data);
        }
      } catch (err) {
        console.error("Error fetching stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <AdminLayout>
      <h1 style={{ fontFamily: 'Prompt, sans-serif', fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '24px' }}>
        ภาพรวมระบบ (Overview)
      </h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
        <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ color: '#6B7280', fontSize: '14px', marginBottom: '8px' }}>ยอดเข้าชมสถานที่ทั้งหมด</div>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#E8621A' }}>
            {loading ? '...' : (stats?.total_place_views || 0)}
          </div>
        </div>
        <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ color: '#6B7280', fontSize: '14px', marginBottom: '8px' }}>ยอดคลิกสินค้าทั้งหมด</div>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#10B981' }}>
            {loading ? '...' : (stats?.total_item_clicks || 0)}
          </div>
        </div>
      </div>

      <div style={{ marginTop: '32px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
        {/* Top Places */}
        <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontFamily: 'Prompt, sans-serif', fontSize: '18px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>
            สถานที่ยอดนิยม (Top Places)
          </h2>
          {stats?.top_places && stats.top_places.length > 0 ? (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {stats.top_places.map((place: any, i: number) => (
                <li key={place.target_id || i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #F3F4F6', paddingBottom: '12px' }}>
                  <span style={{ fontWeight: 'bold', color: '#374151' }}>{place.name || place.target_id}</span>
                  <span style={{ color: '#E8621A', fontWeight: 'bold', whiteSpace: 'nowrap', marginLeft: '8px' }}>{place.count} วิว</span>
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ color: '#6B7280' }}>ยังไม่มีข้อมูล</p>
          )}
        </div>

        {/* Top Items */}
        <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontFamily: 'Prompt, sans-serif', fontSize: '18px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>
            สินค้ายอดนิยม (Top Items)
          </h2>
          {stats?.top_items && stats.top_items.length > 0 ? (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {stats.top_items.map((item: any, i: number) => (
                <li key={item.target_id || i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #F3F4F6', paddingBottom: '12px' }}>
                  <span style={{ fontWeight: 'bold', color: '#374151' }}>{item.name || item.target_id}</span>
                  <span style={{ color: '#10B981', fontWeight: 'bold', whiteSpace: 'nowrap', marginLeft: '8px' }}>{item.count} คลิก</span>
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ color: '#6B7280' }}>ยังไม่มีข้อมูล</p>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
