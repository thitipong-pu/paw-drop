import { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';

export function AdminItems() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '', product_url: '', image_url: '', tags: ''
  });

  const fetchItems = async () => {
    setLoading(true);
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const token = localStorage.getItem('admin_token');
      const res = await fetch(`${API_URL}/admin/items?size=100`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.data) {
        setItems(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleOpenModal = (item?: any) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        name: item.name || '',
        product_url: item.product_url || '',
        image_url: item.image_url || '',
        tags: item.tags ? item.tags.join(', ') : ''
      });
    } else {
      setEditingItem(null);
      setFormData({ name: '', product_url: '', image_url: '', tags: '' });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const token = localStorage.getItem('admin_token');
      const method = editingItem ? 'PUT' : 'POST';
      const url = editingItem ? `${API_URL}/admin/items/${editingItem.id}` : `${API_URL}/admin/items`;

      const payload = {
        ...formData,
        tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
        animal_types: ['dog', 'cat'], // default mock
      };

      const res = await fetch(url, {
        method,
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchItems();
      } else {
        alert('Failed to save item');
      }
    } catch (err) {
      console.error(err);
      alert('Error saving item');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('ยืนยันการลบสินค้านี้?')) return;
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const token = localStorage.getItem('admin_token');
      const res = await fetch(`${API_URL}/admin/items/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        fetchItems();
      } else {
        alert('Failed to delete');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AdminLayout>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'Prompt, sans-serif', fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>
          จัดการรายการของบริจาค
        </h1>
        <button 
          onClick={() => handleOpenModal()}
          style={{ background: '#E8621A', color: 'white', border: 'none', padding: '10px 16px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          + เพิ่มของบริจาค
        </button>
      </div>

      <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
              <th style={{ padding: '12px 16px', color: '#374151', fontSize: '14px' }}>ชื่อสินค้า</th>
              <th style={{ padding: '12px 16px', color: '#374151', fontSize: '14px' }}>ลิงก์ (Shopee)</th>
              <th style={{ padding: '12px 16px', color: '#374151', fontSize: '14px' }}>Tags</th>
              <th style={{ padding: '12px 16px', color: '#374151', fontSize: '14px', textAlign: 'right' }}>จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={4} style={{ padding: '24px', textAlign: 'center', color: '#6B7280' }}>กำลังโหลด...</td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan={4} style={{ padding: '24px', textAlign: 'center', color: '#6B7280' }}>ไม่พบข้อมูล</td></tr>
            ) : (
              items.map(item => (
                <tr key={item.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 'bold', color: '#111827' }}>{item.name}</td>
                  <td style={{ padding: '12px 16px', color: '#6B7280' }}>
                    {item.product_url ? <a href={item.product_url} target="_blank" rel="noreferrer" style={{ color: '#3B82F6' }}>Link</a> : '-'}
                  </td>
                  <td style={{ padding: '12px 16px', color: '#6B7280' }}>
                    {item.tags ? item.tags.join(', ') : '-'}
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', gap: '8px', display: 'flex', justifyContent: 'flex-end' }}>
                    <button onClick={() => handleOpenModal(item)} style={{ background: '#F3F4F6', color: '#374151', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' }}>แก้ไข</button>
                    <button onClick={() => handleDelete(item.id)} style={{ background: '#FEE2E2', color: '#B91C1C', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' }}>ลบ</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
          <div style={{ background: 'white', padding: '24px', borderRadius: '12px', width: '100%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{ fontFamily: 'Prompt, sans-serif', fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>
              {editingItem ? 'แก้ไขของบริจาค' : 'เพิ่มของบริจาค'}
            </h2>
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px', fontWeight: 'bold' }}>ชื่อสินค้า</label>
                <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #D1D5DB' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px', fontWeight: 'bold' }}>ลิงก์สั่งซื้อ (URL)</label>
                <input required value={formData.product_url} onChange={e => setFormData({...formData, product_url: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #D1D5DB' }} placeholder="https://shopee.co.th/..." />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px', fontWeight: 'bold' }}>ลิงก์รูปภาพสินค้า (ถ้ามี)</label>
                <input value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #D1D5DB' }} placeholder="https://..." />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px', fontWeight: 'bold' }}>Tags (คั่นด้วยลูกน้ำ)</label>
                <input value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #D1D5DB' }} placeholder="ด่วน, ใช้บ่อย" />
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ flex: 1, background: '#F3F4F6', color: '#374151', border: 'none', padding: '10px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>ยกเลิก</button>
                <button type="submit" style={{ flex: 1, background: '#E8621A', color: 'white', border: 'none', padding: '10px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>บันทึก</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
